package com.nexusglobal.services.activiti;

import java.util.List;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.history.HistoricTaskInstance;

public class HistoryServiceProvider {

	ProcessEngine processEngine;

	public HistoryServiceProvider(final ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

	public List<HistoricProcessInstance> getCompletedProcessInstancesByUser(final String processDefinitionId, final String userId) {
		return processEngine.getHistoryService().createHistoricProcessInstanceQuery().processDefinitionId(processDefinitionId).involvedUser(userId).finished()
				.list();
	}

	public List<HistoricTaskInstance> getCompletedTaskListForProcessInstance(final String processInstanceId) {
		return processEngine.getHistoryService().createHistoricTaskInstanceQuery().includeProcessVariables()
				.includeTaskLocalVariables()
				.processInstanceId(processInstanceId)
				.finished().list();

	}

	public HistoricTaskInstance getHistoricTaskInstance(final String taskId) {
		return processEngine.getHistoryService().createHistoricTaskInstanceQuery().includeProcessVariables()
				.includeTaskLocalVariables()
				.taskId(taskId).singleResult();

	}


}
