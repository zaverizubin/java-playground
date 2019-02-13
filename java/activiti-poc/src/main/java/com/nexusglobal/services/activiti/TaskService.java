package com.nexusglobal.services.activiti;

import java.util.List;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.task.Task;
import org.springframework.stereotype.Service;

import com.nexusglobal.models.ProcessInstanceModel;

@Service
public class TaskService {

	private final ActivitiService activitiService;

	public TaskService(final ActivitiService activitiService) {
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