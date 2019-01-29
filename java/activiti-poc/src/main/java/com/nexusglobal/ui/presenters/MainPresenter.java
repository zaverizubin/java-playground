package com.nexusglobal.ui.presenters;

import com.nexusglobal.ui.events.ProcessInstanceSummaryActionEvent;
import com.nexusglobal.ui.interfaces.IProcessInstanceSummaryActionListener;
import com.nexusglobal.ui.views.MainView;

public class MainPresenter implements IProcessInstanceSummaryActionListener {

	private MainView view;

	public MainPresenter() {

	}

	public void setView(final MainView view) {
		this.view = view;
	}

	@Override
	public void onActionEvent(final ProcessInstanceSummaryActionEvent event) {
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
