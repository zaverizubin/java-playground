package com.nexusglobal.ui.views;

import org.springframework.beans.factory.annotation.Autowired;

import com.nexusglobal.models.ProcessInstanceModel;
import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.presenters.ProcessInstanceListPresenter;
import com.nexusglobal.ui.presenters.ProcessInstanceListPresenter.ProcessInstanceClickEnum;
import com.nexusglobal.ui.viewmodels.ProcessInstanceListViewModel;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

@PrototypeComponent
public class ProcessInstanceListView extends VerticalLayout {


	private static final long serialVersionUID = 1L;
	private final ProcessInstanceListPresenter presenter;
	private ProcessInstanceListViewModel viewModel;

	@Autowired
	public ProcessInstanceListView(final ProcessInstanceListPresenter presenter) {
		this.presenter = presenter;
		presenter.setView(this);
		refresh();
	}

	public ProcessInstanceListPresenter getPresenter() {
		return presenter;
	}

	public void refresh() {
		viewModel = presenter.getViewModel();
		buildView();
	}

	private void buildView() {
		removeAll();
		for (final ProcessInstanceModel processInstanceModel : viewModel.getProcessInstanceModels()) {

			final HorizontalLayout horizontalLayout1 = new HorizontalLayout();
			final HorizontalLayout horizontalLayout2 = new HorizontalLayout();
			horizontalLayout1.setWidth("450px");
			horizontalLayout1.setWidth("450px");

			final Label label1 = new Label();
			if (processInstanceModel.isEnded()) {
				label1.setText("Ended On: " + processInstanceModel.getEndTime().getDate() + ":"
						+ (processInstanceModel.getEndTime().getMonth() + 1) + ":"
						+ (1900 + processInstanceModel.getEndTime().getYear()));
			} else {
				label1.setText("Started On: " + processInstanceModel.getStartTime().getDate() + ":"
						+ (processInstanceModel.getStartTime().getMonth() + 1) + ":"
						+ (1900 + processInstanceModel.getStartTime().getYear()));
			}

			horizontalLayout1.add(label1);

			final Label label2 = new Label();
			label2.setText("Started By: " + processInstanceModel.getStartUserId());
			horizontalLayout2.add(label2);

			final Button button = new Button();
			button.setText(processInstanceModel.getName());
			button.addClickListener(event -> {
				presenter.onButtonClick(ProcessInstanceClickEnum.ShowDetails, processInstanceModel);
			});

			final Div navigation = new Div(horizontalLayout1, horizontalLayout2, button);
			navigation.setWidth("350px");
			add(navigation);
		}

		setWidth("300px");
		setHeight("800px");
		this.setClassName("processInstances");
	}

}

