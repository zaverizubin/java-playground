package com.nexusglobal.ui.presenters;


import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.task.Task;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.models.SessionData;
import com.nexusglobal.services.activiti.ActivitiService;
import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.events.ProcessInstanceListClickEvent;
import com.nexusglobal.ui.events.ProcessInstanceSummaryClickEvent;
import com.nexusglobal.ui.interfaces.IClickEventPublisher;
import com.nexusglobal.ui.viewmodels.ProcessInstanceSummaryViewModel;
import com.nexusglobal.ui.views.ProcessInstanceSummaryView;

@PrototypeComponent
public class ProcessInstanceSummaryPresenter implements IClickEventPublisher<ProcessInstanceSummaryClickEvent> {

	private final List<Consumer<ProcessInstanceSummaryClickEvent>> clickListeners = new ArrayList<>();
	private final ProcessInstanceSummaryViewModel viewModel;
	private ProcessInstanceSummaryView view;

	private final ActivitiService activitiService;


	public enum ProcessInstanceSummaryActionEnum {
		Cancel, Delete, GetActiveTask, GetHistoricTasks
	}

	public ProcessInstanceSummaryPresenter(final ProcessInstanceSummaryViewModel viewModel,
			final ActivitiService activitiService) {
		this.viewModel = viewModel;
		this.activitiService = activitiService;
	}

	public void setView(final ProcessInstanceSummaryView view) {
		this.view = view;
	}

	public ProcessInstanceSummaryViewModel getViewModel() {
		updateViewModel();
		return viewModel;
	}

	private ProcessInstanceSummaryViewModel updateViewModel() {

		final ProcessInstanceModel processInstanceModel = SessionData.getSessionData().getProcessInstanceModel();
		if(processInstanceModel == null) {
			throw new IllegalArgumentException();
		}
		viewModel.setActiveProcessInstanceModel(processInstanceModel);
		viewModel.setNextTaskList(
				activitiService.getTaskServiceProvider().getTaskListForProcessInstance(processInstanceModel.getId()));
		viewModel.setHistoricTaskList(
				activitiService.getHistoryServiceProvider()
				.getCompletedTaskListForProcessInstance(processInstanceModel.getId()));
		return viewModel;
	}

	public void onButtonClick(final ProcessInstanceSummaryActionEnum value) {
		switch (value) {
		case Cancel:
			cancelProcessInstance();
			break;
		case Delete:
			deleteProcessInstance();
			break;
		default:
			break;
		}
	}

	public void onActiveTaskClick(final ProcessInstanceSummaryActionEnum action, final Task task) {
		final ProcessInstanceSummaryClickEvent event = new ProcessInstanceSummaryClickEvent(action, task, null);
		publishEvent(event);

	}

	public void onHistoricTaskClick(final ProcessInstanceSummaryActionEnum action,
			final HistoricTaskInstance historicTaskInstance) {
		final ProcessInstanceSummaryClickEvent event = new ProcessInstanceSummaryClickEvent(action, null,
				historicTaskInstance);

		publishEvent(event);
	}

	private void cancelProcessInstance() {
		activitiService.getRuntimeServiceProvider()
				.deleteProcessInstance(viewModel.getActiveProcessInstanceModel().getId(), "cancelled");
		final ProcessInstanceSummaryClickEvent event = new ProcessInstanceSummaryClickEvent(
				ProcessInstanceSummaryActionEnum.Cancel, null, null);
		publishEvent(event);
		view.clearView();
	}

	private void deleteProcessInstance() {
		// TODO Auto-generated method stub

	}

	public void onProcessInstanceClickEvent(final ProcessInstanceListClickEvent event) {
		view.refresh();
	}

	@Override
	public void addClickListener(final Consumer<ProcessInstanceSummaryClickEvent> listener) {
		if (!clickListeners.contains(listener)) {
			clickListeners.add(listener);
		}
	}

	@Override
	public void removeClickListener(final Consumer<ProcessInstanceSummaryClickEvent> listener) {
		if (clickListeners.contains(listener)) {
			clickListeners.remove(listener);
		}
	}

	@Override
	public void publishEvent(final ProcessInstanceSummaryClickEvent event) {
		for (final Consumer<ProcessInstanceSummaryClickEvent> listener : clickListeners) {
			listener.accept(event);
		}

	}




}
