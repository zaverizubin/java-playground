//package com.playground.i18n;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

public class I18NProcessor {
	
	Set<String> i18nLanguages = new HashSet<>(Arrays.asList("de_DE", "fr_FR", "nl_NL", "es_ES"));
	
	private static final String MESSAGES_BUNDLE = "MessagesBundle";
	private static final String MESSAGES_BUNDLE_FILE_EXTN = "properties";
	private static final String JAVA_EXTN = ".java";
	private static final String JASPER_EXTN = ".jrxml";
	private String rootFilePath;
	
	private String codePattern = "bundle.getString\\(\"(.*?)\"\\)";
	private Pattern codeRegex = Pattern.compile(codePattern);
	
	private String jasperReportPattern = "\\$R\\{(.*?)\\}";
	private Pattern jasperReportRegex = Pattern.compile(jasperReportPattern);
	
	private String catchAllPattern = "bundle.getString\\(.*?\\)";
	private Pattern catchAllRegex = Pattern.compile(catchAllPattern);
	
	
	List<File> files = new ArrayList<>(2000);
	List<String> excludedFiles = new ArrayList<>(files.size());
	HashMap<String,String> translations = new HashMap<>();
	HashSet<String> excludedTranslations = new HashSet<>();
	
	public static void main(String[] args) {
		
		I18NProcessor i18nProcessor =  new I18NProcessor();
		if(args.length >0) {
			i18nProcessor.rootFilePath = "E:\\work\\nexusglobal\\apm\\integration\\java\\apm-planningoptimizer";//args[0];
		}else {
			i18nProcessor.rootFilePath = System.getProperty("user.dir");
		}
		
		i18nProcessor.findAndProcessMultiLingualContent();
		i18nProcessor.findAndProcessI18NFiles();
		i18nProcessor.finish();
	}

	private void findAndProcessMultiLingualContent() {
		if(!rootFilePathExists()) {
			printToStdOut("Root path does not exists");
			return;
		}
		readFiles();
		readAndExtractTranslations();
		writeTranslationsToFile(String.format("%s.%s", MESSAGES_BUNDLE, MESSAGES_BUNDLE_FILE_EXTN) , translations);
		writeExcludedTranslationsToFile();
		printExcludedFiles();
		
	}
	
	private boolean rootFilePathExists() {
		return Paths.get(rootFilePath).toFile().exists();
	}

	private void readFiles() {
		printToStdOut("\n\nReading Files");
		
		try (Stream<Path> pathStream = Files.walk(Paths.get(rootFilePath)))
		{
			pathStream.filter(this::filterFilesToRead).forEach(path -> {
				files.add(path.toFile());
			});
		} catch (IOException e) {
			printToStdErr(e);
			
			System.exit(0);
		}
	}
	
	private boolean filterFilesToRead(Path path) {
		String filename =  path.toFile().getName();
		
		if(!filename.endsWith(JAVA_EXTN) && !filename.endsWith(JASPER_EXTN)) {
			return false;
		}
			
		filename = filename.split(JAVA_EXTN)[0].toLowerCase();
		//do not include generated metamodel and test files
		return !filename.endsWith("_") && !filename.endsWith("test");
		
	}
	
	private void readAndExtractTranslations() {
		printToStdOut("\n\n"); 
		
		String content = null;
		long current = 1;
		long total = files.size();
		
		for(File file : files) {
			printProgress("Extracting Translations", current, total);
			
			if(!file.canRead()) {
				excludedFiles.add(file.getName());
			}
			try {
				content = new String(Files.readAllBytes(Paths.get(file.getAbsolutePath())));
			} catch (IOException e) {
				excludedFiles.add(file.getName());
			}
			if(file.getName().endsWith(JAVA_EXTN)) {
				extractCodeTranslations(content);
			}else if(file.getName().endsWith(JASPER_EXTN)) {
				extractJasperReportTranslations(content);
			}
				
			current+=1;
		}
	}
	
	private void extractCodeTranslations(String content) {
		HashSet<String> catchAll = new HashSet<>();
		
		Matcher m = catchAllRegex.matcher(content);
		while (m.find()) {
			catchAll.add(m.group());
		}
		
		m = codeRegex.matcher(content); 
		while(m.find()) {
			String key = m.group(1).trim().replaceAll("\\s+?", "_").replaceAll("[^a-zA-Z0-9_%]", "");
			translations.put(key, m.group(1));
			if(catchAll.contains(m.group())) {
				catchAll.remove(m.group());
			}
		}
		excludedTranslations.addAll(catchAll);
	}
	
	private void extractJasperReportTranslations(String content) {
		Matcher m = jasperReportRegex.matcher(content);
		while(m.find()) {
			String key = m.group(1).trim();
			String value = upperCamelCase(m.group(1).trim().replaceAll("_", " "));
			translations.put(key, value);
		}
	}

	private String upperCamelCase(String value) {
		StringBuilder sb = new StringBuilder();
		for(String word: value.split(" ")) {
			sb.append(word.substring(0,1).toUpperCase() + word.substring(1).toLowerCase());
			sb.append(" ");
		}
		
		return sb.toString().trim();
	}
	
	private void writeTranslationsToFile(String filename, HashMap<String, String> entries) {
		printToStdOut("\n\n"); 
		
		File file = new File(filename);
		if(file.exists()) {
			file.delete();
		}
		try (FileWriter writer = new FileWriter(file);
			BufferedWriter bw = new BufferedWriter(writer)) {
			long current = 1;
			long total = translations.entrySet().size();
			for(Entry<String, String> entry : entries.entrySet()) {
				printProgress("Writing Translations to file:" + filename, current, total);
				bw.write(String.format("%1$s = %2$s", entry.getKey(), entry.getValue()));
				bw.newLine();bw.newLine();
				current += 1;
			}
		} catch (IOException e) {
			printToStdErr(e);
		}
	
	}
	
	private void writeExcludedTranslationsToFile() {
		
		printToStdOut("\n\n"); 
		File file = new File("excluded.properties");
		
		if(file.exists()) {
			file.delete();
		}
		try (FileWriter writer = new FileWriter(file);
			BufferedWriter bw = new BufferedWriter(writer)) {
			long current = 1;
			long total = excludedTranslations.size();
			for(String entry : excludedTranslations) {
				printProgress("Writing Excluded Translations to file", current, total);
				bw.write(entry);
				bw.newLine();bw.newLine();
				current+=1;
			}
		} catch (IOException e) {
			printToStdErr(e);
		}
	
	}
		
	private void printExcludedFiles() {
		if(excludedFiles.isEmpty()) return;
		
		printToStdOut("The following files could not be processed-->\n");
		for(File file : files) {
			printToStdOut(file.getName());
		}
	}
	
	private void finish() {
		printToStdOut("\n\nProcessing complete");
	}
	
	
	private void findAndProcessI18NFiles() {
		List<Path> i18NFilePaths = findI18NFiles();
		final LinkedHashMap<String, String> i18NEntries = new LinkedHashMap<>();
		
		i18nLanguages.forEach(lng ->{
			String filename = String.format("%s_%s.%s", MESSAGES_BUNDLE, lng, MESSAGES_BUNDLE_FILE_EXTN);
			Optional<Path> optionalPath = i18NFilePaths.stream().filter(p ->{
				return p.getFileName().endsWith(filename);
			}).findFirst();
			
			i18NEntries.clear();
			if(optionalPath.isPresent()) {
				i18NEntries.putAll(readI18NFile(optionalPath.get()));
				reconcileI18NEntries(i18NEntries);
			}else {
				i18NEntries.putAll(translations);
			}
			writeTranslationsToFile(filename, i18NEntries);
		});
	}
	
	private List<Path> findI18NFiles() {
		
		List<String> filenamesToSearch = new ArrayList<>();
		List<Path> searchedFilePaths = new ArrayList<>();
		
		i18nLanguages.forEach(lng ->{
			filenamesToSearch.add(String.format("%s_%s.%s", MESSAGES_BUNDLE, lng, MESSAGES_BUNDLE_FILE_EXTN)) ;
		});
		
		try (Stream<Path> pathStream = Files.find(Paths.get(rootFilePath),Integer.MAX_VALUE, (filePath, fileAttr) -> fileAttr.isRegularFile())) {
			pathStream.forEach(path->{
	            if(path.toString().endsWith(MESSAGES_BUNDLE_FILE_EXTN) 
            		&& path.toString().contains(MESSAGES_BUNDLE) 
            		&& path.toString().contains("src\\main")
            		&& !path.toString().endsWith(String.format("%s.%s", MESSAGES_BUNDLE, MESSAGES_BUNDLE_FILE_EXTN))) {
	            	searchedFilePaths.add(path);
	            }
	        });
		} catch (IOException e){
			printToStdErr(e);
		}
		
		return searchedFilePaths;
	}
	
	private HashMap<String, String> readI18NFile(Path path) {
		final HashMap<String, String> i18NEntries = new HashMap<>();
		
		try (Stream<String> lines = Files.lines(path, Charset.forName(StandardCharsets.UTF_8.name()))) {
				  lines.forEachOrdered(line -> {
					  if(line.contains("=")) {
						  String[] arr = line.split("=");
						  i18NEntries.put(arr[0].trim(), arr[1].trim());  
					  }
				  }
			  );
		} catch (IOException e) {
			printToStdErr(e);
		}
		
		return i18NEntries;
	}
	
	private void reconcileI18NEntries(LinkedHashMap<String, String> i18nEntries) {
		Iterator<Entry<String, String>> iterator = i18nEntries.entrySet().iterator(); 
	    while (iterator.hasNext()) { 
	        Entry<String, String> entry = iterator.next(); 
	        if (!translations.containsKey(entry.getKey())) { 
	            iterator.remove(); 
	        } 
	    } 
    	
		for(Entry<String, String> entry : translations.entrySet()) {
			if(!i18nEntries.containsKey(entry.getKey())) {
				i18nEntries.put(entry.getKey(),entry.getValue());
			}
		}
	}
	
	
	private void printProgress(String caption, long current, long total) {
		StringBuilder stringBuilder = new StringBuilder();
		int percent = total > 0 ? (int) (current * 100 / total): 0;
		
		stringBuilder.append('\r');
		stringBuilder.append(caption);
		stringBuilder.append("-------->");
		stringBuilder.append((total > 0) ? String.format(" %d%%", percent): stringBuilder.append(current));
		printToStdOut(stringBuilder.toString());
	}
	
	private void printToStdOut(String message){
		System.out.print(message);
	}
	
	private void printToStdErr(Exception e){
		System.err.format("IOException: %s", e.getMessage());
	}

}