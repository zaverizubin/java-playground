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
package com.nexusglobal.ui.views;

import java.util.List;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;

import com.nexusglobal.models.ProcessInstanceDetail;
import com.nexusglobal.ui.controllers.ActivitiMainController;
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
/**
 * The main layout contains the header with the navigation buttons, and the
 * child views below that.
 */
@HtmlImport("frontend://styles/shared-styles.html")
@HtmlImport("frontend://styles/styles.html")

@Viewport("width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes")
public class ActivitiMainView extends Div implements RouterLayout {

	private final ActivitiMainController controller;

	private ComboBox<ProcessDefinition> cbProcessDefinitions;
	private Button btnCreateNewProcessInstance;
	private Button btnDeleteAllProcessInstances;
	private HorizontalLayout horLayoutProcessInstanceFilters;
	private VerticalLayout vertLayoutProcessInstances;
	private VerticalLayout verticalLayout1;
	private VerticalLayout verticalLayout2;
	private VerticalLayout verticalLayout3;

	public ActivitiMainView() {
		controller = new ActivitiMainController(this);
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
		verticalLayout1.addClassName("verticalBoxBorder");
		verticalLayout2 = new VerticalLayout();
		verticalLayout2.addClassName("verticalBoxBorder");
		verticalLayout3 = new VerticalLayout();
		verticalLayout3.addClassName("verticalBoxBorder");
		verticalLayout3.setVisible(false);

		verticalLayout1.setWidth("400px");
		verticalLayout2.setWidth("800px");
		verticalLayout3.setWidth("800px");

		horizontalLayout1.add(verticalLayout1);
		horizontalLayout1.add(verticalLayout2);
		horizontalLayout1.add(verticalLayout3);

		verticalLayout1.add(cbProcessDefinitions);
		horizontalLayout2.add(btnCreateNewProcessInstance);
		horizontalLayout2.add(btnDeleteAllProcessInstances);
		verticalLayout1.add(horizontalLayout2);
		verticalLayout1.add(horLayoutProcessInstanceFilters);

		verticalLayout1.add(vertLayoutProcessInstances);

		add(horizontalLayout1);
	}

	private void initView() {

		final List<ProcessInstance> processInstances = controller
				.getRunningProcessInstancesByUser();
		final List<ProcessInstanceDetail> processInstanceDetails = new ProcessInstanceDetail()
				.createProcessInstanceDetails(processInstances);
		showProcessInstances(processInstanceDetails);
	}

	private void buildTopNavigation() {
		final H2 title = new H2("Activti Demo");
		title.addClassName("main-layout__title");
		addClassName("main-layout");

		final RouterLink processess = new RouterLink();
		processess.add(new Icon(VaadinIcon.LIST), new Text("Processess"));
		processess.addClassName("main-layout__nav-item");
		processess.setHighlightCondition(HighlightConditions.sameLocation());

		final RouterLink tasks = new RouterLink();
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
		cbProcessDefinitions.setItems(controller.getProcessDefinitions());
		cbProcessDefinitions.setLabel("Process Definitions");
		cbProcessDefinitions.setItemLabelGenerator(ProcessDefinition::getName);
	}

	private void buildProcessInstanceActionButtons() {
		btnCreateNewProcessInstance = new Button();
		btnCreateNewProcessInstance.addClickListener(event -> {
			final ProcessDefinition processDefinition = cbProcessDefinitions.getValue();
			controller.onAddNewProcessInstance(processDefinition);
		});
		btnCreateNewProcessInstance.setWidth("150px");
		btnCreateNewProcessInstance.setText("New Instance");

		btnDeleteAllProcessInstances = new Button();
		btnDeleteAllProcessInstances.addClickListener(event -> {
			final ProcessDefinition processDefinition = cbProcessDefinitions.getValue();
			controller.onDeleteAllInstancesClick(processDefinition);
		});
		btnDeleteAllProcessInstances.setWidth("120px");
		btnDeleteAllProcessInstances.setText("Cancel all");
	}

	private void buildProcessInstanceFilters() {
		horLayoutProcessInstanceFilters = new HorizontalLayout();
		horLayoutProcessInstanceFilters.setSizeFull();
		horLayoutProcessInstanceFilters.setHeight("100px");

		final Button button1 = new Button();
		button1.setText("Running");
		button1.setWidth("120px");
		button1.addClickListener(event ->{
			controller.onProcessInstanceFilterClick("Running");
		});

		final Button button2 = new Button();
		button2.setText("Complete");
		button2.setWidth("120px");
		button2.addClickListener(event -> {
			controller.onProcessInstanceFilterClick("Completed");
		});

		final Button button3 = new Button();
		button3.setText("All");
		button3.setWidth("50px");
		button3.addClickListener(event -> {
			controller.onProcessInstanceFilterClick("All");
		});

		horLayoutProcessInstanceFilters.add(button1, button2, button3);
	}

	private void buildProcessInstancesView() {
		vertLayoutProcessInstances = new VerticalLayout();
		vertLayoutProcessInstances.setWidth("300px");
		vertLayoutProcessInstances.setHeight("800px");
		vertLayoutProcessInstances.setClassName("processInstances");
	}

	public void showProcessInstances(final List<ProcessInstanceDetail> processInstanceDetails) {
		vertLayoutProcessInstances.removeAll();
		for (final ProcessInstanceDetail processInstanceDetail : processInstanceDetails) {

			final HorizontalLayout horizontalLayout1 = new HorizontalLayout();
			final HorizontalLayout horizontalLayout2 = new HorizontalLayout();
			horizontalLayout1.setWidth("450px");
			horizontalLayout1.setWidth("450px");

			final Label label1 = new Label();
			if (processInstanceDetail.isEnded()) {
				label1.setText(
						"Ended On: " + processInstanceDetail.getEndTime().getDate() + ":"
								+ (processInstanceDetail.getEndTime().getMonth() + 1) + ":"
								+ (1900 + processInstanceDetail.getEndTime().getYear()));
			} else {
				label1.setText("Started On: " + processInstanceDetail.getStartTime().getDate() + ":"
						+ (processInstanceDetail.getStartTime().getMonth() + 1) + ":"
						+ (1900 + processInstanceDetail.getStartTime().getYear()));
			}

			horizontalLayout1.add(label1);

			final Label label2 = new Label();
			label2.setText("Started By: " + processInstanceDetail.getStartUserId());
			horizontalLayout2.add(label2);

			final Button button = new Button();
			button.setText(processInstanceDetail.getName());
			button.addClickListener(event -> {
				controller.showProcessDetails(processInstanceDetail);
			});

			final Div navigation = new Div(horizontalLayout1, horizontalLayout2, button);
			navigation.setWidth("350px");
			vertLayoutProcessInstances.add(navigation);
		}
	}

	public void showProcessInstanceSummaryView(final ProcessInstanceDetail processInstanceDetail) {
		clearDetailsView();
		final ProcessInstanceSummaryView processInstanceSummaryView = new ProcessInstanceSummaryView(this);
		processInstanceSummaryView.showProcessInstanceSummary(processInstanceDetail);
		verticalLayout2.add(processInstanceSummaryView);
		verticalLayout2.setVisible(true);
		verticalLayout3.setVisible(false);
	}

	public void showHistoricTaskSummaryView(final HistoricTaskInstance historicTaskInstance) {
		verticalLayout3.removeAll();
		final HistoricTaskSummaryView taskSummaryView = new HistoricTaskSummaryView(this);
		taskSummaryView.showTaskSummary(historicTaskInstance);
		verticalLayout3.add(taskSummaryView);

		verticalLayout2.setVisible(false);
		verticalLayout3.setVisible(true);

	}

	public void hideTaskDetails() {
		verticalLayout3.removeAll();
		verticalLayout3.setVisible(false);
		verticalLayout2.setVisible(true);
	}

	public void resetView() {
		controller.onProcessInstanceFilterClick("All");
		clearDetailsView();
	}

	public void clearDetailsView() {
		verticalLayout2.removeAll();
	}


}
