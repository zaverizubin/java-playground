package com.vaadin.starter.beveragebuddy.ui.controllers;

import java.util.List;

import org.activiti.engine.identity.User;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;

import com.vaadin.starter.beveragebuddy.nexusglobal.services.ActivitiService;

public class ActivitiMainController {

	private final String deploymentKey = "incident-investigation";
	private final String userId = "admin";

	private ActivitiService activitiService;

	public ActivitiMainController() {
		initActivitiService();
	}

	private void initActivitiService() {
		activitiService = new ActivitiService();
	}

	public String getDeploymentKey() {
		return deploymentKey;
	}

	public String getUserId() {
		return userId;
	}

	public List<ProcessDefinition> getProcessDefinitions() {
		List<ProcessDefinition> processDefinitions = null;

		final Deployment deployment = activitiService.getRepositoryService().getDeployment(deploymentKey);
		if (deployment != null) {
			processDefinitions = activitiService.getRepositoryService().getProcessDefinitions(deployment.getId());
		}
		return processDefinitions;
	}

	public List<ProcessInstance> getProcessInstancesByStateAndUser(final String state) {
		List<ProcessInstance> processInstances = null;
		processInstances = activitiService.getRuntimeService().getProcessInstancesByStateAndUser(state, userId);
		return processInstances;
	}

	public List<ProcessInstance> getProcessInstances(final String processDefinitionId) {
		List<ProcessInstance> processInstances = null;
		processInstances = activitiService.getRuntimeService().getProcessInstances(processDefinitionId);
		return processInstances;
	}

	public ProcessInstance startProcessInstance(final String processDefinitionId) {
		final ProcessInstance processInstance = activitiService.getRuntimeService()
				.startProcessInstance(processDefinitionId, userId);
		return processInstance;
	}

	public void assignUserToProcessInstance(final String processInstanceId) {
		activitiService.getRuntimeService().addUserToProcessInstance(processInstanceId, userId);
	}

	public void executeProcessInstance(final String processInstanceId) {
		final ProcessInstance processInstance = activitiService.getRuntimeService()
				.getProcessInstance(processInstanceId);
		final List<Task> tasks = activitiService.getTaskService().getTaskListForProcessInstance(processInstanceId);
		activitiService.getTaskService().claimTask(tasks.get(0).getId(), userId);

	}

	public void cancelProcessInstance(final String processInstanceId, final String reason) {
		activitiService.getRuntimeService().deleteProcessInstance(processInstanceId, reason);

	}

	public void cancelProcessInstances(final String processDefinitionId) {
		List<ProcessInstance> processInstances = null;
		processInstances = activitiService.getRuntimeService().getProcessInstances(processDefinitionId);
		for (final ProcessInstance processInstance : processInstances) {
			activitiService.getRuntimeService().deleteProcessInstance(processInstance.getId(), null);
		}
	}

	public String getProcessStartUserName(final ProcessInstance processInstance) {
		String username = "<No User specified>";
		if (processInstance.getStartUserId() != null) {
			User user = null;
			user = activitiService.getIdentityService().getUser(processInstance.getStartUserId());
			if (user.getFirstName() != null) {
				username = user.getFirstName();
			}
		}
		return username;
	}
}