package com.nexusglobal.ui.events;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.ui.presenters.ProcessInstanceListPresenter.ProcessInstanceClickEnum;

public class ProcessInstanceListActionEvent {
	
	private final ProcessInstanceClickEnum action;
	private final ProcessInstanceModel processInstanceModel;

	public ProcessInstanceListActionEvent(final ProcessInstanceClickEnum action,
			final ProcessInstanceModel processInstanceModel) {
		this.action = action;
		this.processInstanceModel = processInstanceModel;
	}

	public ProcessInstanceClickEnum getAction() {
		return action;
	}

	public ProcessInstanceModel getProcessInstanceModel() {
		return processInstanceModel;
	}
}
