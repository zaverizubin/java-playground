package com.nexusglobal.services;

import java.util.List;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.task.Task;
import org.springframework.stereotype.Service;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.services.activiti.ActivitiService;

@Service
public class ProcessInstanceTaskService {

	private final ActivitiService activitiService;

	public ProcessInstanceTaskService(final ActivitiService activitiService) {
		this.activitiService = activitiService;
	}

	public List<Task> getNextTaskForProcessInstance(final ProcessInstanceModel processInstanceModel) {
		return activitiService.getTaskServiceProvider().getTaskListForProcessInstance(processInstanceModel.getId());

	}

	public List<HistoricTaskInstance> getCompletedTasksForProcessInstance(
			final ProcessInstanceModel processInstanceModel) {
		return activitiService.getHistoryServiceProvider()
				.getCompletedTaskListForProcessInstance(processInstanceModel.getId());

	}
}