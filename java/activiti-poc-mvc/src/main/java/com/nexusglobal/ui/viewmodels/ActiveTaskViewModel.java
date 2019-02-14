package com.nexusglobal.ui.viewmodels;

import java.util.HashMap;

import org.activiti.engine.form.TaskFormData;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;

import com.nexusglobal.ui.common.PrototypeComponent;
import com.vaadin.flow.component.textfield.TextField;

@PrototypeComponent
public class ActiveTaskViewModel {

	private Task task;

	private final HashMap<String, TextField> formData = new HashMap<>();

	private ProcessDefinition processDefinition;
	private ProcessInstance processInstance;
	private TaskFormData taskFormData;

	public HashMap<String, TextField> getFormData() {
		return formData;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(final Task task) {
		this.task = task;

	}

	public ProcessDefinition getProcessDefinition() {
		return processDefinition;
	}

	public void setProcessDefinition(final ProcessDefinition processDefinition) {
		this.processDefinition = processDefinition;
	}

	public ProcessInstance getProcessInstance() {
		return processInstance;
	}

	public void setProcessInstance(final ProcessInstance processInstance) {
		this.processInstance = processInstance;
	}

	public TaskFormData getTaskFormData() {
		return taskFormData;
	}

	public void setTaskFormData(final TaskFormData taskFormData) {
		this.taskFormData = taskFormData;
	}

}
