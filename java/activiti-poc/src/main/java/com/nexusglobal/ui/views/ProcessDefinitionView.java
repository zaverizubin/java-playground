package com.nexusglobal.ui.views;

import java.util.List;

import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.beans.factory.annotation.Autowired;

import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.events.ProcessDefinitionOnClickEvent.ProcessDefinitionClickEnum;
import com.nexusglobal.ui.presenters.ProcessDefinitionPresenter;
import com.nexusglobal.ui.viewmodels.ProcessDefinitionViewModel;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

@PrototypeComponent
public class ProcessDefinitionView extends VerticalLayout {

	private static final long serialVersionUID = 1L;
	private final ProcessDefinitionPresenter presenter;
	private ProcessDefinitionViewModel viewModel;
	private ComboBox<ProcessDefinition> cbProcessDefinitions;

	@Autowired
	public ProcessDefinitionView(final ProcessDefinitionPresenter presenter) {
		this.presenter = presenter;
		presenter.setView(this);
		refresh();
	}

	public ProcessDefinitionPresenter getPresenter() {
		return presenter;
	}

	public void refresh() {
		viewModel = presenter.getViewModel();
		buildProcessDefinitions();
		buildProcessInstanceActionButtons();
		buildProcessInstanceFilterButtons();
		bindData();
	}

	private void buildProcessDefinitions() {
		final HorizontalLayout horizontalLayout = new HorizontalLayout();
		cbProcessDefinitions = new ComboBox<>();

		cbProcessDefinitions.setWidth("250px");
		cbProcessDefinitions.setLabel("Process Definitions");
		cbProcessDefinitions.setItemLabelGenerator(ProcessDefinition::getName);
		cbProcessDefinitions.addValueChangeListener(event -> {
			if (!event.getHasValue().isEmpty()) {
				presenter.onProcessDefinitionChange(event.getValue());
			} else {
				presenter.onProcessDefinitionChange(null);
			}
			presenter.onButtonClick(ProcessDefinitionClickEnum.Running);
		});
		horizontalLayout.add(cbProcessDefinitions);
		add(horizontalLayout);
	}

	private void buildProcessInstanceActionButtons() {
		final HorizontalLayout horizontalLayout = new HorizontalLayout();

		final Button btnCreateNewProcessInstance = new Button();
		btnCreateNewProcessInstance.setWidth("150px");
		btnCreateNewProcessInstance.setText("New Instance");
		btnCreateNewProcessInstance.addClickListener(event -> {
			presenter.onButtonClick(ProcessDefinitionClickEnum.New);
		});

		final Button btnCancelAllProcessInstances = new Button();
		btnCancelAllProcessInstances.setWidth("120px");
		btnCancelAllProcessInstances.setText("Cancel all");
		btnCancelAllProcessInstances.addClickListener(event -> {
			presenter.onButtonClick(ProcessDefinitionClickEnum.CancelAll);
		});

		horizontalLayout.add(btnCreateNewProcessInstance, btnCancelAllProcessInstances);
		add(horizontalLayout);
	}

	private void buildProcessInstanceFilterButtons() {
		final HorizontalLayout horizontalLayout = new HorizontalLayout();
		horizontalLayout.setSizeFull();
		horizontalLayout.setHeight("100px");

		final Button button1 = new Button();
		button1.setText("Running");
		button1.setWidth("120px");
		button1.addClickListener(event -> {
			presenter.onButtonClick(ProcessDefinitionClickEnum.Running);
		});

		final Button button2 = new Button();
		button2.setText("Complete");
		button2.setWidth("120px");
		button2.addClickListener(event -> {
			presenter.onButtonClick(ProcessDefinitionClickEnum.Completed);
		});

		final Button button3 = new Button();
		button3.setText("All");
		button3.setWidth("50px");
		button3.addClickListener(event -> {
			presenter.onButtonClick(ProcessDefinitionClickEnum.All);
		});

		horizontalLayout.add(button1, button2, button3);
		add(horizontalLayout);
	}

	private void bindData() {
		final List<ProcessDefinition> processDefinitions = viewModel.getProcessDefinitions();
		if (processDefinitions != null) {
			cbProcessDefinitions.setItems(processDefinitions);
		}
	}

}
