package com.nexusglobal.ui.presenters;


import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.runtime.ProcessInstance;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.models.SessionData;
import com.nexusglobal.services.activiti.ProcessService;
import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.events.ProcessDefinitionClickEvent;
import com.nexusglobal.ui.events.ProcessInstanceListClickEvent;
import com.nexusglobal.ui.interfaces.IClickEventPublisher;
import com.nexusglobal.ui.viewmodels.ProcessInstanceListViewModel;
import com.nexusglobal.ui.views.ProcessInstanceListView;

@PrototypeComponent
public class ProcessInstanceListPresenter implements IClickEventPublisher<ProcessInstanceListClickEvent> {

	private final List<Consumer<ProcessInstanceListClickEvent>> clickListeners = new ArrayList<>();
	private final ProcessInstanceListViewModel viewModel;
	private final ProcessService processDefinitionService;
	private ProcessInstanceListView view;

	public enum ProcessInstanceClickEnum {
		ShowDetails
	}

	public ProcessInstanceListPresenter(final ProcessInstanceListViewModel viewModel,
			final ProcessService processDefinitionService) {
		this.viewModel = viewModel;
		this.processDefinitionService = processDefinitionService;
	}

	public void setView(final ProcessInstanceListView view) {
		this.view = view;
	}

	public ProcessInstanceListViewModel getViewModel() {
		return viewModel;
	}

	private void createNewProcessInstance(final ProcessDefinitionClickEvent event) {
		if (event.getProcessDefinitionId() == null) {
			throw new NullPointerException();
		}
		processDefinitionService.createNewProcessInstance(event.getProcessDefinitionId(),SessionData.getSessionData().getUserId());
		showRunningProcessInstances(event);
		view.refresh();
	}

	private void cancelAllprocessInstances(final ProcessDefinitionClickEvent event) {
		if (event.getProcessDefinitionId() == null) {
			throw new NullPointerException();
		}
		processDefinitionService.cancelAllProcessInstances(event.getProcessDefinitionId());
		showCompletedProcessInstances(event);
		view.refresh();
	}

	private void showRunningProcessInstances(final ProcessDefinitionClickEvent event) {
		List<ProcessInstanceModel> processInstanceModels = null;

		final List<ProcessInstance> processInstances = processDefinitionService.getRunningProcessInstancesByUser(event.getProcessDefinitionId(), SessionData.getSessionData().getUserId());
		processInstanceModels = new ProcessInstanceModel().createProcessInstanceModels(processInstances);
		viewModel.setProcessInstanceModels(processInstanceModels);
		view.refresh();
	}

	private void showCompletedProcessInstances(final ProcessDefinitionClickEvent event) {
		List<ProcessInstanceModel> processInstanceModels = null;
		final List<HistoricProcessInstance> historicalProcessInstances = processDefinitionService
				.getCompletedProcessInstancesByUser(event.getProcessDefinitionId(), SessionData.getSessionData().getUserId());
		processInstanceModels = new ProcessInstanceModel()
				.createHistoricProcessInstanceModels(historicalProcessInstances);
		viewModel.setProcessInstanceModels(processInstanceModels);
		view.refresh();
	}

	private void showAllProcessInstances(final ProcessDefinitionClickEvent event) {
		List<ProcessInstanceModel> processInstanceModels = null;
		final List<ProcessInstance> processInstances = processDefinitionService.getRunningProcessInstancesByUser(event.getProcessDefinitionId(),SessionData.getSessionData().getUserId());

		processInstanceModels = new ProcessInstanceModel().createProcessInstanceModels(processInstances);
		final List<HistoricProcessInstance> historicalProcessInstances = processDefinitionService
				.getCompletedProcessInstancesByUser(event.getProcessDefinitionId(), SessionData.getSessionData().getUserId());
		processInstanceModels
		.addAll(new ProcessInstanceModel().createHistoricProcessInstanceModels(historicalProcessInstances));
		viewModel.setProcessInstanceModels(processInstanceModels);
		view.refresh();
	}

	public void onButtonClick(final ProcessInstanceClickEnum action,
			final ProcessInstanceModel processInstanceModel) {

		viewModel.setActiveProcessInstanceModel(processInstanceModel);
		for (final Consumer<ProcessInstanceListClickEvent> listener : clickListeners) {
			final ProcessInstanceListClickEvent event = new ProcessInstanceListClickEvent(action,
					viewModel.getActiveProcessInstanceModel());
			listener.accept(event);
		}
	}

	public void onProcessDefinitionClickEvent(final ProcessDefinitionClickEvent event) {
		switch (event.getAction()) {
		case New:
			createNewProcessInstance(event);
			break;
		case CancelAll:
			cancelAllprocessInstances(event);
			break;
		case Running:
			showRunningProcessInstances(event);
			break;
		case Completed:
			showCompletedProcessInstances(event);
			break;
		case All:
			showAllProcessInstances(event);
			break;
		default:
			break;
		}
	}

	@Override
	public void addClickListener(final Consumer<ProcessInstanceListClickEvent> listener) {
		if (!clickListeners.contains(listener)) {
			clickListeners.add(listener);
		}
	}

	@Override
	public void removeClickListener(final Consumer<ProcessInstanceListClickEvent> listener) {
		if (clickListeners.contains(listener)) {
			clickListeners.remove(listener);
		}
	}

}
