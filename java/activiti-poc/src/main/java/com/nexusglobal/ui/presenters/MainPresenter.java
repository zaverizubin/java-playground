package com.nexusglobal.ui.presenters;

import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.events.ProcessInstanceSummaryClickEvent;
import com.nexusglobal.ui.views.MainView;

@PrototypeComponent
public class MainPresenter {

	private MainView view;

	public void setView(final MainView view) {
		this.view = view;
	}

	public void onProcessInstanceSummaryClickEvent(final ProcessInstanceSummaryClickEvent event) {
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
