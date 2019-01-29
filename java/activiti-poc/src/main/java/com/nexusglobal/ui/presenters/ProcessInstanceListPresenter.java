package com.nexusglobal.ui.presenters;


import java.util.ArrayList;
import java.util.List;

import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.runtime.ProcessInstance;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.services.ProcessDefinitionService;
import com.nexusglobal.ui.events.ProcessDefinitionActionEvent;
import com.nexusglobal.ui.events.ProcessInstanceListActionEvent;
import com.nexusglobal.ui.interfaces.IActionPublisher;
import com.nexusglobal.ui.interfaces.IProcessDefinitionActionListener;
import com.nexusglobal.ui.interfaces.IProcessInstanceListActionListener;
import com.nexusglobal.ui.viewmodels.ProcessInstanceListViewModel;
import com.nexusglobal.ui.views.ProcessInstanceListView;

public class ProcessInstanceListPresenter
implements IProcessDefinitionActionListener, IActionPublisher<IProcessInstanceListActionListener> {

	private final List<IProcessInstanceListActionListener> actionListeners = new ArrayList<>();
	private final ProcessInstanceListViewModel viewModel;
	private final ProcessDefinitionService processDefinitionService;
	private ProcessInstanceListView view;

	public enum ProcessInstancesActionEnum {
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

	private void createNewProcessInstance(final ProcessDefinitionActionEvent event) {
		if (event.getProcessDefinitionId() == null) {
			throw new NullPointerException();
		}
		processDefinitionService.createNewProcessInstance(event.getProcessDefinitionId());
	}

	private void cancelAllprocessInstances(final ProcessDefinitionActionEvent event) {
		if (event.getProcessDefinitionId() == null) {
			throw new NullPointerException();
		}
		processDefinitionService.cancelAllProcessInstances(event.getProcessDefinitionId());
	}

	private void showRunningProcessInstances(final ProcessDefinitionActionEvent event) {
		List<ProcessInstanceModel> processInstanceModels = null;

		final List<ProcessInstance> processInstances = processDefinitionService.getRunningProcessInstancesByUser();
		processInstanceModels = new ProcessInstanceModel().createProcessInstanceModels(processInstances);
		viewModel.setProcessInstanceModels(processInstanceModels);
		view.refresh();
	}

	private void showCompletedProcessInstances(final ProcessDefinitionActionEvent event) {
		List<ProcessInstanceModel> processInstanceModels = null;
		final List<HistoricProcessInstance> historicalProcessInstances = processDefinitionService
				.getCompletedProcessInstancesByUser();
		processInstanceModels = new ProcessInstanceModel()
				.createHistoricProcessInstanceModels(historicalProcessInstances);
		viewModel.setProcessInstanceModels(processInstanceModels);
		view.refresh();
	}

	private void showAllProcessInstances(final ProcessDefinitionActionEvent event) {
		List<ProcessInstanceModel> processInstanceModels = null;
		final List<ProcessInstance> processInstances = processDefinitionService.getRunningProcessInstancesByUser();

		processInstanceModels = new ProcessInstanceModel().createProcessInstanceModels(processInstances);
		final List<HistoricProcessInstance> historicalProcessInstances = processDefinitionService
				.getCompletedProcessInstancesByUser();
		processInstanceModels
		.addAll(new ProcessInstanceModel().createHistoricProcessInstanceModels(historicalProcessInstances));
		viewModel.setProcessInstanceModels(processInstanceModels);

		view.refresh();
	}

	public void onButtonClick(final ProcessInstancesActionEnum action,
			final ProcessInstanceModel processInstanceModel) {

		viewModel.setActiveProcessInstanceModel(processInstanceModel);
		for (final IProcessInstanceListActionListener listener : actionListeners) {
			final ProcessInstanceListActionEvent event = new ProcessInstanceListActionEvent(action,
					viewModel.getActiveProcessInstanceModel());
			listener.onActionEvent(event);
		}

	}

	@Override
	public void onActionEvent(final ProcessDefinitionActionEvent event) {
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
	public void addActionListener(final IProcessInstanceListActionListener Listener) {
		if (!actionListeners.contains(Listener)) {
			actionListeners.add(Listener);
		}
	}

	@Override
	public void removeActionListener(final IProcessInstanceListActionListener Listener) {
		if (actionListeners.contains(Listener)) {
			actionListeners.remove(Listener);
		}
	}

}
