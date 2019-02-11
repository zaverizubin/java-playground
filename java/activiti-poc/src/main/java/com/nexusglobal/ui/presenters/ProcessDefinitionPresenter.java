package com.nexusglobal.ui.presenters;

import java.util.ArrayList;
import java.util.List;

import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.stereotype.Component;

import com.nexusglobal.services.ProcessDefinitionService;
import com.nexusglobal.ui.events.ProcessDefinitionOnClickEvent;
import com.nexusglobal.ui.events.ProcessDefinitionOnClickEvent.ProcessDefinitionClickEnum;
import com.nexusglobal.ui.interfaces.IClickEventPublisher;
import com.nexusglobal.ui.interfaces.IProcessDefinitionClickListener;
import com.nexusglobal.ui.viewmodels.ProcessDefinitionViewModel;
import com.nexusglobal.ui.views.ProcessDefinitionView;

@Component
public class ProcessDefinitionPresenter implements IClickEventPublisher<IProcessDefinitionClickListener> {

	private final List<IProcessDefinitionClickListener> processDefinitionActionListeners = new ArrayList<>();
	private final ProcessDefinitionViewModel viewModel;
	private final ProcessDefinitionService processDefinitionService;
	private ProcessDefinitionView view;

	public ProcessDefinitionPresenter(final ProcessDefinitionViewModel viewModel,
			final ProcessDefinitionService processDefinitionService) {
		this.viewModel = viewModel;
		this.processDefinitionService = processDefinitionService;
		populateViewModel();
	}

	public void setView(final ProcessDefinitionView view) {
		this.view = view;
	}

	public ProcessDefinitionViewModel getViewModel() {
		return viewModel;
	}

	private void populateViewModel() {
		final List<ProcessDefinition> processDefinitions = processDefinitionService.getProcessDefinitions();
		viewModel.setProcessDefinitions(processDefinitions);
	}

	public void onProcessDefinitionChange(final ProcessDefinition processDefinition) {
		viewModel.setActiveProcessDefinition(processDefinition);
	}

	public void onButtonClick(final ProcessDefinitionClickEnum action) {
		if (viewModel.getActiveProcessDefinition() == null)
			return;
		for (final IProcessDefinitionClickListener listener : processDefinitionActionListeners) {
			final ProcessDefinitionOnClickEvent event = new ProcessDefinitionOnClickEvent(action,
					viewModel.getActiveProcessDefinition().getId());
			listener.onClickEvent(event);
		}
	}

	@Override
	public void addOnClickListener(final IProcessDefinitionClickListener Listener) {
		if (!processDefinitionActionListeners.contains(Listener)) {
			processDefinitionActionListeners.add(Listener);
		}
	}

	@Override
	public void removeOnClickListener(final IProcessDefinitionClickListener Listener) {
		if (processDefinitionActionListeners.contains(Listener)) {
			processDefinitionActionListeners.remove(Listener);
		}
	}

}
