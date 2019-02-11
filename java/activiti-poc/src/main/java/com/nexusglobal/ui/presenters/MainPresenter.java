package com.nexusglobal.ui.presenters;

import org.springframework.stereotype.Component;

import com.nexusglobal.ui.events.ProcessInstanceSummaryActionEvent;
import com.nexusglobal.ui.interfaces.IProcessInstanceSummaryClickListener;
import com.nexusglobal.ui.views.MainView;

@Component
public class MainPresenter implements IProcessInstanceSummaryClickListener {

	private MainView view;

	public MainPresenter() {

	}

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
