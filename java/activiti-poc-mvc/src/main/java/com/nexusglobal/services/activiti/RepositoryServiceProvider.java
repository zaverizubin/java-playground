package com.nexusglobal.services.activiti;

import java.util.ArrayList;
import java.util.List;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;


public class RepositoryServiceProvider {

	ProcessEngine processEngine;

	public RepositoryServiceProvider(final ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

	public List<ProcessDefinition> getProcessDefinitionsByDeploymentKey(final String deploymentKey) {
		List<ProcessDefinition> processDefinitions = new ArrayList<>();

		final Deployment deployment = getDeployment(deploymentKey);
		if (deployment != null) {
			processDefinitions = getProcessDefinitions(deployment.getId());
		}
		return processDefinitions;
	}

	// Process Definitions
	public List<ProcessDefinition> getProcessDefinitions(final String deploymentId){
		return processEngine.getRepositoryService().createProcessDefinitionQuery().deploymentId(deploymentId)
				.latestVersion().list();
	}

	public ProcessDefinition getProcessDefinition(final String processDefinitionId) {
		return processEngine.getRepositoryService().createProcessDefinitionQuery()
				.processDefinitionId(processDefinitionId).singleResult();
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
