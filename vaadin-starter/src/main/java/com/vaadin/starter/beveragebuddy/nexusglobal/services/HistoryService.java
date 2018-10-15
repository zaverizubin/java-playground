package com.vaadin.starter.beveragebuddy.nexusglobal.services;

import java.util.List;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricTaskInstance;

public class HistoryService {

	ProcessEngine processEngine;

	public HistoryService(final ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

	public List<HistoricProcessInstance> getCompletedProcessInstancesByUser(final String userId) {
		return processEngine.getHistoryService().createHistoricProcessInstanceQuery().involvedUser(userId).finished()
				.list();
	}

	public List<HistoricTaskInstance> getCompletedTaskListForProcessInstance(final String processInstanceId) {
		return processEngine.getHistoryService().createHistoricTaskInstanceQuery().processInstanceId(processInstanceId)
				.finished().list();
	}

}
