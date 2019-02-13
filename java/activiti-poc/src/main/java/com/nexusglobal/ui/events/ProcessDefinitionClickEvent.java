package com.nexusglobal.ui.events;

public class ProcessDefinitionClickEvent {

	private final ProcessDefinitionClickEnum action;
	private final String processDefinitionId;

	public enum ProcessDefinitionClickEnum {
		New, CancelAll, Running, Completed, All
	}

	
	public ProcessDefinitionClickEvent(final ProcessDefinitionClickEnum action,
			final String processDefinitionId) {
		this.action = action;
		this.processDefinitionId = processDefinitionId;
	}

	public ProcessDefinitionClickEnum getAction() {
		return action;
	}

	public String getProcessDefinitionId() {
		return processDefinitionId;
	}

}
