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

	private List<ProcessInstanceModel> processInstanceDetails;

	public ProcessInstanceModel(final ProcessInstance processInstance) {
		createProcessInstanceModel(processInstance);
	}

	public ProcessInstanceModel(final HistoricProcessInstance historicProcessInstance) {
		createProcessInstanceModel(historicProcessInstance);
	}

	private ProcessInstanceModel createProcessInstanceModel(final ProcessInstance processInstance) {
		final ProcessInstanceModel processInstanceDetail = new ProcessInstanceModel();
		processInstanceDetail.startTime = processInstance.getStartTime();
		processInstanceDetail.endTime = null;
		processInstanceDetail.startUserId = processInstance.getStartUserId();
		processInstanceDetail.name = processInstance.getProcessDefinitionName();
		processInstanceDetail.id = processInstance.getId();
		processInstanceDetail.isEnded = false;

		return processInstanceDetail;

	}

	private ProcessInstanceModel createProcessInstanceModel(final HistoricProcessInstance historicProcessInstance) {
		final ProcessInstanceModel processInstanceDetail = new ProcessInstanceModel();
		processInstanceDetail.startTime = historicProcessInstance.getStartTime();
		processInstanceDetail.endTime = historicProcessInstance.getEndTime();
		processInstanceDetail.startUserId = historicProcessInstance.getStartUserId();
		processInstanceDetail.name = historicProcessInstance.getProcessDefinitionName();
		processInstanceDetail.id = historicProcessInstance.getId();
		processInstanceDetail.isEnded = true;

		return processInstanceDetail;
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
		processInstanceDetails = new ArrayList<>();
		for(final ProcessInstance processInstance : processInstances) {
			final ProcessInstanceModel processInstanceDetail = createProcessInstanceModel(processInstance);
			processInstanceDetails.add(processInstanceDetail);
		}
		return processInstanceDetails;
	}

	public List<ProcessInstanceModel> createHistoricProcessInstanceModels(
			final List<HistoricProcessInstance> historicProcessInstances) {
		processInstanceDetails = new ArrayList<>();
		for (final HistoricProcessInstance historicProcessInstance : historicProcessInstances) {
			final ProcessInstanceModel processInstanceDetail = createProcessInstanceModel(historicProcessInstance);
			processInstanceDetails.add(processInstanceDetail);
		}
		return processInstanceDetails;
	}


}

