package com.nexusglobal.models;

public class SessionData {

	private final String deploymentKey = "incident-app-1";
	private final String generalInformationKey = "general-information";
	private final String userId = "admin";
	private static SessionData sessionData;
	private ProcessInstanceDetail processInstanceDetail;

	private SessionData() {

	}

	public static SessionData getSessionData() {
		if (sessionData == null) {
			sessionData = new SessionData();
		}
		return sessionData;
	}

	public ProcessInstanceDetail getCurrentProcessInstanceDetail() {
		return processInstanceDetail;
	}

	public void setCurrentProcessInstancDetail(final ProcessInstanceDetail processInstanceDetail) {
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
