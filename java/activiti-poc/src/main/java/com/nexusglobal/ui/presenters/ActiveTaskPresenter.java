package com.nexusglobal.ui.presenters;

import org.activiti.engine.task.Task;
import org.springframework.stereotype.Component;

import com.nexusglobal.services.ProcessInstanceTaskService;
import com.nexusglobal.ui.viewmodels.ActiveTaskViewModel;
import com.nexusglobal.ui.views.ActiveTaskView;

@Component
public class ActiveTaskPresenter {

	private ActiveTaskView view;
	private final ActiveTaskViewModel viewModel;
	private final ProcessInstanceTaskService processInstanceTaskService;

	public ActiveTaskPresenter(final ActiveTaskViewModel viewModel,
			final ProcessInstanceTaskService processInstanceTaskService) {
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
