package com.nexusglobal.services.activiti;

import java.util.List;
import java.util.Map;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.task.Task;

public class TaskServiceWrapper {
	ProcessEngine processEngine;

	public TaskServiceWrapper(final ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

	public List<Task> getTaskListForProcessInstance(final String processInstanceId) {
		return processEngine.getTaskService().createTaskQuery().processInstanceId(processInstanceId).active().list();
	}

	public void assignUserToTask(final String taskId, final String userId) {
		processEngine.getTaskService().addCandidateUser(taskId, userId);
	}

	public void claimTask(final String taskId, final String userId) {
		processEngine.getTaskService().claim(taskId, userId);
	}

	public void markTaskAsComplete(final String taskId, final Map<String, Object> variables) {
		processEngine.getTaskService().complete(taskId, variables, true);
	}

}
