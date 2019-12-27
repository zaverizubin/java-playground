package com.playground.design_patterns.dependency_injection.injector;

import com.playground.design_patterns.dependency_injection.consumer.Consumer;
import com.playground.design_patterns.dependency_injection.consumer.MyDIApplication;
import com.playground.design_patterns.dependency_injection.service.SMSServiceImpl;

public class SMSServiceInjector implements MessageServiceInjector {

	@Override
	public Consumer getConsumer() {
		return new MyDIApplication(new SMSServiceImpl());
	}

}
