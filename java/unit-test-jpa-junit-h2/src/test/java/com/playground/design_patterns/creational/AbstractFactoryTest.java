package com.playground.design_patterns.creational;

import org.junit.Before;
import org.junit.Test;

import com.playground.design_patterns.creational.abstract_factory.Application;
import com.playground.design_patterns.creational.abstract_factory.GUIFactory;
import com.playground.design_patterns.creational.abstract_factory.MacOSFactory;
import com.playground.design_patterns.creational.abstract_factory.WindowsFactory;

public class AbstractFactoryTest {

	@Before
	public void before() {
	
	}
	
	private Application configureApplication() {
        Application app;
        GUIFactory factory;
        String osName = System.getProperty("os.name").toLowerCase();
        if (osName.contains("mac")) {
            factory = new MacOSFactory();
            app = new Application(factory);
        } else {
            factory = new WindowsFactory();
            app = new Application(factory);
        }
        return app;
    }

	
	@Test
	public void runBusinessLogic_success() {
		 Application app = configureApplication();
	     app.paint();
	}

	
}
