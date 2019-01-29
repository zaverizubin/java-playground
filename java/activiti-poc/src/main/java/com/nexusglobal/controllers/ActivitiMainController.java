package com.nexusglobal.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.identity.User;
import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.models.SessionData;
import com.nexusglobal.services.activiti.ActivitiService;
import com.nexusglobal.ui.views.Old_MainView;

public class ActivitiMainController {

	private final Old_MainView view;

	private ActivitiService activitiService;

	public ActivitiMainController(final Old_MainView view) {
		this.view = view;
		initActivitiService();
	}

	private void initActivitiService() {
		activitiService = ActivitiService.getActivitiService();
	}


	public void onProcessInstanceFilterClick(final String processInstanceFilter) {
		List<ProcessInstanceModel> processInstanceDetails = null;

		if (processInstanceFilter.equals("Running")) {
			final List<ProcessInstance> processInstances = getRunningProcessInstancesByUser();
			processInstanceDetails = new ProcessInstanceModel().createProcessInstanceModels(processInstances);
		} else if (processInstanceFilter.equals("Completed")) {
			final List<HistoricProcessInstance> historicalProcessInstances = getCompletedProcessInstancesByUser();
			processInstanceDetails = new ProcessInstanceModel()
					.createHistoricProcessInstanceModels(historicalProcessInstances);

		} else {
			final List<ProcessInstance> processInstances = getRunningProcessInstancesByUser();
			processInstanceDetails = new ProcessInstanceModel().createProcessInstanceModels(processInstances);
			final List<HistoricProcessInstance> historicalProcessInstances = getCompletedProcessInstancesByUser();
			processInstanceDetails.addAll(
					new ProcessInstanceModel().createHistoricProcessInstanceModels(historicalProcessInstances));
		}
		view.showProcessInstances(processInstanceDetails);
		view.clearDetailsView();
	}

	public void onAddNewProcessInstance(final ProcessDefinition processDefinition) {
		if (processDefinition != null) {
			final ProcessInstance processInstance = startProcessInstance(processDefinition.getId());
			assignUserToProcessInstance(processInstance.getId());
			assignVariablesToProcessInstance(processInstance.getId());
			onProcessInstanceFilterClick("Running");
			view.clearDetailsView();
		}
	}



	public void onDeleteAllInstancesClick(final ProcessDefinition processDefinition) {
		if (processDefinition != null) {
			cancelProcessInstances(processDefinition.getId());
			onProcessInstanceFilterClick("All");
			view.clearDetailsView();
		}
	}

	public List<ProcessDefinition> getProcessDefinitions() {
		List<ProcessDefinition> processDefinitions = new ArrayList<>();

		final Deployment deployment = activitiService.getRepositoryService().getDeployment(SessionData.getSessionData().getDeploymentKey());
		if (deployment != null) {
			processDefinitions = activitiService.getRepositoryService().getProcessDefinitions(deployment.getId());
		}
		return processDefinitions;
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

	public ProcessInstance startProcessInstance(final String processDefinitionId) {
		final ProcessInstance processInstance = activitiService.getRuntimeService()
				.startProcessInstance(processDefinitionId, SessionData.getSessionData().getUserId());
		return processInstance;
	}

	public void assignUserToProcessInstance(final String processInstanceId) {
		activitiService.getRuntimeService().addUserToProcessInstance(processInstanceId,
				SessionData.getSessionData().getUserId());
	}

	private void assignVariablesToProcessInstance(final String processInstanceId) {
		final HashMap<String, Boolean> variables = new HashMap<>();
		variables.put("goahead", false);
		activitiService.getRuntimeService().setProcessInstanceVariables(processInstanceId, variables);

	}

	public void executeProcessInstance(final String processInstanceId) {
		final ProcessInstance processInstance = activitiService.getRuntimeService()
				.getProcessInstance(processInstanceId);
		final List<Task> tasks = activitiService.getTaskService().getTaskListForProcessInstance(processInstanceId);
		activitiService.getTaskService().claimTask(tasks.get(0).getId(), SessionData.getSessionData().getUserId());

	}

	public void showProcessDetails(final ProcessInstanceModel processInstanceDetail) {
		view.showProcessInstanceSummaryView(processInstanceDetail);

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