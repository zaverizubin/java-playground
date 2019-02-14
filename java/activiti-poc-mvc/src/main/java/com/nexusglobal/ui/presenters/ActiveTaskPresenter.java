package com.nexusglobal.ui.presenters;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

import org.activiti.engine.task.Task;

import com.nexusglobal.models.SessionData;
import com.nexusglobal.services.activiti.ActivitiService;
import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.events.TaskClickEvent;
import com.nexusglobal.ui.interfaces.IClickEventPublisher;
import com.nexusglobal.ui.viewmodels.ActiveTaskViewModel;
import com.nexusglobal.ui.views.ActiveTaskView;
import com.vaadin.flow.component.textfield.TextField;

@PrototypeComponent
public class ActiveTaskPresenter implements IClickEventPublisher<TaskClickEvent> {

	private final List<Consumer<TaskClickEvent>> clickListeners = new ArrayList<>();
	private ActiveTaskView view;
	private final ActiveTaskViewModel viewModel;
	private final ActivitiService activitiService;

	public ActiveTaskPresenter(final ActiveTaskViewModel viewModel,
			final ActivitiService activitiService) {
		this.viewModel = viewModel;
		this.activitiService = activitiService;
	}

	public void setView(final ActiveTaskView view) {
		this.view = view;
	}

	public ActiveTaskViewModel getViewModel() {
		return viewModel;
	}

	public void updateViewModel(final Task task) {
		viewModel.setTask(task);
		viewModel.setProcessDefinition(activitiService.getRepositoryServiceProvider()
				.getProcessDefinition(viewModel.getTask().getProcessDefinitionId()));
		viewModel.setProcessInstance(ActivitiService.getActivitiService().getRuntimeServiceProvider()
				.getProcessInstance(SessionData.getSessionData().getProcessInstanceModel().getId()));
		viewModel.setTaskFormData(
				activitiService.getFormEngineRepositoryServiceProvider().getTaskFormData(task.getId()));
		view.refresh();
	}

	public void onBackToProcessClick() {
		publishEvent(new TaskClickEvent(TaskClickEvent.TaskClickEnum.Close));
	}

	public void onClaimTaskClick() {
		activitiService.getTaskServiceProvider().claimTask(viewModel.getTask().getId(),
				SessionData.getSessionData().getUserId());
	}

	public void onTaskCompleteClick() {
		if (viewModel.getTask().getTaskDefinitionKey()
				.equals(SessionData.getSessionData().getGeneralInformationKey())) {
			view.showPathSelectionDialog();
		} else {
			doTaskComplete();
			publishEvent(new TaskClickEvent(TaskClickEvent.TaskClickEnum.Close));
		}
	}

	public void onPathSelectionClick(final Boolean injury, final Boolean accident, final Boolean spill) {
		final HashMap<String, Boolean> variables = new HashMap<>();
		variables.put("injury", injury);
		variables.put("accident", accident);
		variables.put("spill", spill);
		ActivitiService.getActivitiService().getRuntimeServiceProvider()
		.setProcessInstanceVariables(viewModel.getProcessInstance().getId(), variables);
		doTaskComplete();
		publishEvent(new TaskClickEvent(TaskClickEvent.TaskClickEnum.Close));
	}



	public void doTaskComplete() {
		final Map<String, Object> variables = new HashMap<>();
		for (final Map.Entry<String, TextField> entry : viewModel.getFormData().entrySet()) {
			variables.put(entry.getKey(), entry.getValue().getValue());
		}
		activitiService.getTaskServiceProvider().markTaskAsComplete(viewModel.getTask().getId(), variables);
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
