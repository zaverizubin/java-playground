package com.nexusglobal.ui.events;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.task.Task;

import com.nexusglobal.ui.presenters.ProcessInstanceSummaryPresenter.ProcessInstanceSummaryActionEnum;

public class ProcessInstanceSummaryClickEvent {
	
	private final ProcessInstanceSummaryActionEnum action;
	private final Task task;
	private final HistoricTaskInstance historicTaskInstance;

	public ProcessInstanceSummaryClickEvent(final ProcessInstanceSummaryActionEnum action, final Task task,
			final HistoricTaskInstance historicTaskInstance) {
		this.action = action;
		this.task = task;
		this.historicTaskInstance = historicTaskInstance;
	}

	public ProcessInstanceSummaryActionEnum getAction() {
		return action;
	}

	public Task getTask() {
		return task;
	}

	public HistoricTaskInstance getHistoricTaskInstance() {
		return historicTaskInstance;
	}
}
