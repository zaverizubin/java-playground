package com.nexusglobal.ui.presenters;

import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.events.ProcessInstanceSummaryActionEvent;
import com.nexusglobal.ui.interfaces.IProcessInstanceSummaryClickListener;
import com.nexusglobal.ui.views.MainView;

@PrototypeComponent
public class MainPresenter implements IProcessInstanceSummaryClickListener {

	private MainView view;

	public void setView(final MainView view) {
		this.view = view;
	}

	@Override
	public void onClickEvent(final ProcessInstanceSummaryActionEvent event) {
		switch (event.getAction()) {
		case GetActiveTask:
			view.showActiveTaskView(event.getTask());
			break;
		case GetCompletedTasks:
			view.showHistoricTaskSummaryView(event.getHistoricTaskInstance());
			break;
		default:
			break;
		}

	}


}
