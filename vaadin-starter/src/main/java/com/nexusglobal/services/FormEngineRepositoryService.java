package com.nexusglobal.services;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.form.TaskFormData;
import org.activiti.form.api.Form;

public class FormEngineRepositoryService {

	ProcessEngine processEngine;

	public FormEngineRepositoryService(final ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}


	public Form getForm(final String formDefinitionKey) {
		return processEngine.getFormEngineRepositoryService().createFormQuery().formDefinitionKey(formDefinitionKey)
				.singleResult();

	}

	public TaskFormData getTaskFormData(final String taskId) {

		return processEngine.getFormService().getTaskFormData(taskId);

	}

}
