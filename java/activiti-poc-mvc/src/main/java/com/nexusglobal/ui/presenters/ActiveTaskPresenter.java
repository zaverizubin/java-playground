package com.nexusglobal.ui.presenters;

import org.activiti.engine.task.Task;

import com.nexusglobal.services.activiti.TaskService;
import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.viewmodels.ActiveTaskViewModel;
import com.nexusglobal.ui.views.ActiveTaskView;

@PrototypeComponent
public class ActiveTaskPresenter {

	private ActiveTaskView view;
	private final ActiveTaskViewModel viewModel;
	private final TaskService processInstanceTaskService;

	public ActiveTaskPresenter(final ActiveTaskViewModel viewModel,
			final TaskService processInstanceTaskService) {
		this.viewModel = viewModel;
		this.processInstanceTaskService = processInstanceTaskService;
	}

	public void setView(final ActiveTaskView view) {
		this.view = view;
	}

	public ActiveTaskViewModel getViewModel() {
		return viewModel;
	}

	public void updateViewModel(final Task task) {
		viewModel.setTask(task);
	}
}
