package com.nexusglobal.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.springframework.stereotype.Service;

import com.nexusglobal.models.SessionData;
import com.nexusglobal.services.activiti.ActivitiService;

@Service
public class ProcessDefinitionService {

	private final ActivitiService activitiService;

	public ProcessDefinitionService(final ActivitiService activitiService) {
		this.activitiService = activitiService;
	}

	public List<ProcessDefinition> getProcessDefinitions() {
		List<ProcessDefinition> processDefinitions = new ArrayList<>();

		final Deployment deployment = activitiService.getRepositoryServiceProvider()
				.getDeployment(SessionData.getSessionData().getDeploymentKey());
		if (deployment != null) {
			processDefinitions = activitiService.getRepositoryServiceProvider().getProcessDefinitions(deployment.getId());
		}
		return processDefinitions;
	}

	public ProcessDefinition getProcessDefinition(final String processDefinitionId) {
		return activitiService.getRepositoryServiceProvider().getProcessDefinition(processDefinitionId);
	}

	public void createNewProcessInstance(final String processDefinitionId, final String userId) {
		final ProcessInstance processInstance = startProcessInstance(processDefinitionId, userId);
		assignUserToProcessInstance(processInstance.getId(), userId);
		assignVariablesToProcessInstance(processInstance.getId());
	}

	public void cancelAllProcessInstances(final String processDefinitionId) {
		List<ProcessInstance> processInstances = null;
		processInstances = activitiService.getRuntimeServiceProvider().getProcessInstances(processDefinitionId);
		for (final ProcessInstance processInstance : processInstances) {
			activitiService.getRuntimeServiceProvider().deleteProcessInstance(processInstance.getId(), null);
		}
	}

	public List<ProcessInstance> getRunningProcessInstancesByUser(final String processDefinitionId, final String userId) {
		return activitiService.getRuntimeServiceProvider().getRunningProcessInstancesByUser(processDefinitionId, userId);
	}

	public List<HistoricProcessInstance> getCompletedProcessInstancesByUser(final String processDefinitionId, final String userId) {
		return activitiService.getHistoryServiceProvider()
				.getCompletedProcessInstancesByUser(processDefinitionId, userId);

	}

	public void cancelProcessInstance(final String processInstanceId) {
		activitiService.getRuntimeServiceProvider().deleteProcessInstance(processInstanceId, "cancelled");
	}

	private ProcessInstance startProcessInstance(final String processDefinitionId, final String userId) {
		final ProcessInstance processInstance = activitiService.getRuntimeServiceProvider()
				.startProcessInstance(processDefinitionId, userId);
		return processInstance;
	}

	private void assignUserToProcessInstance(final String processInstanceId, final String userId) {
		activitiService.getRuntimeServiceProvider().addUserToProcessInstance(processInstanceId, userId);
	}

	private void assignVariablesToProcessInstance(final String processInstanceId) {
		final HashMap<String, Boolean> variables = new HashMap<>();
		variables.put("goahead", false);
		activitiService.getRuntimeServiceProvider().setProcessInstanceVariables(processInstanceId, variables);
	}


}
