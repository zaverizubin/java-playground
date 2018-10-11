package com.vaadin.starter.beveragebuddy.nexusglobal.services;

import java.util.List;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;

public class ProcessService {

	ProcessEngine processEngine;

	public ProcessService(final ProcessEngine processEngine) {
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

	// Process Instances
	public ProcessInstance createProcessInstance(final String processDefinitionId) {
		return processEngine.getRuntimeService().startProcessInstanceById(processDefinitionId);
	}

	public ProcessInstance getProcessInstance(final String processInstanceId) {
		return processEngine.getRuntimeService().createProcessInstanceQuery().processInstanceId(processInstanceId)
				.singleResult();
	}

	public List<ProcessInstance> getProcessInstancesByState(final String state) {
		List<ProcessInstance> activeInstances;
		List<ProcessInstance> allInstances;
		if (state == "Running") {
			return processEngine.getRuntimeService().createProcessInstanceQuery().active().orderByProcessDefinitionKey()
					.asc().list();
		} else if (state == "Completed") {
			activeInstances = processEngine.getRuntimeService().createProcessInstanceQuery().active().list();
			allInstances = processEngine.getRuntimeService().createProcessInstanceQuery().orderByProcessDefinitionKey()
					.asc()
					.list();
			for (final ProcessInstance processInstance : activeInstances) {
				allInstances.removeIf(item -> item.getId().equals(processInstance.getId()));
			}
			return allInstances;
		} else {
			return processEngine.getRuntimeService().createProcessInstanceQuery().orderByProcessDefinitionKey().asc()
					.list();
		}

	}


	public void addUserToProcessInstance(final String processInstanceId, final String userId) {
		processEngine.getRuntimeService().addParticipantUser(processInstanceId, userId);
	}

	public List<ProcessInstance> getProcessInstances(final String processDefintionId) {
		return processEngine.getRuntimeService().createProcessInstanceQuery().processDefinitionId(processDefintionId)
				.list();
	}

	public void deleteProcessInstance(final String processInstanceId) {
		processEngine.getRuntimeService().deleteProcessInstance(processInstanceId, null);
	}

	// Process Model BPMN
	public BpmnModel getProcessDefinitionModel(final String processDefinitionId){
		return processEngine.getRepositoryService().getBpmnModel(processDefinitionId);
	}





}
