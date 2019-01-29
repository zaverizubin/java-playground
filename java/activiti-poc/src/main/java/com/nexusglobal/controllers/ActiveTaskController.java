package com.nexusglobal.controllers;

import java.util.List;
import java.util.Map;

import org.activiti.engine.form.TaskFormData;
import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.form.api.Form;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.services.activiti.ActivitiService;
import com.nexusglobal.ui.views.Old_ActiveTaskView;

public class ActiveTaskController {

	private final Old_ActiveTaskView view;
	private ActivitiService activitiService;

	public ActiveTaskController(final Old_ActiveTaskView view) {
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

	public List<HistoricTaskInstance> getCompletedTasksForProcessInstance(
			final ProcessInstanceModel processInstanceDetail) {
		return activitiService.getHistoryService()
				.getCompletedTaskListForProcessInstance(processInstanceDetail.getId());

	}
}
