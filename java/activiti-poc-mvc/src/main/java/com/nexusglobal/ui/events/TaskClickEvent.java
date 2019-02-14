package com.nexusglobal.ui.events;

public class TaskClickEvent {

	private final TaskClickEnum action;


	public enum TaskClickEnum {
		Close
	}

	public TaskClickEvent(final TaskClickEnum action) {
		this.action = action;
	}

	public TaskClickEnum getAction() {
		return action;
	}
}
