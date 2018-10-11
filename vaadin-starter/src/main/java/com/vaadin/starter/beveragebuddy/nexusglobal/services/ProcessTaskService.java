package com.vaadin.starter.beveragebuddy.nexusglobal.services;

import java.util.List;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.task.Task;

public class ProcessTaskService {

	ProcessEngine processEngine;

	public ProcessTaskService(final ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

	public List<Task> getTaskForProcessInstance(final String processInstanceId) {
		return processEngine.getTaskService().createTaskQuery().processInstanceId(processInstanceId).list();
	}

	public void claimTask(final Task task, final String userId) {
		processEngine.getTaskService().claim(task.getId(), userId);
	}

	public void markTaskAsComplete(final Task task) {
		processEngine.getTaskService().complete(task.getId());
	}
}
