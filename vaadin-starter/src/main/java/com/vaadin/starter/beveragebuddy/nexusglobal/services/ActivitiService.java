package com.vaadin.starter.beveragebuddy.nexusglobal.services;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;

public class ActivitiService {

	ProcessEngine processEngine;
	RepositoryService repositoryService;
	RuntimeService runtimeService;
	TaskService taskService;
	IdentityService identityService;
	HistoryService historyService;

	public ActivitiService() {
		processEngine = ProcessEngines.getDefaultProcessEngine();
		repositoryService = new RepositoryService(processEngine);
		runtimeService = new RuntimeService(processEngine);
		taskService = new TaskService(processEngine);
		identityService = new IdentityService(processEngine);
		historyService = new HistoryService(processEngine);
	}

	public RepositoryService getRepositoryService() {
		return repositoryService;
	}

	public RuntimeService getRuntimeService() {
		return runtimeService;
	}

	public TaskService getTaskService() {
		return taskService;
	}

	public IdentityService getIdentityService() {
		return identityService;
	}

	public HistoryService getHistoryService() {
		return historyService;
	}


}
