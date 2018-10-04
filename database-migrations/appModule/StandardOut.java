import java.awt.Color;

import javax.swing.JTextPane;
import javax.swing.text.AttributeSet;
import javax.swing.text.SimpleAttributeSet;
import javax.swing.text.StyleConstants;
import javax.swing.text.StyleContext;

public class StandardOut {

	JTextPane output;

	public StandardOut(final JTextPane textpane) {
		output = textpane;

	}

	public void clearAll() {
		output.setText("");

	}

	public void pipeDelimiter(final String title) {
		pipeText("--------------------------------------------------------------------------------\n"
				+ "------------------------" + title + "--------------------------\n"
				+ "--------------------------------------------------------------------------------\n");
	}

	public void pipeNewline() {
		pipeText("\n");
	}

	public void pipeText(final String msg) {
		output.setText(output.getText() + msg + "\n");
	}

	public void pipeErrorText(final String msg) {
		output.setText(output.getText() + msg + "\n");
		// appendToOuput(output.getText() + "\n" + msg + "\n", Color.RED);
	}

	private void appendToOuput(final String msg, final Color c) {
		final StyleContext sc = StyleContext.getDefaultStyleContext();
		AttributeSet attributeSet = sc.addAttribute(SimpleAttributeSet.EMPTY, StyleConstants.Foreground, c);

		attributeSet = sc.addAttribute(attributeSet, StyleConstants.FontFamily, "Lucida Console");
		attributeSet = sc.addAttribute(attributeSet, StyleConstants.Alignment, StyleConstants.ALIGN_JUSTIFIED);

		final int len = output.getDocument().getLength();
		output.setCaretPosition(len);
		output.setCharacterAttributes(attributeSet, false);
		output.replaceSelection(msg);

	}


}
