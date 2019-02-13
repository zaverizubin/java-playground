package com.nexusglobal.ui.views;

import org.springframework.beans.factory.annotation.Autowired;

import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.presenters.ActiveTaskPresenter;
import com.nexusglobal.ui.viewmodels.ActiveTaskViewModel;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

@PrototypeComponent
public class ActiveTaskView extends VerticalLayout {

	private final ActiveTaskPresenter presenter;
	private ActiveTaskViewModel viewModel;

	@Autowired
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

