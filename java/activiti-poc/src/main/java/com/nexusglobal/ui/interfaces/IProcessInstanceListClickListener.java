package com.nexusglobal.ui.interfaces;

import com.nexusglobal.ui.events.ProcessInstanceListActionEvent;

@FunctionalInterface
public interface IProcessInstanceListClickListener {

	void onClickEvent(ProcessInstanceListActionEvent event);
}


