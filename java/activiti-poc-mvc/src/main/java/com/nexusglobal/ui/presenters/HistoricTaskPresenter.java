package com.nexusglobal.ui.presenters;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.repository.ProcessDefinition;

import com.nexusglobal.services.activiti.ProcessService;
import com.nexusglobal.services.activiti.TaskService;
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
	private final ProcessService processDefinitionService;
	private final TaskService processInstanceTaskService;


	public HistoricTaskPresenter(final HistoricTaskViewModel viewModel,
			final ProcessService processDefinitionService,
			final TaskService processInstanceTaskService) {
		this.viewModel = viewModel;
		this.processDefinitionService = processDefinitionService;
		this.processInstanceTaskService = processInstanceTaskService;
	}

	public void setView(final HistoricTaskView view) {
		this.view = view;
	}

	public HistoricTaskViewModel getViewModel() {
		return viewModel;
	}

	public void updateViewModel(final HistoricTaskInstance historicTaskInstance) {
		viewModel.setHistoricTaskInstance(historicTaskInstance);
		final ProcessDefinition processDefinition = processDefinitionService
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
