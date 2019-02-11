package com.nexusglobal.controllers;

import java.util.List;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.task.Task;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.services.activiti.ActivitiService;
import com.nexusglobal.ui.views.Old_ProcessInstanceSummaryView;

public class ProcessInstanceSummaryController {

	Old_ProcessInstanceSummaryView view;
	private ActivitiService activitiService;

	public ProcessInstanceSummaryController(final Old_ProcessInstanceSummaryView view) {
		this.view = view;
		initActivitiService();
	}

	private void initActivitiService() {
		activitiService = ActivitiService.getActivitiService();
	}

	public void onCancelProcessClick(final ProcessInstanceModel processInstanceDetail) {
		activitiService.getRuntimeServiceProvider().deleteProcessInstance(processInstanceDetail.getId(), "cancelled");
		view.resetParentView();
	}

	public void onDeleteProcessClick(final ProcessInstanceModel processInstanceDetail) {
		// TODO Auto-generated method stub

	}

	public void onActiveTaskClick(final Task task) {
		view.getParentView().showActiveTaskView(task);
	}

	public void onCompletedTaskClick(final HistoricTaskInstance historicTaskInstance) {
		view.getParentView().showHistoricTaskSummaryView(historicTaskInstance);
	}

	public List<Task> getNextTaskForProcessInstance(final ProcessInstanceModel processInstanceDetail) {
		return activitiService.getTaskServiceProvider().getTaskListForProcessInstance(processInstanceDetail.getId());

	}

	public List<HistoricTaskInstance> getCompletedTasksForProcessInstance(
			final ProcessInstanceModel processInstanceDetail) {
		return activitiService.getHistoryServiceProvider()
				.getCompletedTaskListForProcessInstance(processInstanceDetail.getId());

	}


}
