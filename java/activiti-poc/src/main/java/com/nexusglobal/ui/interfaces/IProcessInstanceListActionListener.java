package com.nexusglobal.ui.interfaces;

import com.nexusglobal.ui.events.ProcessInstanceListActionEvent;

@FunctionalInterface
public interface IProcessInstanceListActionListener {

	void onActionEvent(ProcessInstanceListActionEvent event);
}


