import java.awt.BasicStroke;
import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.io.File;

import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextField;
import javax.swing.JTextPane;
import javax.swing.border.StrokeBorder;

public class MainWindowComponent {

	private Migration migration;
	private StandardOut standardOutput;
	private AppVersionComponent appVersionComponent;

	private final int windowWidth;
	private final int windowHeight;

	private JFrame frame;
	private JPanel framePanel;
	private JTextField textfield1;
	private JTextField textfield2;
	private JTextField textfield3;
	private JTextPane textpane;
	private JScrollPane scrollPane;

	private JButton app1Button;
	private JButton app2Button;
	private JButton app3Button;

	private JButton migrateButton;
	private JFileChooser fileChooser;

	public MainWindowComponent() {
		windowWidth = 600;
		windowHeight = 700;
	}

	public void createWindow() {
		createFrame();
		createVersionGrid();
		createCenterPanel();
		createMigrationButton();
		createFileChooser();
		createStandardOutput();

		frame.setVisible(true);
		frame.setResizable(false);
		frame.setLocation(400, 100);
	}

	private void createFrame() {
		frame = new JFrame("Database Migration Tool");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(new Dimension(windowWidth, windowHeight));

		framePanel = new JPanel();
		frame.add(framePanel);
	}

	private void createVersionGrid() {
		appVersionComponent = new AppVersionComponent();
		final JPanel panel = appVersionComponent.createVersionGrid();
		framePanel.add(panel);
	}


	private void createCenterPanel() {
		JLabel label;

		final JPanel panel = createPanel(windowWidth - 20, 200);
		final JPanel panel1 = createPanel(windowWidth - 20, 50);
		final JPanel panel2 = createPanel(windowWidth - 20, 50);
		final JPanel panel3 = createPanel(windowWidth - 20, 50);


		label = createLabel("Select the root directory paths for each application below:", windowWidth - 20, 30);
		panel.add(label);

		label = createLabel("APM suite:", 150, 25);
		textfield1 = createTextField(350, 25);
		app1Button = createButton(50, 25);
		panel1.add(label);
		panel1.add(textfield1);
		panel1.add(app1Button);

		label = createLabel("Investigation Optimizer:", 150, 25);
		textfield2 = createTextField(350, 25);
		app2Button = createButton(50, 25);
		panel2.add(label);
		panel2.add(textfield2);
		panel2.add(app2Button);

		label = createLabel("Strategy Optimizer:", 150, 25);
		textfield3 = createTextField(350, 25);
		app3Button = createButton(50, 25);
		panel3.add(label);
		panel3.add(textfield3);
		panel3.add(app3Button);

		panel.add(panel1);
		panel.add(panel2);
		panel.add(panel3);

		textfield1.setText("E:\\work\\NexusGlobal\\Apm\\Integration");
		textfield2.setText("E:\\work\\NexusGlobal\\InvestigationOptimizer\\Master");
		textfield3.setText("E:\\work\\NexusGlobal\\StrategyOptimizer\\Master");

		framePanel.add(panel);

	}

	private void createStandardOutput() {
		JLabel label;
		final JPanel panel = createPanel(windowWidth - 20, 200);
		label = createLabel("Output:", 560, 25);
		textpane = createTextPane(540, 130);
		scrollPane = createScrollPane(560, 150, textpane);
		panel.add(label);
		panel.add(scrollPane);
		standardOutput = new StandardOut(textpane);

		framePanel.add(panel);
	}

	private void createFileChooser() {
		fileChooser = new JFileChooser();
		fileChooser.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY);
	}

	private JPanel createPanel(final int width, final int height) {
		final JPanel panel = new JPanel();
		panel.setPreferredSize(new Dimension(width, height));
		// panel.setBorder(new StrokeBorder(new BasicStroke(1f)));
		panel.setAlignmentX(Component.LEFT_ALIGNMENT);

		return panel;
	}

	private JLabel createLabel(final String text, final int width, final int height) {
		final JLabel label = new JLabel(text);
		label.setAlignmentX(Component.LEFT_ALIGNMENT);
		label.setPreferredSize(new Dimension(width, height));
		return label;
	}

	private JTextField createTextField(final int width, final int height) {
		final JTextField textfield = new JTextField();
		textfield.setAlignmentX(Component.LEFT_ALIGNMENT);
		textfield.setPreferredSize(new Dimension(width, height));
		textfield.setBorder(new StrokeBorder(new BasicStroke(1f)));
		textfield.setEditable(false);
		return textfield;
	}

	private JTextPane createTextPane(final int width, final int height) {
		final JTextPane textpane = new JTextPane();
		textpane.setAlignmentX(Component.LEFT_ALIGNMENT);
		textpane.setPreferredSize(new Dimension(width, height));
		textpane.setBorder(new StrokeBorder(new BasicStroke(1f)));
		textpane.setEditable(false);
		return textpane;
	}

	private JScrollPane createScrollPane(final int width, final int height, final JTextPane textpane) {
		final JScrollPane scrollPane = new JScrollPane(textpane);
		scrollPane.setAlignmentX(Component.LEFT_ALIGNMENT);
		scrollPane.setPreferredSize(new Dimension(width, height));
		scrollPane.setBorder(new StrokeBorder(new BasicStroke(1f)));
		return scrollPane;
	}

	private JButton createButton(final int width, final int height) {
		final JButton button = new JButton("...");
		button.setPreferredSize(new Dimension(width, height));
		button.setToolTipText("Click to choose location");
		button.addActionListener(event -> {
			openFileSelectionDialog(event);
		});
		return button;
	}

	private void createMigrationButton() {
		final JPanel panel = new JPanel();
		migrateButton = new JButton("Migrate Scripts");
		migrateButton.setSize(100, 100);
		migrateButton.addActionListener(event -> onMigrateButtonClick());
		panel.add(migrateButton);
		frame.getContentPane().add(BorderLayout.SOUTH, panel);

	}

	private void onMigrateButtonClick() {
		final int dialogResult = JOptionPane.showConfirmDialog(null, "This will migrate scripts. Are you sure?",
				"Alert", JOptionPane.YES_NO_OPTION);

		if (dialogResult == JOptionPane.YES_OPTION) {
			if (validate() && appVersionComponent.validate()) {
				migration = new Migration(textfield1.getText(), textfield2.getText(), textfield3.getText(),
						standardOutput, appVersionComponent);
				migration.migrateScripts();
			} else {
				JOptionPane.showMessageDialog(null, "You need to entry values for all fields", "Alert",
						JOptionPane.OK_OPTION);
			}
		}
	}

	private boolean validate() {
		if ("".equals(textfield1.getText()) || "".equals(textfield2.getText()) || "".equals(textfield3.getText())) {
			JOptionPane.showMessageDialog(frame, "Please select the root directory paths for each application. ",
					"Alert", JOptionPane.ERROR_MESSAGE);
			return false;
		}
		return true;
	}

	private void openFileSelectionDialog(final ActionEvent e) {
		// Handle open button action.
		final int returnVal = fileChooser.showOpenDialog(frame);

		if (returnVal == JFileChooser.APPROVE_OPTION) {
			final File file = fileChooser.getSelectedFile();
			if (e.getSource() == app1Button) {
				textfield1.setText(file.getAbsolutePath());
			} else if (e.getSource() == app2Button) {
				textfield2.setText(file.getAbsolutePath());
			} else {
				textfield3.setText(file.getAbsolutePath());
			}
		}
	}

}
