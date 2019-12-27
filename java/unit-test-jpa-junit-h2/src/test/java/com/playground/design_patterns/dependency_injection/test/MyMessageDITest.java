package com.playground.design_patterns.dependency_injection.test;

import com.playground.design_patterns.dependency_injection.consumer.Consumer;
import com.playground.design_patterns.dependency_injection.injector.EmailServiceInjector;
import com.playground.design_patterns.dependency_injection.injector.MessageServiceInjector;
import com.playground.design_patterns.dependency_injection.injector.SMSServiceInjector;

public class MyMessageDITest {

	public static void main(String[] args) {
		String msg = "Hi Pankaj";
		String email = "pankaj@abc.com";
		String phone = "4088888888";
		MessageServiceInjector injector = null;
		Consumer app = null;
		
		//Send email
		injector = new EmailServiceInjector();
		app = injector.getConsumer();
		app.processMessages(msg, email);
		
		//Send SMS
		injector = new SMSServiceInjector();
		app = injector.getConsumer();
		app.processMessages(msg, phone);
	}

}
