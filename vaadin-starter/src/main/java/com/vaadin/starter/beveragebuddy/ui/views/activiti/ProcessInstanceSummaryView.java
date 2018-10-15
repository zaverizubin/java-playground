package com.vaadin.starter.beveragebuddy.ui.views.activiti;

import java.util.List;

import org.activiti.engine.history.HistoricTaskInstance;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.starter.beveragebuddy.nexusglobal.models.ProcessInstanceDetail;
import com.vaadin.starter.beveragebuddy.ui.controllers.ProcessInstanceSummaryController;

public class ProcessInstanceSummaryView extends VerticalLayout {

	private final ActivitiMainView parentView;
	private ProcessInstanceDetail processInstanceDetail;
	private final ProcessInstanceSummaryController controller;

	public ProcessInstanceSummaryView(final ActivitiMainView parentView) {
		this.parentView = parentView;
		controller = new ProcessInstanceSummaryController(this);
	}

	public VerticalLayout showProcessInstanceSummary(final ProcessInstanceDetail processInstanceDetail) {
		this.processInstanceDetail = processInstanceDetail;
		buildProcessInstanceSummaryView();
		showActiveTask();
		showCompletedTasks();
		return this;
	}

	private void buildProcessInstanceSummaryView() {
		final VerticalLayout verticalLayout = new VerticalLayout();
		verticalLayout.addClassName("processInstanceTitleBar");

		final Label title = new Label();
		title.setText(processInstanceDetail.getName());
		title.setWidth("400px");

		final Label startedBy = new Label();
		startedBy.setText("Started By:" + processInstanceDetail.getStartUserId());

		final Label startedOn = new Label();
		startedOn.setText(" Started On:" + processInstanceDetail.getStartTime().getDate() + ":"
				+ processInstanceDetail.getStartTime().getMonth() + ":"
				+ (1900 + processInstanceDetail.getStartTime().getYear()));

		final Button cancelProcessButton = new Button();
		cancelProcessButton.setText("Cancel Process");
		cancelProcessButton.addClickListener(event -> {
			controller.onCancelProcessClick(processInstanceDetail);
		});

		final HorizontalLayout topHalf = new HorizontalLayout();
		final HorizontalLayout bottomHalf = new HorizontalLayout();
		topHalf.add(title);
		topHalf.add(startedBy);
		topHalf.add(startedOn);
		bottomHalf.add(cancelProcessButton);

		verticalLayout.add(topHalf);
		verticalLayout.add(bottomHalf);

		add(verticalLayout);
	}

	private void showActiveTask() {

		final VerticalLayout verticalLayout = new VerticalLayout();
		final HorizontalLayout horizontalLayout = new HorizontalLayout();

		final Label title = new Label();
		title.setText("Active Tasks");
		title.setWidth("400px");

		final Button activeTaskButton = new Button();
		activeTaskButton.setWidth("300px");
		activeTaskButton.setText("My task");
		activeTaskButton.addClickListener(event -> {
			controller.onActiveTaskClick();
		});

		final Label taskCreated = new Label();
		taskCreated.setText("Created On:");
		taskCreated.setWidth("400px");

		horizontalLayout.add(activeTaskButton);
		horizontalLayout.add(taskCreated);

		verticalLayout.add(title);
		verticalLayout.add(horizontalLayout);

		add(verticalLayout);

	}

	private void showCompletedTasks() {
		final VerticalLayout verticalLayout = new VerticalLayout();

		final Label title = new Label();
		title.setText("Completed Tasks");
		title.setWidth("400px");

		verticalLayout.add(title);

		final List<HistoricTaskInstance> historicTaskInstances = controller
				.getCompletedTasksForProcessInstance(processInstanceDetail);

		for (final HistoricTaskInstance historicTaskInstance : historicTaskInstances) {
			final Button completedTaskButton = new Button();
			completedTaskButton.setText(historicTaskInstance.getName());
			completedTaskButton.addClickListener(event -> {
				controller.onCompletedTaskClick();
			});

			final HorizontalLayout horizontalLayout = new HorizontalLayout();

			final Label taskDetails1 = new Label();
			taskDetails1.setText("Completed By: " + historicTaskInstance.getAssignee());

			final Label taskDetails2 = new Label();
			taskDetails2.setText(
					"Took: " + Math.abs(historicTaskInstance.getDurationInMillis() / (1000 * 60 * 60)) + " hrs.");

			horizontalLayout.add(taskDetails1);
			horizontalLayout.add(taskDetails2);

			verticalLayout.add(completedTaskButton);
			verticalLayout.add(horizontalLayout);
		}

		add(verticalLayout);
	}

	public void resetParentView() {
		parentView.reserView();
	}
}

