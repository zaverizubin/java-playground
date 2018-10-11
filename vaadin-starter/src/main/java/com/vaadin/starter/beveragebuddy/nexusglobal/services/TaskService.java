package com.vaadin.starter.beveragebuddy.nexusglobal.services;

import java.util.List;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.task.Task;

public class TaskService {
	ProcessEngine processEngine;

	public TaskService(final ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

	public List<Task> getTaskListForProcessInstance(final String processInstanceId) {
		return processEngine.getTaskService().createTaskQuery().processInstanceId(processInstanceId).list();
	}

	public void assignUserToTask(final String taskId, final String userId) {
		processEngine.getTaskService().addCandidateUser(taskId, userId);
	}

	public void claimTask(final String taskId, final String userId) {
		processEngine.getTaskService().claim(taskId, userId);
	}
}
