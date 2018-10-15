package com.vaadin.starter.beveragebuddy.nexusglobal.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.activiti.engine.history.HistoricProcessInstance;
import org.activiti.engine.runtime.ProcessInstance;

public class ProcessInstanceDetail {

	private Date startTime;
	private Date endTime;
	private String startUserId;
	private String name;
	private String id;
	private Boolean isEnded;

	private List<ProcessInstanceDetail> processInstanceDetails;

	public ProcessInstanceDetail(final ProcessInstance processInstance) {
		createProcessInstanceDetail(processInstance);
	}

	public ProcessInstanceDetail(final HistoricProcessInstance historicProcessInstance) {
		createProcessInstanceDetail(historicProcessInstance);
	}

	private ProcessInstanceDetail createProcessInstanceDetail(final ProcessInstance processInstance) {
		final ProcessInstanceDetail processInstanceDetail = new ProcessInstanceDetail();
		processInstanceDetail.startTime = processInstance.getStartTime();
		processInstanceDetail.endTime = null;
		processInstanceDetail.startUserId = processInstance.getStartUserId();
		processInstanceDetail.name = processInstance.getProcessDefinitionName();
		processInstanceDetail.id = processInstance.getId();
		processInstanceDetail.isEnded = false;

		return processInstanceDetail;

	}

	private ProcessInstanceDetail createProcessInstanceDetail(final HistoricProcessInstance historicProcessInstance) {
		final ProcessInstanceDetail processInstanceDetail = new ProcessInstanceDetail();
		processInstanceDetail.startTime = historicProcessInstance.getStartTime();
		processInstanceDetail.endTime = historicProcessInstance.getEndTime();
		processInstanceDetail.startUserId = historicProcessInstance.getStartUserId();
		processInstanceDetail.name = historicProcessInstance.getProcessDefinitionName();
		processInstanceDetail.id = historicProcessInstance.getId();
		processInstanceDetail.isEnded = true;

		return processInstanceDetail;
	}

	public ProcessInstanceDetail() {
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

	public List<ProcessInstanceDetail> createProcessInstanceDetails(
			final List<ProcessInstance> processInstances) {
		processInstanceDetails = new ArrayList<>();
		for(final ProcessInstance processInstance : processInstances) {
			final ProcessInstanceDetail processInstanceDetail = createProcessInstanceDetail(processInstance);
			processInstanceDetails.add(processInstanceDetail);
		}
		return processInstanceDetails;
	}

	public List<ProcessInstanceDetail> createHistoricProcessInstanceDetails(
			final List<HistoricProcessInstance> historicProcessInstances) {
		processInstanceDetails = new ArrayList<>();
		for (final HistoricProcessInstance historicProcessInstance : historicProcessInstances) {
			final ProcessInstanceDetail processInstanceDetail = createProcessInstanceDetail(historicProcessInstance);
			processInstanceDetails.add(processInstanceDetail);
		}
		return processInstanceDetails;
	}


}

