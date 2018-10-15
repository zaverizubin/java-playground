package com.nexusglobal.services;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.identity.User;

public class IdentityService {
	ProcessEngine processEngine;

	public IdentityService(final ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

	public User getUser(final String userId) {
		return processEngine.getIdentityService().createUserQuery().userId(userId).singleResult();
	}

}
