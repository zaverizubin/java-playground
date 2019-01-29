package com.nexusglobal.ui.views;

import com.nexusglobal.ui.presenters.ActiveTaskPresenter;
import com.nexusglobal.ui.viewmodels.ActiveTaskViewModel;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

public class ActiveTaskView extends VerticalLayout {

	private final ActiveTaskPresenter presenter;
	private ActiveTaskViewModel viewModel;


	public ActiveTaskView(final ActiveTaskPresenter presenter) {
		this.presenter = presenter;
		presenter.setView(this);
	}

	public ActiveTaskPresenter getPresenter() {
		return presenter;
	}

	public void refresh() {
		viewModel = presenter.getViewModel();
		buildView();
	}

	private void buildView() {
		// TODO Auto-generated method stub

	}



}

