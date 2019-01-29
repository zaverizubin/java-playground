package com.nexusglobal.ui.interfaces;

public interface IActionPublisher<T> {
	public void addActionListener(final T Listener);

	public void removeActionListener(final T Listener);
}
