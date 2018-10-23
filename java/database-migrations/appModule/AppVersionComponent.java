import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridLayout;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.border.StrokeBorder;

public class AppVersionComponent {

	private JPanel panel;

	private JTextField JTextField1_1;
	private JTextField JTextField1_2;
	private JTextField JTextField1_3;
	private JTextField JTextField1_4;

	private JTextField JTextField2_1;
	private JTextField JTextField2_2;
	private JTextField JTextField2_3;
	private JTextField JTextField2_4;

	private JTextField JTextField3_1;
	private JTextField JTextField3_2;
	private JTextField JTextField3_3;
	private JTextField JTextField3_4;

	private JTextField JTextField4_1;
	private JTextField JTextField4_2;
	private JTextField JTextField4_3;
	private JTextField JTextField4_4;

	private JTextField JTextField5_1;
	private JTextField JTextField5_2;
	private JTextField JTextField5_3;
	private JTextField JTextField5_4;

	public JPanel createVersionGrid() {
		panel = new JPanel();
		panel.setBackground(Color.LIGHT_GRAY);
		panel.setPreferredSize(new Dimension(500, 200));

		final GridLayout layout = new GridLayout(6, 4);
		layout.preferredLayoutSize(panel);

		panel.setLayout(layout);

		panel.add(new JLabel(""));
		panel.add(new JLabel("Major"));
		panel.add(new JLabel("Minor"));
		panel.add(new JLabel("Build"));
		panel.add(new JLabel("Revision"));
		panel.setBorder(new StrokeBorder(new BasicStroke(1f)));

		panel.add(new JLabel("Optimizer Suite"));
		JTextField1_1 = new JTextField("1");
		JTextField1_2 = new JTextField("1");
		JTextField1_3 = new JTextField("1");
		JTextField1_4 = new JTextField("1");
		panel.add(JTextField1_1);
		panel.add(JTextField1_2);
		panel.add(JTextField1_3);
		panel.add(JTextField1_4);

		panel.add(new JLabel("Data Opt"));
		JTextField2_1 = new JTextField("2");
		JTextField2_2 = new JTextField("2");
		JTextField2_3 = new JTextField("2");
		JTextField2_4 = new JTextField("2");
		panel.add(JTextField2_1);
		panel.add(JTextField2_2);
		panel.add(JTextField2_3);
		panel.add(JTextField2_4);

		panel.add(new JLabel("Planning Opt"));
		JTextField3_1 = new JTextField("3");
		JTextField3_2 = new JTextField("3");
		JTextField3_3 = new JTextField("3");
		JTextField3_4 = new JTextField("3");
		panel.add(JTextField3_1);
		panel.add(JTextField3_2);
		panel.add(JTextField3_3);
		panel.add(JTextField3_4);

		panel.add(new JLabel("Investigation Opt"));
		JTextField4_1 = new JTextField("4");
		JTextField4_2 = new JTextField("4");
		JTextField4_3 = new JTextField("4");
		JTextField4_4 = new JTextField("4");
		panel.add(JTextField4_1);
		panel.add(JTextField4_2);
		panel.add(JTextField4_3);
		panel.add(JTextField4_4);

		panel.add(new JLabel("Strategy Opt"));
		JTextField5_1 = new JTextField("5");
		JTextField5_2 = new JTextField("5");
		JTextField5_3 = new JTextField("5");
		JTextField5_4 = new JTextField("5");
		panel.add(JTextField5_1);
		panel.add(JTextField5_2);
		panel.add(JTextField5_3);
		panel.add(JTextField5_4);

		return panel;
	}

	public boolean validate() {
		if (isTextValid(JTextField1_1) && isTextValid(JTextField1_2) && isTextValid(JTextField1_3)
				&& isTextValid(JTextField1_4) && isTextValid(JTextField2_1) && isTextValid(JTextField2_2)
				&& isTextValid(JTextField2_3) && isTextValid(JTextField2_4) && isTextValid(JTextField3_1)
				&& isTextValid(JTextField3_2) && isTextValid(JTextField3_3) && isTextValid(JTextField3_4)
				&& isTextValid(JTextField4_1) && isTextValid(JTextField4_2) && isTextValid(JTextField4_3)
				&& isTextValid(JTextField4_4) && isTextValid(JTextField5_1) && isTextValid(JTextField5_2)
				&& isTextValid(JTextField5_3) && isTextValid(JTextField5_4)) {
			return true;
		}
		return false;
	}

	private boolean isTextValid(final JTextField textfield) {
		if ("".equals(textfield.getText())) {
			return false;
		}
		try {
			Integer.parseInt(textfield.getText());
		} catch (final NumberFormatException ex) {
			return false;
		}
		return true;
	}

	public String getOSVersion() {
		return String.format("%s.%s.%s.%s", JTextField1_1.getText(), JTextField1_2.getText(), JTextField1_3.getText(),
				JTextField1_4.getText());
	}

	public String getDOVersion() {
		return String.format("%s.%s.%s.%s", JTextField2_1.getText(), JTextField2_2.getText(), JTextField2_3.getText(),
				JTextField2_4.getText());
	}

	public String getPOVersion() {
		return String.format("%s.%s.%s.%s", JTextField3_1.getText(), JTextField3_2.getText(), JTextField3_3.getText(),
				JTextField3_4.getText());
	}

	public String getIOVersion() {
		return String.format("%s.%s.%s.%s", JTextField4_1.getText(), JTextField4_2.getText(), JTextField4_3.getText(),
				JTextField4_4.getText());
	}

	public String getSOVersion() {
		return String.format("%s.%s.%s.%s", JTextField5_1.getText(), JTextField5_2.getText(), JTextField5_3.getText(),
				JTextField5_4.getText());
	}

	public String getVersion(final AppEnum app) {
		final String version = "";
		switch (app) {
		case Dashboard:
			return getOSVersion();
		case DataOptimizer:
			return getDOVersion();
		case PlanningOptimizer:
			return getPOVersion();
		case InvestigationOptimizer:
			return getIOVersion();
		case StrategyOptimizer:
			return getSOVersion();
		}
		return version;
	}

}
