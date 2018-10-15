package com.nexusglobal.controllers;

import org.activiti.engine.repository.ProcessDefinition;

import com.nexusglobal.services.ActivitiService;
import com.nexusglobal.ui.views.HistoricTaskSummaryView;

public class TaskSummaryController {

	private final HistoricTaskSummaryView view;
	private ActivitiService activitiService;

	public TaskSummaryController(final HistoricTaskSummaryView view) {
		this.view = view;
		initActivitiService();
	}

	private void initActivitiService() {
		activitiService = ActivitiService.getActivitiService();
	}

	public ProcessDefinition getProcessDefinition(final String processDefinitionId) {
		return activitiService.getRepositoryService().getProcessDefinition(processDefinitionId);
	}

}
