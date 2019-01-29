package com.nexusglobal.ui.interfaces;

import com.nexusglobal.ui.events.ProcessInstanceSummaryActionEvent;

@FunctionalInterface
public interface IProcessInstanceSummaryActionListener {

	void onActionEvent(ProcessInstanceSummaryActionEvent event);
}


