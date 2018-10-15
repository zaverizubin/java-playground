package com.nexusglobal.controllers;

import java.util.List;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.task.Task;

import com.nexusglobal.models.ProcessInstanceDetail;
import com.nexusglobal.services.ActivitiService;
import com.nexusglobal.ui.views.ProcessInstanceSummaryView;

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
		activitiService.getRuntimeService().deleteProcessInstance(processInstanceDetail.getId(), "cancelled");
		view.resetParentView();
	}

	public void onDeleteProcessClick(final ProcessInstanceDetail processInstanceDetail) {
		// TODO Auto-generated method stub

	}

	public void onActiveTaskClick() {
		// TODO Auto-generated method stub

	}

	public void onCompletedTaskClick(final HistoricTaskInstance historicTaskInstance) {
		view.getParentView().showHistoricTaskSummaryView(historicTaskInstance);
	}

	public List<Task> getNextTaskForProcessInstance(final ProcessInstanceDetail processInstanceDetail) {
		return activitiService.getTaskService().getTaskListForProcessInstance(processInstanceDetail.getId());

	}

	public List<HistoricTaskInstance> getCompletedTasksForProcessInstance(
			final ProcessInstanceDetail processInstanceDetail) {
		return activitiService.getHistoryService()
				.getCompletedTaskListForProcessInstance(processInstanceDetail.getId());

	}


}
