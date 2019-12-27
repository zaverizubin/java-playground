package com.playground.design_patterns.structural;

import org.junit.Before;
import org.junit.Test;

import com.playground.design_patterns.behavorial.observer.Editor;
import com.playground.design_patterns.behavorial.observer.EmailNotificationListener;
import com.playground.design_patterns.behavorial.observer.LogOpenListener;

public class ObserverTest {

	

	@Before
	public void before() {
		
	}

	@Test
	public void testObserver_success() {
	
		Editor editor = new Editor();
        editor.events.subscribe("open", new LogOpenListener("/path/to/log/file.txt"));
        editor.events.subscribe("save", new EmailNotificationListener("admin@example.com"));

        try {
            editor.openFile("test.txt");
            editor.saveFile();
        } catch (Exception e) {
            e.printStackTrace();
        }
	}

	

}
