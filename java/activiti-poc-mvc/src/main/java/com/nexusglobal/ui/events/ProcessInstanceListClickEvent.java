package com.nexusglobal.ui.events;


public class ProcessInstanceListClickEvent {

	public enum ProcessInstanceClickEnum {
		ShowDetails
	}

	private final ProcessInstanceClickEnum action;

	public ProcessInstanceListClickEvent(final ProcessInstanceClickEnum action) {
		this.action = action;
	}

	public ProcessInstanceClickEnum getAction() {
		return action;
	}


}
