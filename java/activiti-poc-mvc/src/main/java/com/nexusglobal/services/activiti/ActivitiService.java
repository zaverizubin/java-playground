package com.nexusglobal.services.activiti;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.springframework.stereotype.Service;


@Service
public class ActivitiService {

	private final ProcessEngine processEngine;
	private static ActivitiService activitiService;
	private final RepositoryServiceProvider repositoryServiceProvider;
	private final RuntimeServiceProvider runtimeServiceProvider;
	private final TaskServiceProvider taskServiceProvider;
	private final IdentityServiceProvider identityServiceProvider;
	private final HistoryServiceProvider historyServiceProvider;
	private final FormEngineRepositoryServiceProvider formEngineRepositoryServiceProvider;

	public ActivitiService() {
		processEngine = ProcessEngines.getDefaultProcessEngine();
		repositoryServiceProvider = new RepositoryServiceProvider(processEngine);
		runtimeServiceProvider = new RuntimeServiceProvider(processEngine);
		taskServiceProvider = new TaskServiceProvider(processEngine);
		identityServiceProvider = new IdentityServiceProvider(processEngine);
		historyServiceProvider = new HistoryServiceProvider(processEngine);
		formEngineRepositoryServiceProvider = new FormEngineRepositoryServiceProvider(processEngine);
	}

	public static ActivitiService getActivitiService() {
		if (activitiService == null) {
			activitiService = new ActivitiService();
		}
		return activitiService;
	}

	public ProcessEngine getProcessEngine() {
		return processEngine;
	}

	public RepositoryServiceProvider getRepositoryServiceProvider() {
		return repositoryServiceProvider;
	}

	public RuntimeServiceProvider getRuntimeServiceProvider() {
		return runtimeServiceProvider;
	}

	public TaskServiceProvider getTaskServiceProvider() {
		return taskServiceProvider;
	}

	public IdentityServiceProvider getIdentityServiceProvider() {
		return identityServiceProvider;
	}

	public HistoryServiceProvider getHistoryServiceProvider() {
		return historyServiceProvider;
	}

	public FormEngineRepositoryServiceProvider getFormEngineRepositoryServiceProvider() {
		return formEngineRepositoryServiceProvider;
	}

}
