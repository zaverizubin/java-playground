package com.vaadin.starter.beveragebuddy.nexusglobal.services;

import org.activiti.engine.ProcessEngine;

public class HistoryService {

	ProcessEngine processEngine;

	public HistoryService(final ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

}
