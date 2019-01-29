package com.nexusglobal.ui.events;

import com.nexusglobal.ui.presenters.ProcessDefinitionPresenter.ProcessDefinitionActionEnum;

public class ProcessDefinitionActionEvent {

	private final ProcessDefinitionActionEnum action;
	private final String processDefinitionId;

	public ProcessDefinitionActionEvent(final ProcessDefinitionActionEnum action,
			final String processDefinitionId) {
		this.action = action;
		this.processDefinitionId = processDefinitionId;
	}

	public ProcessDefinitionActionEnum getAction() {
		return action;
	}

	public String getProcessDefinitionId() {
		return processDefinitionId;
	}

}
