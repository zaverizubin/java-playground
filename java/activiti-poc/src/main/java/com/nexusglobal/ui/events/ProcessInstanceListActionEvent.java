package com.nexusglobal.ui.events;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.ui.presenters.ProcessInstanceListPresenter.ProcessInstancesActionEnum;

public class ProcessInstanceListActionEvent {
	
	private final ProcessInstancesActionEnum action;
	private final ProcessInstanceModel processInstanceModel;

	public ProcessInstanceListActionEvent(final ProcessInstancesActionEnum action,
			final ProcessInstanceModel processInstanceModel) {
		this.action = action;
		this.processInstanceModel = processInstanceModel;
	}

	public ProcessInstancesActionEnum getAction() {
		return action;
	}

	public ProcessInstanceModel getProcessInstanceModel() {
		return processInstanceModel;
	}
}
