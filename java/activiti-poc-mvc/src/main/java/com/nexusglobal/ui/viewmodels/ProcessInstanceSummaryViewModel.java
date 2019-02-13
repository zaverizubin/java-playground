package com.nexusglobal.ui.viewmodels;

import java.util.List;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.task.Task;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.ui.common.PrototypeComponent;

@PrototypeComponent
public class ProcessInstanceSummaryViewModel {

	private ProcessInstanceModel activeProcessInstanceModel;

	private List<Task> taskList;

	private List<HistoricTaskInstance> historicTasksList;

	public ProcessInstanceModel getActiveProcessInstanceModel() {
		return activeProcessInstanceModel;
	}

	public void setActiveProcessInstanceModel(final ProcessInstanceModel activeProcessInstanceModel) {
		this.activeProcessInstanceModel = activeProcessInstanceModel;
	}

	public List<Task> getNextTaskList() {
		return taskList;
	}

	public void setNextTaskList(final List<Task> taskList) {
		this.taskList = taskList;
	}

	public List<HistoricTaskInstance> getHistoricTaskList() {
		return historicTasksList;
	}

	public void setHistoricTaskList(final List<HistoricTaskInstance> historicTasksList) {
		this.historicTasksList = historicTasksList;
	}
}
