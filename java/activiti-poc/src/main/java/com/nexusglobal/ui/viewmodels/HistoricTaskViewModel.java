package com.nexusglobal.ui.viewmodels;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.stereotype.Component;

@Component
public class HistoricTaskViewModel {

	private HistoricTaskInstance historicTaskInstance;

	private ProcessDefinition processDefinition;

	public HistoricTaskInstance getHistoricTaskInstance() {
		return historicTaskInstance;
	}

	public void setHistoricTaskInstance(final HistoricTaskInstance historicTaskInstance) {
		this.historicTaskInstance = historicTaskInstance;
	}

	public ProcessDefinition getProcessDefinition() {
		return processDefinition;
	}

	public void setProcessDefinition(final ProcessDefinition processDefinition) {
		this.processDefinition = processDefinition;
	}

}
