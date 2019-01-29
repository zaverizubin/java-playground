package com.nexusglobal.controllers;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.form.api.Form;

import com.nexusglobal.services.activiti.ActivitiService;
import com.nexusglobal.ui.views.Old_HistoricTaskSummaryView;

public class HistoricTaskSummaryController {

	private final Old_HistoricTaskSummaryView view;
	private ActivitiService activitiService;

	public HistoricTaskSummaryController(final Old_HistoricTaskSummaryView view) {
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
