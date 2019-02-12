package com.nexusglobal.ui.presenters;


import java.util.ArrayList;
import java.util.List;

import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.runtime.ProcessInstance;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.models.SessionData;
import com.nexusglobal.services.ProcessDefinitionService;
import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.events.ProcessDefinitionOnClickEvent;
import com.nexusglobal.ui.events.ProcessInstanceListActionEvent;
import com.nexusglobal.ui.interfaces.IClickEventPublisher;
import com.nexusglobal.ui.interfaces.IProcessDefinitionClickListener;
import com.nexusglobal.ui.interfaces.IProcessInstanceListClickListener;
import com.nexusglobal.ui.viewmodels.ProcessInstanceListViewModel;
import com.nexusglobal.ui.views.ProcessInstanceListView;

@PrototypeComponent
public class ProcessInstanceListPresenter
implements IProcessDefinitionClickListener, IClickEventPublisher<IProcessInstanceListClickListener> {

	private final List<IProcessInstanceListClickListener> actionListeners = new ArrayList<>();
	private final ProcessInstanceListViewModel viewModel;
	private final ProcessDefinitionService processDefinitionService;
	private ProcessInstanceListView view;

	public enum ProcessInstanceClickEnum {
		ShowDetails
	}

	public ProcessInstanceListPresenter(final ProcessInstanceListViewModel viewModel,
			final ProcessDefinitionService processDefinitionService) {
		this.viewModel = viewModel;
		this.processDefinitionService = processDefinitionService;
	}

	public void setView(final ProcessInstanceListView view) {
		this.view = view;
	}

	public ProcessInstanceListViewModel getViewModel() {
		return viewModel;
	}

	private void createNewProcessInstance(final ProcessDefinitionOnClickEvent event) {
		if (event.getProcessDefinitionId() == null) {
			throw new NullPointerException();
		}
		processDefinitionService.createNewProcessInstance(event.getProcessDefinitionId(),SessionData.getSessionData().getUserId());
		showRunningProcessInstances(event);
		view.refresh();
	}

	private void cancelAllprocessInstances(final ProcessDefinitionOnClickEvent event) {
		if (event.getProcessDefinitionId() == null) {
			throw new NullPointerException();
		}
		processDefinitionService.cancelAllProcessInstances(event.getProcessDefinitionId());
		showCompletedProcessInstances(event);
		view.refresh();
	}

	private void showRunningProcessInstances(final ProcessDefinitionOnClickEvent event) {
		List<ProcessInstanceModel> processInstanceModels = null;

		final List<ProcessInstance> processInstances = processDefinitionService.getRunningProcessInstancesByUser(event.getProcessDefinitionId(), SessionData.getSessionData().getUserId());
		processInstanceModels = new ProcessInstanceModel().createProcessInstanceModels(processInstances);
		viewModel.setProcessInstanceModels(processInstanceModels);
		view.refresh();
	}

	private void showCompletedProcessInstances(final ProcessDefinitionOnClickEvent event) {
		List<ProcessInstanceModel> processInstanceModels = null;
		final List<HistoricProcessInstance> historicalProcessInstances = processDefinitionService
				.getCompletedProcessInstancesByUser(event.getProcessDefinitionId(), SessionData.getSessionData().getUserId());
		processInstanceModels = new ProcessInstanceModel()
				.createHistoricProcessInstanceModels(historicalProcessInstances);
		viewModel.setProcessInstanceModels(processInstanceModels);
		view.refresh();
	}

	private void showAllProcessInstances(final ProcessDefinitionOnClickEvent event) {
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
		for (final IProcessInstanceListClickListener listener : actionListeners) {
			final ProcessInstanceListActionEvent event = new ProcessInstanceListActionEvent(action,
					viewModel.getActiveProcessInstanceModel());
			listener.onClickEvent(event);
		}

	}

	@Override
	public void onClickEvent(final ProcessDefinitionOnClickEvent event) {
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
	public void addOnClickListener(final IProcessInstanceListClickListener Listener) {
		if (!actionListeners.contains(Listener)) {
			actionListeners.add(Listener);
		}
	}

	@Override
	public void removeOnClickListener(final IProcessInstanceListClickListener Listener) {
		if (actionListeners.contains(Listener)) {
			actionListeners.remove(Listener);
		}
	}

}
