package com.nexusglobal.ui.viewmodels;

import org.activiti.engine.task.Task;

import com.nexusglobal.ui.common.PrototypeComponent;

@PrototypeComponent
public class ActiveTaskViewModel {

	private Task task;

	public void setTask(final Task task) {
		this.task = task;

	}

}
