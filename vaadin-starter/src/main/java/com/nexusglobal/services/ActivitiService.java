package com.nexusglobal.services;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;

public class ActivitiService {

	private final ProcessEngine processEngine;
	private static ActivitiService activitiService;
	private final RepositoryService repositoryService;
	private final RuntimeService runtimeService;
	private final TaskService taskService;
	private final IdentityService identityService;
	private final HistoryService historyService;

	private ActivitiService() {
		processEngine = ProcessEngines.getDefaultProcessEngine();
		repositoryService = new RepositoryService(processEngine);
		runtimeService = new RuntimeService(processEngine);
		taskService = new TaskService(processEngine);
		identityService = new IdentityService(processEngine);
		historyService = new HistoryService(processEngine);
	}

	public static ActivitiService getActivitiService() {
		if (activitiService == null) {
			activitiService = new ActivitiService();
		}
		return activitiService;
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
