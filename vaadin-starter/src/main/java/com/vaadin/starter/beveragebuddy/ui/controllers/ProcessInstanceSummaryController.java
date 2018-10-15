package com.vaadin.starter.beveragebuddy.ui.controllers;

import java.util.List;

import org.activiti.engine.history.HistoricTaskInstance;

import com.vaadin.starter.beveragebuddy.nexusglobal.models.ProcessInstanceDetail;
import com.vaadin.starter.beveragebuddy.nexusglobal.services.ActivitiService;
import com.vaadin.starter.beveragebuddy.ui.views.activiti.ProcessInstanceSummaryView;

public class ProcessInstanceSummaryController {

	ProcessInstanceSummaryView view;
	private ActivitiService activitiService;

	public ProcessInstanceSummaryController(final ProcessInstanceSummaryView view) {
		this.view = view;
		initActivitiService();
	}

	private void initActivitiService() {
		activitiService = ActivitiService.getActivitiService();
	}
	public void onCancelProcessClick(final ProcessInstanceDetail processInstanceDetail) {
		cancelProcessInstance(processInstanceDetail.getId(), null);
		view.resetParentView();
	}

	public void cancelProcessInstance(final String id, final Object object) {
		// TODO Auto-generated method stub

	}

	public void onActiveTaskClick() {
		// TODO Auto-generated method stub

	}

	public void onCompletedTaskClick() {
		// TODO Auto-generated method stub

	}

	public List<HistoricTaskInstance> getCompletedTasksForProcessInstance(
			final ProcessInstanceDetail processInstanceDetail) {
		return activitiService.getHistoryService()
				.getCompletedTaskListForProcessInstance(processInstanceDetail.getId());

	}

}
