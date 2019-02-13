package com.nexusglobal.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.runtime.ProcessInstance;

public class ProcessInstanceModel {

	private Date startTime;
	private Date endTime;
	private String startUserId;
	private String name;
	private String id;
	private Boolean isEnded;

	private List<ProcessInstanceModel> processInstanceModelList;

	public ProcessInstanceModel(final ProcessInstance processInstance) {
		createProcessInstanceModel(processInstance);
	}

	public ProcessInstanceModel(final HistoricProcessInstance historicProcessInstance) {
		createProcessInstanceModel(historicProcessInstance);
	}

	private ProcessInstanceModel createProcessInstanceModel(final ProcessInstance processInstance) {
		final ProcessInstanceModel processInstanceModel = new ProcessInstanceModel();
		processInstanceModel.startTime = processInstance.getStartTime();
		processInstanceModel.endTime = null;
		processInstanceModel.startUserId = processInstance.getStartUserId();
		processInstanceModel.name = processInstance.getProcessDefinitionName();
		processInstanceModel.id = processInstance.getId();
		processInstanceModel.isEnded = false;

		return processInstanceModel;

	}

	private ProcessInstanceModel createProcessInstanceModel(final HistoricProcessInstance historicProcessInstance) {
		final ProcessInstanceModel processInstanceModel = new ProcessInstanceModel();
		processInstanceModel.startTime = historicProcessInstance.getStartTime();
		processInstanceModel.endTime = historicProcessInstance.getEndTime();
		processInstanceModel.startUserId = historicProcessInstance.getStartUserId();
		processInstanceModel.name = historicProcessInstance.getProcessDefinitionName();
		processInstanceModel.id = historicProcessInstance.getId();
		processInstanceModel.isEnded = true;

		return processInstanceModel;
	}

	public ProcessInstanceModel() {
		// TODO Auto-generated constructor stub
	}

	public Date getStartTime() {
		return startTime;
	};

	public Date getEndTime() {
		return endTime;
	}

	public String getStartUserId() {
		return startUserId;
	}

	public String getName() {
		return name;
	}

	public boolean isEnded() {
		return isEnded;
	}

	public String getId() {
		return id;
	}

	public List<ProcessInstanceModel> createProcessInstanceModels(
			final List<ProcessInstance> processInstances) {
		processInstanceModelList = new ArrayList<>();
		for(final ProcessInstance processInstance : processInstances) {
			final ProcessInstanceModel processInstanceModel = createProcessInstanceModel(processInstance);
			processInstanceModelList.add(processInstanceModel);
		}
		return processInstanceModelList;
	}

	public List<ProcessInstanceModel> createHistoricProcessInstanceModels(
			final List<HistoricProcessInstance> historicProcessInstances) {
		processInstanceModelList = new ArrayList<>();
		for (final HistoricProcessInstance historicProcessInstance : historicProcessInstances) {
			final ProcessInstanceModel processInstanceModel = createProcessInstanceModel(historicProcessInstance);
			processInstanceModelList.add(processInstanceModel);
		}
		return processInstanceModelList;
	}


}

