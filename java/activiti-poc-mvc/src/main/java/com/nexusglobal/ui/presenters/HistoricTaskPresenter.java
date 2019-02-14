package com.nexusglobal.ui.presenters;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.repository.ProcessDefinition;

import com.nexusglobal.services.activiti.ActivitiService;
import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.events.TaskClickEvent;
import com.nexusglobal.ui.interfaces.IClickEventPublisher;
import com.nexusglobal.ui.viewmodels.HistoricTaskViewModel;
import com.nexusglobal.ui.views.HistoricTaskView;

@PrototypeComponent
public class HistoricTaskPresenter implements IClickEventPublisher<TaskClickEvent> {

	private final List<Consumer<TaskClickEvent>> clickListeners = new ArrayList<>();
	private HistoricTaskView view;
	private final HistoricTaskViewModel viewModel;
	private final ActivitiService activitiService;



	public HistoricTaskPresenter(final HistoricTaskViewModel viewModel,
			final ActivitiService activitiService) {
		this.viewModel = viewModel;
		this.activitiService = activitiService;
	}

	public void setView(final HistoricTaskView view) {
		this.view = view;
	}

	public HistoricTaskViewModel getViewModel() {
		return viewModel;
	}

	public void updateViewModel(final HistoricTaskInstance historicTaskInstance) {
		viewModel.setHistoricTaskInstance(historicTaskInstance);
		final ProcessDefinition processDefinition = activitiService.getRepositoryServiceProvider()
				.getProcessDefinition(historicTaskInstance.getProcessDefinitionId());
		viewModel.setProcessDefinition(processDefinition);
		view.refresh();
	}

	public void onBackToProcessClick() {
		publishEvent(new TaskClickEvent(TaskClickEvent.TaskClickEnum.Close));
	}

	@Override
	public void addClickListener(final Consumer<TaskClickEvent> listener) {
		if (!clickListeners.contains(listener)) {
			clickListeners.add(listener);
		}

	}

	@Override
	public void removeClickListener(final Consumer<TaskClickEvent> listener) {
		if (clickListeners.contains(listener)) {
			clickListeners.remove(listener);
		}

	}

	@Override
	public void publishEvent(final TaskClickEvent event) {
		for (final Consumer<TaskClickEvent> listener : clickListeners) {
			listener.accept(event);
		}

	}

}
