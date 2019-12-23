package com.playground.design_patterns.creational;

import org.junit.Before;
import org.junit.Test;

import com.playground.design_patterns.creational.factory.Dialog;
import com.playground.design_patterns.creational.factory.HtmlDialog;
import com.playground.design_patterns.creational.factory.WindowsDialog;

public class FactoryTest {

	private Dialog dialog;

	@Before
	public void before() {
		 if (System.getProperty("os.name").equals("Windows 10")) {
            dialog = new WindowsDialog();
        } else {
            dialog = new HtmlDialog();
        }
	}

	@Test
	public void runBusinessLogic_success() {
		 dialog.renderWindow();
	}

	
}
