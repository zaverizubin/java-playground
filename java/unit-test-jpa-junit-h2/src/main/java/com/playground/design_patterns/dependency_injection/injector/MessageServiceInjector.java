package com.playground.design_patterns.dependency_injection.injector;

import com.playground.design_patterns.dependency_injection.consumer.Consumer;

public interface MessageServiceInjector {

	public Consumer getConsumer();
}
