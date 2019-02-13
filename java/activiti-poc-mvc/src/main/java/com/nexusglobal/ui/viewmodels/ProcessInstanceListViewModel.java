package com.nexusglobal.ui.viewmodels;

import java.util.ArrayList;
import java.util.List;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.ui.common.PrototypeComponent;

@PrototypeComponent
public class ProcessInstanceListViewModel {

	private final List<ProcessInstanceModel> processInstanceModels = new ArrayList<>();

	public List<ProcessInstanceModel> getProcessInstanceModels() {
		return processInstanceModels;
	}

	public void setProcessInstanceModels(final List<ProcessInstanceModel> processInstanceModels) {
		this.processInstanceModels.clear();
		this.processInstanceModels.addAll(processInstanceModels);
	}



}
