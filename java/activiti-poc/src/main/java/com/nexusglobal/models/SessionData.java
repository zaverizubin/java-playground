package com.nexusglobal.models;

public class SessionData {

	private final String deploymentKey = "incident-reporting";
	private final String generalInformationKey = "general-information";
	private final String userId = "admin";
	private static SessionData sessionData;
	private ProcessInstanceModel processInstanceDetail;
	
	private SessionData() {

	}

	public static SessionData getSessionData() {
		if (sessionData == null) {
			sessionData = new SessionData();
		}
		return sessionData;
	}

	public ProcessInstanceModel getCurrentProcessInstanceDetail() {
		return processInstanceDetail;
	}
	
	public void setCurrentProcessInstanceModel(ProcessInstanceModel processInstanceDetail) {
		this.processInstanceDetail =processInstanceDetail;
	}
	
	public String getDeploymentKey() {
		return deploymentKey;
	}

	public String getGeneralInformationKey() {
		return generalInformationKey;
	}


	public String getUserId() {
		return userId;
	}
}
