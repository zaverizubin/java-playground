package com.nexusglobal.ui.presenters;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.repository.ProcessDefinition;

import com.nexusglobal.services.ProcessDefinitionService;
import com.nexusglobal.services.ProcessInstanceTaskService;
import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.viewmodels.HistoricTaskViewModel;
import com.nexusglobal.ui.views.HistoricTaskView;

@PrototypeComponent
public class HistoricTaskPresenter {

	private HistoricTaskView view;
	private final HistoricTaskViewModel viewModel;
	private final ProcessDefinitionService processDefinitionService;
	private final ProcessInstanceTaskService processInstanceTaskService;


	public HistoricTaskPresenter(final HistoricTaskViewModel viewModel,
			final ProcessDefinitionService processDefinitionService,
			final ProcessInstanceTaskService processInstanceTaskService) {
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
	}
}
