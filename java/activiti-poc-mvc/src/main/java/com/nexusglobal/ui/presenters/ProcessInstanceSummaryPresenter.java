package com.nexusglobal.ui.presenters;


import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.task.Task;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.models.SessionData;
import com.nexusglobal.services.activiti.ProcessService;
import com.nexusglobal.services.activiti.TaskService;
import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.events.ProcessInstanceListClickEvent;
import com.nexusglobal.ui.events.ProcessInstanceSummaryClickEvent;
import com.nexusglobal.ui.interfaces.IClickEventPublisher;
import com.nexusglobal.ui.viewmodels.ProcessInstanceSummaryViewModel;
import com.nexusglobal.ui.views.ProcessInstanceSummaryView;

@PrototypeComponent
public class ProcessInstanceSummaryPresenter implements IClickEventPublisher<ProcessInstanceSummaryClickEvent> {

	private final List<Consumer<ProcessInstanceSummaryClickEvent>> actionListeners = new ArrayList<>();
	private final ProcessInstanceSummaryViewModel viewModel;
	private ProcessInstanceSummaryView view;

	private final ProcessService processDefinitionService;
	private final TaskService processInstanceTaskService;


	public enum ProcessInstanceSummaryActionEnum {
		Cancel, Delete, GetActiveTask, GetCompletedTasks
	}

	public ProcessInstanceSummaryPresenter(final ProcessInstanceSummaryViewModel viewModel,
			final ProcessService processDefinitionService,
			final TaskService processInstanceTaskService) {
		this.viewModel = viewModel;
		this.processDefinitionService = processDefinitionService;
		this.processInstanceTaskService = processInstanceTaskService;
	}

	public void setView(final ProcessInstanceSummaryView view) {
		this.view = view;
	}

	public ProcessInstanceSummaryViewModel getViewModel() {
		return viewModel;
	}

	public ProcessInstanceSummaryViewModel updateViewModel() {

		final ProcessInstanceModel processInstanceModel = SessionData.getSessionData().getProcessInstanceModel();
		if(processInstanceModel == null) {
			throw new IllegalArgumentException();
		}
		viewModel.setActiveProcessInstanceModel(processInstanceModel);
		viewModel.setNextTaskList(processInstanceTaskService.getNextTaskForProcessInstance(processInstanceModel));
		viewModel.setHistoricTaskList(
				processInstanceTaskService.getCompletedTasksForProcessInstance(processInstanceModel));
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
		for (final Consumer<ProcessInstanceSummaryClickEvent> listener : actionListeners) {
			final ProcessInstanceSummaryClickEvent event = new ProcessInstanceSummaryClickEvent(action,
					task, null);
			listener.accept(event);
		}
	}

	public void onHistoricTaskClick(final ProcessInstanceSummaryActionEnum action,
			final HistoricTaskInstance historicTaskInstance) {
		for (final Consumer<ProcessInstanceSummaryClickEvent> listener : actionListeners) {
			final ProcessInstanceSummaryClickEvent event = new ProcessInstanceSummaryClickEvent(action,
					null, historicTaskInstance);
			listener.accept(event);
		}
	}

	private void cancelProcessInstance() {
		processDefinitionService.cancelProcessInstance(viewModel.getActiveProcessInstanceModel().getId());
		for (final Consumer<ProcessInstanceSummaryClickEvent> listener : actionListeners) {
			final ProcessInstanceSummaryClickEvent event = new ProcessInstanceSummaryClickEvent(
					ProcessInstanceSummaryActionEnum.Cancel, null, null);
			listener.accept(event);
		}
		view.clearView();
	}

	private void deleteProcessInstance() {
		// TODO Auto-generated method stub

	}

	public void onProcessInstanceClickEvent(final ProcessInstanceListClickEvent event) {
		updateViewModel();
		view.refresh();
	}

	@Override
	public void addClickListener(final Consumer<ProcessInstanceSummaryClickEvent> Listener) {
		if (!actionListeners.contains(Listener)) {
			actionListeners.add(Listener);
		}
	}

	@Override
	public void removeClickListener(final Consumer<ProcessInstanceSummaryClickEvent> Listener) {
		if (actionListeners.contains(Listener)) {
			actionListeners.remove(Listener);
		}
	}




}
