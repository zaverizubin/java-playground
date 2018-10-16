package com.nexusglobal.controllers;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.form.api.Form;

import com.nexusglobal.services.ActivitiService;
import com.nexusglobal.ui.views.HistoricTaskSummaryView;

public class HistoricTaskSummaryController {

	private final HistoricTaskSummaryView view;
	private ActivitiService activitiService;

	public HistoricTaskSummaryController(final HistoricTaskSummaryView view) {
		this.view = view;
		initActivitiService();
	}

	private void initActivitiService() {
		activitiService = ActivitiService.getActivitiService();
	}

	public ProcessDefinition getProcessDefinition(final String processDefinitionId) {
		return activitiService.getRepositoryService().getProcessDefinition(processDefinitionId);
	}

	public HistoricTaskInstance getHistoricTaskInstance(final String taskId) {
		return activitiService.getHistoryService().getHistoricTaskInstance(taskId);
	}

	public Form getFormDefinition(final String formDefinitionKey) {
		return activitiService.getFormEngineRepositoryService().getForm(formDefinitionKey);
	}

}
