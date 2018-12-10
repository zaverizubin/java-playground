package com.nexusglobal.models;

public class SessionData {

	private final String deploymentKey = "investigation-app";
	private final String userId = "admin";
	private static SessionData sessionData;

	private SessionData() {

	}

	public static SessionData getSessionData() {
		if (sessionData == null) {
			sessionData = new SessionData();
		}
		return sessionData;
	}

	public String getDeploymentKey() {
		return deploymentKey;
	}

	public String getUserId() {
		return userId;
	}
}
