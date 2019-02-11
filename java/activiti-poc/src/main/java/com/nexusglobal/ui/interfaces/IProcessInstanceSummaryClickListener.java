package com.nexusglobal.ui.interfaces;

import com.nexusglobal.ui.events.ProcessInstanceSummaryActionEvent;

@FunctionalInterface
public interface IProcessInstanceSummaryClickListener {

	void onClickEvent(ProcessInstanceSummaryActionEvent event);
}


