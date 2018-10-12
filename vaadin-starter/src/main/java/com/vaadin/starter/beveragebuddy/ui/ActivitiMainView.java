/*
 * Copyright 2000-2017 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.starter.beveragebuddy.ui;

import java.util.List;

import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.dependency.HtmlImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.page.Viewport;
import com.vaadin.flow.router.HighlightConditions;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.router.RouterLink;
import com.vaadin.starter.beveragebuddy.ui.controllers.ActivitiMainController;
import com.vaadin.starter.beveragebuddy.ui.views.categorieslist.CategoriesList;
import com.vaadin.starter.beveragebuddy.ui.views.reviewslist.ReviewsList;

/**
 * The main layout contains the header with the navigation buttons, and the
 * child views below that.
 */
@HtmlImport("frontend://styles/shared-styles.html")
@Viewport("width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes")
public class ActivitiMainView extends Div implements RouterLayout {

	private final ActivitiMainController activitiMainController;

	private final String processInstanceFilter = "Running";

	private ComboBox<ProcessDefinition> cbProcessDefinitions;
	private Button btnCreateNewProcessInstance;
	private Button btnDeleteAllProcessInstances;
	private HorizontalLayout horLayoutProcessInstanceFilters;
	private VerticalLayout vertLayoutProcessInstances;
	private VerticalLayout verticalLayout1;
	private VerticalLayout verticalLayout2;

	public ActivitiMainView() {
		activitiMainController = new ActivitiMainController();
		buildComponents();
		initView();

	}

	private void buildComponents() {
		buildTopNavigation();
		buildProcessDefinitions();
		buildProcessInstanceActionButtons();
		buildProcessInstanceFilters();
		buildProcessInstancesView();

		final HorizontalLayout horizontalLayout1 = new HorizontalLayout();
		final HorizontalLayout horizontalLayout2 = new HorizontalLayout();

		verticalLayout1 = new VerticalLayout();
		verticalLayout2 = new VerticalLayout();

		verticalLayout1.setWidth("350px");
		verticalLayout1.setHeight("800px");
		verticalLayout2.setWidth("800px");
		verticalLayout2.setHeight("800px");

		horizontalLayout1.add(verticalLayout1);
		horizontalLayout1.add(verticalLayout2);

		verticalLayout1.add(cbProcessDefinitions);
		horizontalLayout2.add(btnCreateNewProcessInstance);
		horizontalLayout2.add(btnDeleteAllProcessInstances);
		verticalLayout1.add(horizontalLayout2);
		verticalLayout1.add(horLayoutProcessInstanceFilters);

		verticalLayout1.add(vertLayoutProcessInstances);

		add(horizontalLayout1);
	}

	private void initView() {

		final List<ProcessInstance> processInstances = activitiMainController
				.getProcessInstancesByStateAndUser(processInstanceFilter);
		showProcessInstances(processInstances);
	}

	private void buildTopNavigation() {
		final H2 title = new H2("Activti Demo");
		title.addClassName("main-layout__title");
		addClassName("main-layout");

		final RouterLink processess = new RouterLink(null, ReviewsList.class);
		processess.add(new Icon(VaadinIcon.LIST), new Text("Processess"));
		processess.addClassName("main-layout__nav-item");
		processess.setHighlightCondition(HighlightConditions.sameLocation());

		final RouterLink tasks = new RouterLink(null, CategoriesList.class);
		tasks.add(new Icon(VaadinIcon.ARCHIVES), new Text("Tasks"));
		tasks.addClassName("main-layout__nav-item");

		final Div navigation = new Div(processess, tasks);
		navigation.addClassName("main-layout__nav");

		final Div header = new Div(title, navigation);
		header.addClassName("main-layout__header");
		add(header);

	}

	private void buildProcessDefinitions() {
		cbProcessDefinitions = new ComboBox<>();
		cbProcessDefinitions.setWidth("250px");
		cbProcessDefinitions.setItems(activitiMainController.getProcessDefinitions());
		cbProcessDefinitions.setLabel("Process Definitions");
		cbProcessDefinitions.setItemLabelGenerator(ProcessDefinition::getName);
	}

	private void buildProcessInstanceActionButtons() {
		btnCreateNewProcessInstance = new Button();
		btnCreateNewProcessInstance.addClickListener(event -> {
			addNewProcessInstance();
		});
		btnCreateNewProcessInstance.setWidth("150px");
		btnCreateNewProcessInstance.setText("New Instance");

		btnDeleteAllProcessInstances = new Button();
		btnDeleteAllProcessInstances.addClickListener(event -> {
			onDeleteAllInstancesClick();
		});
		btnDeleteAllProcessInstances.setWidth("150px");
		btnDeleteAllProcessInstances.setText("Delete all");
	}

	private void onDeleteAllInstancesClick() {
		final ProcessDefinition processDefinition = cbProcessDefinitions.getValue();
		if (processDefinition != null) {
			activitiMainController.cancelProcessInstances(processDefinition.getId());
			final List<ProcessInstance> processInstances = activitiMainController
					.getProcessInstancesByStateAndUser(processInstanceFilter);
			showProcessInstances(processInstances);
		}

	}

	private void buildProcessInstanceFilters() {
		horLayoutProcessInstanceFilters = new HorizontalLayout();
		horLayoutProcessInstanceFilters.setSizeFull();
		horLayoutProcessInstanceFilters.setHeight("100px");

		final Button button1 = new Button();
		button1.setText("Running");
		button1.setWidth("110px");
		button1.addClickListener(event ->{
			onProcessInstanceFilterClick("All");
		});

		final Button button2 = new Button();
		button2.setText("Completed");
		button2.setWidth("140px");
		button2.addClickListener(event -> {
			onProcessInstanceFilterClick("Completed");
		});

		final Button button3 = new Button();
		button3.setText("All");
		button3.setWidth("100px");
		button3.addClickListener(event -> {
			onProcessInstanceFilterClick("All");
		});

		horLayoutProcessInstanceFilters.add(button1, button2, button3);
	}

	private void onProcessInstanceFilterClick(final String processInstanceFilter) {
		final List<ProcessInstance> processInstances = activitiMainController
				.getProcessInstancesByStateAndUser(processInstanceFilter);
		showProcessInstances(processInstances);
		clearProcessDetails();
	}



	private void buildProcessInstancesView() {
		vertLayoutProcessInstances = new VerticalLayout();
		vertLayoutProcessInstances.setWidth("300px");
		vertLayoutProcessInstances.setHeight("800px");
		vertLayoutProcessInstances.setClassName("processInstances");
	}


	private void showProcessInstances(final List<ProcessInstance> processInstances) {
		vertLayoutProcessInstances.removeAll();
		for (final ProcessInstance processInstance : processInstances) {

			final HorizontalLayout horizontalLayout1 = new HorizontalLayout();
			final HorizontalLayout horizontalLayout2 = new HorizontalLayout();
			horizontalLayout1.setWidth("450px");
			horizontalLayout1.setWidth("450px");

			final Label label1 = new Label();
			if (processInstance.isEnded()) {
				label1.setText(
						"Ended On:" + processInstance.getStartTime() + ":" + processInstance.getStartTime().getMonth()
						+ ":" + (1900 + processInstance.getStartTime().getYear()));
			} else {
				label1.setText("Started On:" + processInstance.getStartTime().getDate() + ":"
						+ processInstance.getStartTime().getMonth() + ":"
						+ (1900 + processInstance.getStartTime().getYear()));
			}

			horizontalLayout1.add(label1);

			final Label label2 = new Label();
			label2.setText("Started By:" + processInstance.getStartUserId());
			horizontalLayout2.add(label2);

			final Button button = new Button();
			button.setText(processInstance.getProcessDefinitionName());
			button.addClickListener(event -> {
				showProcessDetails(processInstance);
			});

			final Div navigation = new Div(horizontalLayout1, horizontalLayout2, button);
			navigation.setWidth("350px");
			vertLayoutProcessInstances.add(navigation);
		}
	}

	private void addNewProcessInstance() {
		final ProcessDefinition processDefinition = cbProcessDefinitions.getValue();
		if (processDefinition != null) {
			final ProcessInstance processInstance = activitiMainController
					.startProcessInstance(processDefinition.getId());
			activitiMainController.assignUserToProcessInstance(processInstance.getId());
			final List<ProcessInstance> processInstances = activitiMainController
					.getProcessInstancesByStateAndUser(processInstanceFilter);
			showProcessInstances(processInstances);
		}
	}



	private void showProcessDetails(final ProcessInstance processInstance) {
		verticalLayout2.removeAll();
		final VerticalLayout verticalLayout = new VerticalLayout();
		verticalLayout.addClassName("processInstanceTitle");

		final Label title = new Label();
		title.setText(processInstance.getProcessDefinitionName());
		title.setWidth("600px");

		final Label startedBy = new Label();
		startedBy.setText("Started By:" + processInstance.getStartUserId()
		+ " Started On:"
		+ processInstance.getStartTime().getDate() + ":" + processInstance.getStartTime().getMonth() + ":"
		+ (1900 + processInstance.getStartTime().getYear()));

		final Button cancelProcessButton = new Button();
		cancelProcessButton.setText("Cancel Process");
		cancelProcessButton.addClickListener(event -> {
			activitiMainController.cancelProcessInstance(processInstance.getId(), null);
		});

		final HorizontalLayout topHalf = new HorizontalLayout();
		final HorizontalLayout bottomHalf = new HorizontalLayout();
		topHalf.add(title);
		topHalf.add(startedBy);
		bottomHalf.add(cancelProcessButton);

		verticalLayout.add(topHalf);
		verticalLayout.add(bottomHalf);

		verticalLayout2.add(verticalLayout);
	}

	private void clearProcessDetails() {
		verticalLayout2.removeAll();
	}






}
