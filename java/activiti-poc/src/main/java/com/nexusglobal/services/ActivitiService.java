package com.nexusglobal.services;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;

public class ActivitiService {

	private final ProcessEngine processEngine;
	private static ActivitiService activitiService;
	private final RepositoryServiceWrapper repositoryService;
	private final RuntimeServiceWrapper runtimeService;
	private final TaskServiceWrapper taskService;
	private final IdentityServiceWrapper identityService;
	private final HistoryServiceWrapper historyService;
	private final FormEngineRepositoryServiceWrapper formEngineRepositoryService;

	private ActivitiService() {
		processEngine = ProcessEngines.getDefaultProcessEngine();
		repositoryService = new RepositoryServiceWrapper(processEngine);
		runtimeService = new RuntimeServiceWrapper(processEngine);
		taskService = new TaskServiceWrapper(processEngine);
		identityService = new IdentityServiceWrapper(processEngine);
		historyService = new HistoryServiceWrapper(processEngine);
		formEngineRepositoryService = new FormEngineRepositoryServiceWrapper(processEngine);
	}

	public static ActivitiService getActivitiService() {
		if (activitiService == null) {
			activitiService = new ActivitiService();
		}
		return activitiService;
	}

	public RepositoryServiceWrapper getRepositoryService() {
		return repositoryService;
	}

	public RuntimeServiceWrapper getRuntimeService() {
		return runtimeService;
	}

	public TaskServiceWrapper getTaskService() {
		return taskService;
	}

	public IdentityServiceWrapper getIdentityService() {
		return identityService;
	}

	public HistoryServiceWrapper getHistoryService() {
		return historyService;
	}

	public FormEngineRepositoryServiceWrapper getFormEngineRepositoryService() {
		return formEngineRepositoryService;
	}

}
