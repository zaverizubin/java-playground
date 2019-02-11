package com.nexusglobal.ui.interfaces;

public interface IClickEventPublisher<T> {
	
	public void addOnClickListener(final T Listener);

	public void removeOnClickListener(final T Listener);
}
