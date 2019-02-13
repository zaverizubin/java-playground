package com.nexusglobal.models;

public class SessionData {

	private final String deploymentKey = "incident-app-1";
	private final String generalInformationKey = "general-information";
	private final String userId = "admin";
	private static SessionData sessionData;
	private ProcessInstanceModel processInstanceModel;

	private SessionData() {

	}

	public static SessionData getSessionData() {
		if (sessionData == null) {
			sessionData = new SessionData();
		}
		return sessionData;
	}

	public ProcessInstanceModel getProcessInstanceModel() {
		return processInstanceModel;
	}

	public void setProcessInstanceModel(final ProcessInstanceModel processInstanceDetail) {
		processInstanceModel = processInstanceDetail;
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
