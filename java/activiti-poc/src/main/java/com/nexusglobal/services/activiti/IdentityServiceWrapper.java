package com.nexusglobal.services.activiti;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.identity.User;

public class IdentityServiceWrapper {

	ProcessEngine processEngine;

	public IdentityServiceWrapper(final ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

	public User getUser(final String userId) {
		return processEngine.getIdentityService().createUserQuery().userId(userId).singleResult();
	}

}
