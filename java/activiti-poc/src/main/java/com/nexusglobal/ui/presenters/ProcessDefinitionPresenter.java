package com.nexusglobal.ui.presenters;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.nexusglobal.models.SessionData;
import com.nexusglobal.services.ProcessService;
import com.nexusglobal.ui.events.ProcessDefinitionClickEvent;
import com.nexusglobal.ui.events.ProcessDefinitionClickEvent.ProcessDefinitionClickEnum;
import com.nexusglobal.ui.interfaces.IClickEventPublisher;
import com.nexusglobal.ui.viewmodels.ProcessDefinitionViewModel;
import com.nexusglobal.ui.views.ProcessDefinitionView;

@Component
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class ProcessDefinitionPresenter implements IClickEventPublisher<ProcessDefinitionClickEvent> {

	private final List<Consumer<ProcessDefinitionClickEvent>> clickListeners = new ArrayList<>();
	private final ProcessDefinitionViewModel viewModel;
	private final ProcessService processDefinitionService;
	private ProcessDefinitionView view;

	public ProcessDefinitionPresenter(final ProcessDefinitionViewModel viewModel,
			final ProcessService processDefinitionService) {
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
		final List<ProcessDefinition> processDefinitions = processDefinitionService
				.getProcessDefinitions(SessionData.getSessionData().getDeploymentKey());
		viewModel.setProcessDefinitions(processDefinitions);
	}

	public void onProcessDefinitionChange(final ProcessDefinition processDefinition) {
		viewModel.setActiveProcessDefinition(processDefinition);
	}

	public void onButtonClick(final ProcessDefinitionClickEnum action) {
		if (viewModel.getActiveProcessDefinition() == null) {
			return;
		}
		for (final Consumer<ProcessDefinitionClickEvent> listener : clickListeners) {
			final ProcessDefinitionClickEvent event = new ProcessDefinitionClickEvent(action,
					viewModel.getActiveProcessDefinition().getId());
			listener.accept(event);
		}
	}

	@Override
	public void addClickListener(final Consumer<ProcessDefinitionClickEvent> listener) {
		if (!clickListeners.contains(listener)) {
			clickListeners.add(listener);
		}
	}

	@Override
	public void removeClickListener(final Consumer<ProcessDefinitionClickEvent> listener) {
		if (clickListeners.contains(listener)) {
			clickListeners.remove(listener);
		}
	}

}
