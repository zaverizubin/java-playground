package com.nexusglobal.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;

import com.nexusglobal.models.SessionData;
import com.nexusglobal.services.activiti.ActivitiService;

public class ProcessDefinitionService {

	private final ActivitiService activitiService;

	public ProcessDefinitionService(final ActivitiService activitiService) {
		this.activitiService = activitiService;
	}

	public List<ProcessDefinition> getProcessDefinitions() {
		List<ProcessDefinition> processDefinitions = new ArrayList<>();

		final Deployment deployment = activitiService.getRepositoryService()
				.getDeployment(SessionData.getSessionData().getDeploymentKey());
		if (deployment != null) {
			processDefinitions = activitiService.getRepositoryService().getProcessDefinitions(deployment.getId());
		}
		return processDefinitions;
	}

	public ProcessDefinition getProcessDefinition(final String processDefinitionId) {
		return activitiService.getRepositoryService().getProcessDefinition(processDefinitionId);
	}

	public void createNewProcessInstance(final String processDefinitionid) {
		final ProcessInstance processInstance = startProcessInstance(processDefinitionid);
		assignUserToProcessInstance(processInstance.getId());
		assignVariablesToProcessInstance(processInstance.getId());
	}

	public void cancelAllProcessInstances(final String processDefinitionId) {
		List<ProcessInstance> processInstances = null;
		processInstances = activitiService.getRuntimeService().getProcessInstances(processDefinitionId);
		for (final ProcessInstance processInstance : processInstances) {
			activitiService.getRuntimeService().deleteProcessInstance(processInstance.getId(), null);
		}
	}

	public List<ProcessInstance> getRunningProcessInstancesByUser() {
		List<ProcessInstance> processInstances = null;
		processInstances = activitiService.getRuntimeService()
				.getRunningProcessInstancesByUser(SessionData.getSessionData().getUserId());
		return processInstances;
	}

	public List<HistoricProcessInstance> getCompletedProcessInstancesByUser() {
		return activitiService.getHistoryService()
				.getCompletedProcessInstancesByUser(SessionData.getSessionData().getUserId());

	}

	public void cancelProcessInstance(final String processInstanceId) {
		activitiService.getRuntimeService().deleteProcessInstance(processInstanceId, "cancelled");
	}

	private ProcessInstance startProcessInstance(final String processDefinitionId) {
		final ProcessInstance processInstance = activitiService.getRuntimeService()
				.startProcessInstance(processDefinitionId, SessionData.getSessionData().getUserId());
		return processInstance;
	}

	private void assignUserToProcessInstance(final String processInstanceId) {
		activitiService.getRuntimeService().addUserToProcessInstance(processInstanceId,
				SessionData.getSessionData().getUserId());
	}

	private void assignVariablesToProcessInstance(final String processInstanceId) {
		final HashMap<String, Boolean> variables = new HashMap<>();
		variables.put("goahead", false);
		activitiService.getRuntimeService().setProcessInstanceVariables(processInstanceId, variables);
	}


}
