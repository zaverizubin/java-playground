import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Migration {

	private final AppVersionComponent appVersionComponent;
	private final ArrayList<AppEnum> applications = new ArrayList<>();

	private final HashMap<AppEnum, File> scriptsFolders = new HashMap<>();
	private final HashMap<AppEnum, List<File>> scriptFiles = new HashMap<>();
	private final File destinationFilepath;
	private int sequenceNumber;
	private final StandardOut standardOutput;

	public Migration(final String apmRoot, final String ioRoot, final String soRoot,
			final StandardOut standardOutput, final AppVersionComponent appVersionComponent) {
		for(final AppEnum app : AppEnum.values()) {
			applications.add(app);
		}
		getApplicationScriptFilePaths(apmRoot, ioRoot, soRoot);
		destinationFilepath = new File(apmRoot + "\\java\\apm-main\\src\\main\\resources\\db\\migrations");
		this.appVersionComponent = appVersionComponent;
		this.standardOutput = standardOutput;
	}

	private void getApplicationScriptFilePaths(final String apmRoot, final String ioRoot, final String soRoot) {
		scriptsFolders.put(AppEnum.Dashboard,
				new File(apmRoot + "\\java\\apm-dashboard\\src\\main\\resources\\db\\migrations"));
		scriptsFolders.put(AppEnum.DataOptimizer,
				new File(apmRoot + "\\java\\apm-dataoptimizer\\src\\main\\resources\\db\\migrations"));
		scriptsFolders.put(AppEnum.PlanningOptimizer,
				new File(apmRoot + "\\java\\apm-planningoptimizer\\src\\main\\resources\\db\\migrations"));
		scriptsFolders.put(AppEnum.InvestigationOptimizer, new File(ioRoot + "\\database"));
		scriptsFolders.put(AppEnum.StrategyOptimizer, new File(soRoot + "\\OMCSUtils\\Scripts\\SQL\\RA"));

	}

	public void migrateScripts() {
		standardOutput.clearAll();
		if (verifyDestinationFolder()) {
			readFiles();
			copyRenameFiles();
			renameFilesLocally();
		}
	}

	private boolean verifyDestinationFolder() {
		if (destinationFilepath != null && !destinationFilepath.exists()) {
			try {
				destinationFilepath.mkdirs();
				return true;
			} catch (final Exception e) {
				standardOutput
				.pipeText("Could not find destination folder under apm-main. This migration will exit here.");
				return false;
			}
		} else {
			return true;
		}
	}

	private void readFiles() {
		standardOutput.pipeDelimiter("Discovered Files");

		for (final AppEnum app : applications) {
			final File rootFilepath = scriptsFolders.get(app);

			standardOutput.pipeText("Files dicovered for: " + app.toString());

			if (rootFilepath != null && rootFilepath.exists()) {
				for (final File file : rootFilepath.listFiles()) {
					if (file.getName().startsWith("#")) {
						addFilesToCollection(app, file);
						standardOutput.pipeText(file.getName());
					}
				}
			}

			if (!scriptFiles.containsKey(app)) {
				standardOutput.pipeText("No files found.");
			}
			standardOutput.pipeNewline();
		}

	}

	private void addFilesToCollection(final AppEnum app, final File file) {
		if (!file.isDirectory()) {
			if (!scriptFiles.containsKey(app)) {
				scriptFiles.put(app, new ArrayList<File>());
			}
			final List<File> files = scriptFiles.get(app);
			files.add(file);

		}
	}

	private void copyRenameFiles() {
		standardOutput.pipeDelimiter("Version Copy Files");
		sequenceNumber = 1;
		for (final AppEnum app : applications) {
			standardOutput.pipeText("Files versioned and copied over for: " + app.toString());
			copyRenameFilesOfApp(app);
			standardOutput.pipeNewline();
		}
	}

	private void copyRenameFilesOfApp(final AppEnum app) {
		final List<File> files = scriptFiles.get(app);
		final String version = appVersionComponent.getVersion(AppEnum.Dashboard);

		if (files == null) {
			standardOutput.pipeErrorText("No files found");
			return;
		}

		for (final File originalFile : files) {
			if (originalFile.getName().startsWith("#")) {
				final String newFileName = getNewFilename(true, originalFile, version, sequenceNumber);
				try {
					final File copyToFile = new File(destinationFilepath, newFileName);
					if (copyToFile.exists()) {
						copyToFile.delete();
					}
					copyFile(originalFile, copyToFile);
					standardOutput.pipeText("original: " + originalFile.getName());
					standardOutput.pipeText("copiedAs: " + copyToFile.getName());
					sequenceNumber += 1;
				} catch (final Exception ex) {
					standardOutput.pipeErrorText("Error converting file: " + originalFile.getName());
				}
			}
		}
	}

	private void renameFilesLocally() {
		standardOutput.pipeDelimiter("Version Rename Files");
		for (final AppEnum app : applications) {
			sequenceNumber = 1;
			standardOutput.pipeText("Files versioned locally for: " + app.toString());
			renameFilesLocallyOfApp(app);
			standardOutput.pipeNewline();
		}
	}

	private void renameFilesLocallyOfApp(final AppEnum app) {
		final List<File> files = scriptFiles.get(app);
		final String version = appVersionComponent.getVersion(app);

		if (files == null) {
			standardOutput.pipeErrorText("No files found");
			return;
		}

		for (final File originalFile : files) {
			if (originalFile.getName().startsWith("#")) {
				final String newFileName = getNewFilename(false, originalFile, version, sequenceNumber);
				try {
					originalFile.renameTo(new File(originalFile.getParentFile() + "\\" + newFileName));
					standardOutput.pipeText("original: " + originalFile.getName());
					standardOutput.pipeText("renamedTo: " + newFileName);
					sequenceNumber += 1;
				} catch (final Exception ex) {
					standardOutput.pipeErrorText("Error renaming file: " + originalFile.getName());
				}

			}

		}
	}


	private String getNewFilename(final boolean forMigration, final File originalFile, final String version,
			final int sequenceNumber) {
		final String localSequenceString = getSequenceString(sequenceNumber);
		String filename = version + "." + localSequenceString + "__" + originalFile.getName();
		if (forMigration) {
			filename = "V" + filename;
		}
		return filename;
	}

	private String getSequenceString(final int sequenceNumber) {
		return sequenceNumber < 10 ? "00" + sequenceNumber
				: sequenceNumber < 100 ? "0" + sequenceNumber : String.valueOf(sequenceNumber);
	}

	private static void copyFile(final File source, final File dest) throws IOException {
		InputStream is = null;
		OutputStream os = null;
		try {
			is = new FileInputStream(source);
			os = new FileOutputStream(dest);
			final byte[] buffer = new byte[1024];
			int length;
			while ((length = is.read(buffer)) > 0) {
				os.write(buffer, 0, length);
			}
		} finally {
			is.close();
			os.close();
		}
	}
}
