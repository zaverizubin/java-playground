package com.nexusglobal.ui.presenters;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.nexusglobal.models.SessionData;
import com.nexusglobal.services.activiti.ActivitiService;
import com.nexusglobal.ui.events.ProcessDefinitionClickEvent;
import com.nexusglobal.ui.events.ProcessDefinitionClickEvent.ProcessDefinitionClickEnum;
import com.nexusglobal.ui.events.ProcessInstanceSummaryClickEvent;
import com.nexusglobal.ui.interfaces.IClickEventPublisher;
import com.nexusglobal.ui.viewmodels.ProcessDefinitionViewModel;
import com.nexusglobal.ui.views.ProcessDefinitionView;

@Component
@Scope(BeanDefinition.SCOPE_PROTOTYPE)
public class ProcessDefinitionPresenter implements IClickEventPublisher<ProcessDefinitionClickEvent> {

	private final List<Consumer<ProcessDefinitionClickEvent>> clickListeners = new ArrayList<>();
	private final ProcessDefinitionViewModel viewModel;
	private final ActivitiService activitiService;
	private ProcessDefinitionView view;

	public ProcessDefinitionPresenter(final ProcessDefinitionViewModel viewModel,
			final ActivitiService activitiService) {
		this.viewModel = viewModel;
		this.activitiService = activitiService;
		populateViewModel();
	}

	public void setView(final ProcessDefinitionView view) {
		this.view = view;
	}

	public ProcessDefinitionViewModel getViewModel() {
		return viewModel;
	}

	private void populateViewModel() {
		final List<ProcessDefinition> processDefinitions = activitiService.getRepositoryServiceProvider()
				.getProcessDefinitionsByDeploymentKey(SessionData.getSessionData().getDeploymentKey());
		viewModel.setProcessDefinitions(processDefinitions);
	}

	public void onProcessDefinitionChange(final ProcessDefinition processDefinition) {
		viewModel.setActiveProcessDefinition(processDefinition);
	}

	public void onButtonClick(final ProcessDefinitionClickEnum action) {
		if (viewModel.getActiveProcessDefinition() == null) {
			return;
		}
		final ProcessDefinitionClickEvent event = new ProcessDefinitionClickEvent(action,
				viewModel.getActiveProcessDefinition().getId());
		publishEvent(event);

	}

	public void onProcessInstanceSummaryClickEvent(final ProcessInstanceSummaryClickEvent event) {
		switch (event.getAction()) {
		case Cancel:
			onButtonClick(ProcessDefinitionClickEnum.Completed);
		default:
			break;
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

	@Override
	public void publishEvent(final ProcessDefinitionClickEvent event) {
		for (final Consumer<ProcessDefinitionClickEvent> listener : clickListeners) {
			listener.accept(event);
		}

	}

}
