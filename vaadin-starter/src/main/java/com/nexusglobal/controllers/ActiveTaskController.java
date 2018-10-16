package com.nexusglobal.controllers;

import java.util.Map;

import org.activiti.engine.form.TaskFormData;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.form.api.Form;

import com.nexusglobal.services.ActivitiService;
import com.nexusglobal.ui.views.ActiveTaskView;

public class ActiveTaskController {

	private final ActiveTaskView view;
	private ActivitiService activitiService;

	public ActiveTaskController(final ActiveTaskView view) {
		this.view = view;
		initActivitiService();
	}

	private void initActivitiService() {
		activitiService = ActivitiService.getActivitiService();
	}

	public ProcessDefinition getProcessDefinition(final String processDefinitionId) {
		return activitiService.getRepositoryService().getProcessDefinition(processDefinitionId);
	}


	public void claimTask(final String taskId, final String userId) {
		activitiService.getTaskService().claimTask(taskId, userId);

	}

	public Form getForm(final String formDefinitionKey) {
		return activitiService.getFormEngineRepositoryService().getForm(formDefinitionKey);
	}

	public TaskFormData getTaskFormData(final String taskId) {
		return activitiService.getFormEngineRepositoryService().getTaskFormData(taskId);
	}

	public void completeTask(final String taskId, final Map<String, Object> variables) {
		activitiService.getTaskService().markTaskAsComplete(taskId, variables);
	}
}
