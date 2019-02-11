package com.nexusglobal.ui.viewmodels;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.nexusglobal.models.ProcessInstanceModel;

@Component
public class ProcessInstanceListViewModel {

	private ProcessInstanceModel activeProcessInstanceModel;
	private final List<ProcessInstanceModel> processInstanceModels = new ArrayList<>();

	public ProcessInstanceListViewModel() {

	}

	public ProcessInstanceModel getActiveProcessInstanceModel() {
		return activeProcessInstanceModel;
	}

	public void setActiveProcessInstanceModel(final ProcessInstanceModel activeProcessInstanceModel) {
		this.activeProcessInstanceModel = activeProcessInstanceModel;
	}

	public void clearProcessInstances() {
		processInstanceModels.clear();
	}

	public List<ProcessInstanceModel> getProcessInstanceModels() {
		return processInstanceModels;
	}

	public void setProcessInstanceModels(final List<ProcessInstanceModel> processInstanceModels) {
		clearProcessInstances();
		this.processInstanceModels.addAll(processInstanceModels);
	}



}
