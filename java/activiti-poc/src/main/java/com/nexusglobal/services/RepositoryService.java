package com.nexusglobal.services;

import java.util.List;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;

public class RepositoryService {

	ProcessEngine processEngine;

	public RepositoryService(final ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

	// Process Definitions
	public List<ProcessDefinition> getProcessDefinitions(final String deploymentId){
		return processEngine.getRepositoryService().createProcessDefinitionQuery().deploymentId(deploymentId)
				.latestVersion().list();
	}

	public ProcessDefinition getProcessDefinition(final String processDefinitionId) {
		return processEngine.getRepositoryService().createProcessDefinitionQuery()
				.processDefinitionId(processDefinitionId).latestVersion().singleResult();
	}

	public Deployment getDeployment(final String deploymentKey) {
		return processEngine.getRepositoryService().createDeploymentQuery().deploymentKey(deploymentKey).latest()
				.singleResult();
	}

	// Process Model BPMN
	public BpmnModel getProcessDefinitionModel(final String processDefinitionId){
		return processEngine.getRepositoryService().getBpmnModel(processDefinitionId);
	}





}
