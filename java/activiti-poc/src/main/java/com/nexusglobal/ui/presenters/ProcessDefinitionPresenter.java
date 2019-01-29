package com.nexusglobal.ui.presenters;

import java.util.ArrayList;
import java.util.List;

import org.activiti.engine.repository.ProcessDefinition;

import com.nexusglobal.services.ProcessDefinitionService;
import com.nexusglobal.ui.events.ProcessDefinitionActionEvent;
import com.nexusglobal.ui.interfaces.IActionPublisher;
import com.nexusglobal.ui.interfaces.IProcessDefinitionActionListener;
import com.nexusglobal.ui.viewmodels.ProcessDefinitionViewModel;
import com.nexusglobal.ui.views.ProcessDefinitionView;

public class ProcessDefinitionPresenter implements IActionPublisher<IProcessDefinitionActionListener> {

	private final List<IProcessDefinitionActionListener> processDefinitionActionListeners = new ArrayList<>();
	private final ProcessDefinitionViewModel viewModel;
	private final ProcessDefinitionService  processDefinitionService;
	private ProcessDefinitionView view;

	public enum ProcessDefinitionActionEnum {
		New, CancelAll, Running, Completed, All
	}


	public ProcessDefinitionPresenter(final ProcessDefinitionViewModel viewModel, final ProcessDefinitionService processDefinitionService) {
		this.viewModel = viewModel;
		this.processDefinitionService  = processDefinitionService;
		updateViewModel();
	}

	public void setView(final ProcessDefinitionView view) {
		this.view = view;
	}

	public ProcessDefinitionViewModel getViewModel() {
		return viewModel;
	}

	public void updateViewModel() {
		final List<ProcessDefinition> processDefinitions = processDefinitionService.getProcessDefinitions();
		viewModel.setProcessDefinitions(processDefinitions);
	}

	public void onProcessDefinitionChange(final ProcessDefinition processDefinition) {
		viewModel.setActiveProcessDefinition(processDefinition);
	}

	public void onButtonClick(final ProcessDefinitionActionEnum action) {
		for (final IProcessDefinitionActionListener listener : processDefinitionActionListeners) {
			final ProcessDefinitionActionEvent event = new ProcessDefinitionActionEvent(action,
					viewModel.getActiveProcessDefinition().getId());
			listener.onActionEvent(event);
		}
	}

	@Override
	public void addActionListener(final IProcessDefinitionActionListener Listener) {
		if (!processDefinitionActionListeners.contains(Listener)) {
			processDefinitionActionListeners.add(Listener);
		}
	}

	@Override
	public void removeActionListener(final IProcessDefinitionActionListener Listener) {
		if (processDefinitionActionListeners.contains(Listener)) {
			processDefinitionActionListeners.remove(Listener);
		}
	}


}
