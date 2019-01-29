package com.nexusglobal.ui.presenters;


import java.util.ArrayList;
import java.util.List;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.task.Task;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.services.ProcessDefinitionService;
import com.nexusglobal.services.ProcessInstanceTaskService;
import com.nexusglobal.ui.events.ProcessInstanceListActionEvent;
import com.nexusglobal.ui.events.ProcessInstanceSummaryActionEvent;
import com.nexusglobal.ui.interfaces.IActionPublisher;
import com.nexusglobal.ui.interfaces.IProcessInstanceListActionListener;
import com.nexusglobal.ui.interfaces.IProcessInstanceSummaryActionListener;
import com.nexusglobal.ui.viewmodels.ProcessInstanceSummaryViewModel;
import com.nexusglobal.ui.views.ProcessInstanceSummaryView;

public class ProcessInstanceSummaryPresenter
implements IProcessInstanceListActionListener, IActionPublisher<IProcessInstanceSummaryActionListener> {

	private final List<IProcessInstanceSummaryActionListener> actionListeners = new ArrayList<>();
	private final ProcessInstanceSummaryViewModel viewModel;
	private ProcessInstanceSummaryView view;

	private final ProcessDefinitionService processDefinitionService;
	private final ProcessInstanceTaskService processInstanceTaskService;


	public enum ProcessInstanceSummaryActionEnum {
		Cancel, Delete, GetActiveTask, GetCompletedTasks
	}

	public ProcessInstanceSummaryPresenter(final ProcessInstanceSummaryViewModel viewModel,
			final ProcessDefinitionService processDefinitionService,
			final ProcessInstanceTaskService processInstanceTaskService) {
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

	public ProcessInstanceSummaryViewModel getData() {
		final ProcessInstanceModel processInstanceModel = viewModel.getActiveProcessInstanceModel();
		if(processInstanceModel == null) {
			throw new IllegalArgumentException();
		}
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

	public void onButtonClick(final ProcessInstanceSummaryActionEnum action, final Task task) {
		for (final IProcessInstanceSummaryActionListener listener : actionListeners) {
			final ProcessInstanceSummaryActionEvent event = new ProcessInstanceSummaryActionEvent(action,
					task, null);
			listener.onActionEvent(event);
		}
	}

	public void onButtonClick(final ProcessInstanceSummaryActionEnum action,
			final HistoricTaskInstance historicTaskInstance) {
		for (final IProcessInstanceSummaryActionListener listener : actionListeners) {
			final ProcessInstanceSummaryActionEvent event = new ProcessInstanceSummaryActionEvent(action,
					null, historicTaskInstance);
			listener.onActionEvent(event);
		}
	}

	private void cancelProcessInstance() {
		processDefinitionService.cancelProcessInstance(viewModel.getActiveProcessInstanceModel().getId());
	}

	private void deleteProcessInstance() {
		// TODO Auto-generated method stub

	}

	@Override
	public void onActionEvent(final ProcessInstanceListActionEvent event) {
		viewModel.setActiveProcessInstanceModel(event.getProcessInstanceModel());
	}

	@Override
	public void addActionListener(final IProcessInstanceSummaryActionListener Listener) {
		if (!actionListeners.contains(Listener)) {
			actionListeners.add(Listener);
		}

	}

	@Override
	public void removeActionListener(final IProcessInstanceSummaryActionListener Listener) {
		if (actionListeners.contains(Listener)) {
			actionListeners.remove(Listener);
		}

	}



}
