package com.nexusglobal.ui.interfaces;

import java.util.function.Consumer;

public interface IClickEventPublisher<T> {

	public void addClickListener(final Consumer<T> Listener);

	public void removeClickListener(final Consumer<T> Listener);

	public void publishEvent(T event);
}
