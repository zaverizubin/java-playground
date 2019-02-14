package com.nexusglobal.ui.presenters;

import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.events.ProcessDefinitionClickEvent;
import com.nexusglobal.ui.events.ProcessInstanceListClickEvent;
import com.nexusglobal.ui.events.ProcessInstanceSummaryClickEvent;
import com.nexusglobal.ui.events.TaskClickEvent;
import com.nexusglobal.ui.views.MainView;

@PrototypeComponent
public class MainPresenter {

	private MainView view;

	public void setView(final MainView view) {
		this.view = view;
	}

	public void onProcessDefinitionClickEvent(final ProcessDefinitionClickEvent event) {
		view.clearSummaryView();
	}

	public void onProcessInstanceClickEvent(final ProcessInstanceListClickEvent event) {
		view.showProcessInstanceSummaryView();
	}

	public void onProcessInstanceSummaryClickEvent(final ProcessInstanceSummaryClickEvent event) {
		switch (event.getAction()) {
		case GetActiveTask:
			view.showActiveTaskView(event.getTask());
			break;
		case GetHistoricTasks:
			view.showHistoricTaskSummaryView(event.getHistoricTaskInstance());
			break;
		default:
			break;
		}
	}

	public void onTaskClickEvent(final TaskClickEvent event) {
		view.showProcessInstanceSummaryView();
	}


	public void bindEventListeners(final ProcessDefinitionPresenter processDefinitionPresenter,
			final ProcessInstanceListPresenter processInstanceListPresenter,
			final ProcessInstanceSummaryPresenter processInstanceSummaryPresenter,
			final ActiveTaskPresenter activeTaskPresenter, final HistoricTaskPresenter historicTaskPresenter) {

		processDefinitionPresenter.addClickListener(processInstanceListPresenter::onProcessDefinitionClickEvent);
		processDefinitionPresenter.addClickListener(this::onProcessDefinitionClickEvent);

		processInstanceListPresenter.addClickListener(processInstanceSummaryPresenter::onProcessInstanceClickEvent);
		processInstanceListPresenter.addClickListener(this::onProcessInstanceClickEvent);

		processInstanceSummaryPresenter
		.addClickListener(processDefinitionPresenter::onProcessInstanceSummaryClickEvent);
		processInstanceSummaryPresenter.addClickListener(this::onProcessInstanceSummaryClickEvent);

		activeTaskPresenter.addClickListener(this::onTaskClickEvent);
		historicTaskPresenter.addClickListener(this::onTaskClickEvent);

	}

}
