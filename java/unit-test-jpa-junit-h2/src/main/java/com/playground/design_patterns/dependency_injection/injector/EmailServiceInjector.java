package com.playground.design_patterns.dependency_injection.injector;


import com.playground.design_patterns.dependency_injection.consumer.Consumer;
import com.playground.design_patterns.dependency_injection.consumer.MyDIApplication;
import com.playground.design_patterns.dependency_injection.service.EmailServiceImpl;

public class EmailServiceInjector implements MessageServiceInjector {

	@Override
	public Consumer getConsumer() {
		MyDIApplication app = new MyDIApplication();
		app.setService(new EmailServiceImpl());
		return app;
	}

}
