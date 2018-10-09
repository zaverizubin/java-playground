package com.example.nexusglobal.services;

import java.util.List;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.Model;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;

public class ActivitiService {
	
	ProcessEngine processEngine;
	DeploymentService deploymentService;
	ProcessService processService;
	ProcessTaskService  processTaskService;
	
	public ActivitiService() {
		processEngine = ProcessEngines.getDefaultProcessEngine();
		deploymentService = new DeploymentService(processEngine);
		processService = new ProcessService(processEngine);
		processTaskService = new ProcessTaskService(processEngine);
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
	
	
	
	
	
	
}
