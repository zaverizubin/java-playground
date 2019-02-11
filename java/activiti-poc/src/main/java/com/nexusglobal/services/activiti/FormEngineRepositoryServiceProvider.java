package com.nexusglobal.services.activiti;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.form.TaskFormData;
import org.activiti.form.api.Form;

public class FormEngineRepositoryServiceProvider {

	ProcessEngine processEngine;

	public FormEngineRepositoryServiceProvider(final ProcessEngine processEngine) {
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
