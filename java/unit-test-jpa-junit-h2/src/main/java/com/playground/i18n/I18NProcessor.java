package com.playground.i18n;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;

public class I18NProcessor {
	
	String rootFilePath;
	
	String pattern = "bundle.getString\\(\"(.*?)\"\\)";
	
	Pattern regex = Pattern.compile(pattern);
	List<File> files = new ArrayList<>(2000);
	List<String> excludedFiles = new ArrayList<>(files.size());
	HashMap<String,String> translations = new HashMap<>();
	
	public static void main(String[] args) {
		I18NProcessor main =  new I18NProcessor();
		main.processFiles(args[0]);
	}
	
	private void processFiles(String rootFilePath) {
		this.rootFilePath = rootFilePath;
		if(rootFilePathExists()) {
			readFiles();
			readAndExtractTranslations();
			writeTranslationsToFile();
			printExcludedFiles();
			finish();
		}
		
	}
	
	private boolean rootFilePathExists() {
		if(!Paths.get(rootFilePath).toFile().exists()) {
			System.out.println("Given root path does not exists");
			return false;
		}
		return true;
	}

	private void readFiles() {
		System.out.println("------Reading files--------\n");
		
		
		
		try (Stream<Path> pathStream = Files.walk(Paths.get(rootFilePath)))
		{
			pathStream.filter(this::filterFilesToRead).forEach(path -> {
				files.add(path.toFile());
			});
		} catch (IOException e) {
			System.out.println("!!! Error Reading files." + e.getMessage());
			System.exit(0);
		}
		
	
	}
	
	private boolean filterFilesToRead(Path path) {
		String filename =  path.toFile().getName();
		
		if( path.toString().contains("planningoptimizer")) return false;
		
		if(!filename.endsWith(".java")) {
			return false;
		}
			
		filename = filename.split(".java")[0].toLowerCase();
		return !(filename.endsWith("_") || filename.endsWith("test"));
		
	}
	
	private void readAndExtractTranslations() {
		System.out.println("------Extracting Translations--------\n");
		
		String content = null;
		
		for(File file : files) {
			if(!file.canRead()) {
				excludedFiles.add(file.getName());
			}
			try {
				content = new String(Files.readAllBytes(Paths.get(file.getAbsolutePath())));
			} catch (IOException e) {
				excludedFiles.add(file.getName());
			}
			extractTranslations(content);
		}
		
		
	}
	
	private void extractTranslations(String content) {
		 Matcher m = regex.matcher(content);   // get a matcher object
		 while(m.find()) {
			 String key = m.group(1).trim().replaceAll("\\s+?", "_").replaceAll("[^a-zA-Z0-9_]", "");
			 translations.put(key, m.group(1));
		 }
	}

	private void writeTranslationsToFile() {
		System.out.println("------Writing Translations to file --------\n");
		
		File file = new File("MessagesBundle.properties");
		if(file.exists()) {
			file.delete();
		}
		try (FileWriter writer = new FileWriter(file);
			 BufferedWriter bw = new BufferedWriter(writer)) {
				for(Entry<String, String> entry : translations.entrySet()) {
					bw.write(String.format("%1$s = %2$s", entry.getKey(), entry.getValue()));
					bw.newLine();bw.newLine();
				}
		} catch (IOException e) {
			System.err.format("IOException: %s%n", e);
		}
	
	}
	
	
	
	private void printExcludedFiles() {
		if(excludedFiles.isEmpty()) return;
		
		System.out.println("------The following files could not be processed--------\n");
		for(File file : files) {
			System.out.println(file.getName());
		}
		
	}
	
	private void finish() {
		System.out.println("------Processing complete--------\n");
	}
	
}