package com.nexusglobal.ui.viewmodels;

import org.activiti.engine.task.Task;
import org.springframework.stereotype.Component;

@Component
public class ActiveTaskViewModel {

	private Task task;

	public void setTask(final Task task) {
		this.task = task;

	}

}
