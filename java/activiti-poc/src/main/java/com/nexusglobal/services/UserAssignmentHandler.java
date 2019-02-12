package com.nexusglobal.services;

import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;

public class UserAssignmentHandler implements TaskListener {

	@Override
	public void notify(final DelegateTask delegateTask) {
		delegateTask.setAssignee("admin");
		delegateTask.addCandidateUser("admin");
		delegateTask.addCandidateGroup("management");
	}

}
