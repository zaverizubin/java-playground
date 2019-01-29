package com.nexusglobal.ui.viewmodels;

import java.util.ArrayList;
import java.util.List;

import org.activiti.engine.repository.ProcessDefinition;

public class ProcessDefinitionViewModel {

	private ProcessDefinition processDefinition;
	private final List<ProcessDefinition> processDefinitionList = new ArrayList<>();

	public ProcessDefinitionViewModel() {

	}

	public ProcessDefinition getActiveProcessDefinition() {
		return processDefinition;
	}

	public void setActiveProcessDefinition(final ProcessDefinition processDefinition) {
		this.processDefinition = processDefinition;
	}

	public List<ProcessDefinition> getProcessDefinitions() {
		return processDefinitionList;
	}

	public void setProcessDefinitions(final List<ProcessDefinition> processDefinitions) {
		processDefinitionList.clear();
		processDefinitionList.addAll(processDefinitions);
	}
}
