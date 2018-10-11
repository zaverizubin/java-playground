package com.vaadin.starter.beveragebuddy.nexusglobal.services;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;

public class ActivitiService {

	ProcessEngine processEngine;
	DeploymentService deploymentService;
	ProcessService processService;
	ProcessTaskService  processTaskService;
	IdentityService identityService;

	public ActivitiService() {
		processEngine = ProcessEngines.getDefaultProcessEngine();
		deploymentService = new DeploymentService(processEngine);
		processService = new ProcessService(processEngine);
		processTaskService = new ProcessTaskService(processEngine);
		identityService = new IdentityService(processEngine);
	}

	public DeploymentService getDeploymentService() {
		return deploymentService;
	}

	public ProcessService getProcessService() {
		return processService;
	}

	public ProcessTaskService getProcessTaskService() {
		return processTaskService;
	}

	public IdentityService getIdentityService() {
		return identityService;
	}




}
