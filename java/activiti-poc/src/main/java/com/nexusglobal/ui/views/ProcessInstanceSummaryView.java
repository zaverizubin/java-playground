package com.nexusglobal.ui.views;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;

import com.nexusglobal.controllers.ProcessInstanceSummaryController;
import com.nexusglobal.models.ProcessInstanceDetail;
import com.nexusglobal.services.ActivitiService;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.html.NativeButton;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

public class ProcessInstanceSummaryView extends VerticalLayout {

	private final ActivitiMainView parentView;
	private ProcessInstanceDetail processInstanceDetail;
	private final ProcessInstanceSummaryController controller;

	public ProcessInstanceSummaryView(final ActivitiMainView parentView) {
		this.parentView = parentView;
		controller = new ProcessInstanceSummaryController(this);
	}

	public ActivitiMainView getParentView() {
		return parentView;
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
		verticalLayout.addClassName("instanceDetailTitleBar");

		final HorizontalLayout horizontalLayout1 = new HorizontalLayout();
		final HorizontalLayout horizontalLayout2 = new HorizontalLayout();
		horizontalLayout1.setWidth("100%");
		horizontalLayout2.setWidth("100%");

		final Button cancelProcessButton = new Button();
		if (processInstanceDetail.isEnded()) {
			cancelProcessButton.setText("Delete Process");
			cancelProcessButton.addClickListener(event -> {
				controller.onDeleteProcessClick(processInstanceDetail);
			});
		} else {
			cancelProcessButton.setText("Cancel Process");
			cancelProcessButton.addClickListener(event -> {
				controller.onCancelProcessClick(processInstanceDetail);
			});
		}

		final Label title = new Label();
		title.setText(processInstanceDetail.getName());
		title.setWidth("500px");
		title.addClassName("instanceDetailTitle");

		final Label startedBy = new Label();
		startedBy.setText("Started By:" + processInstanceDetail.getStartUserId());

		final Label startedOn = new Label();
		startedOn.setText(" Started On:" + processInstanceDetail.getStartTime().getDate() + ":"
				+ (processInstanceDetail.getStartTime().getMonth() + 1) + ":"
				+ (1900 + processInstanceDetail.getStartTime().getYear()));

		final Label endedOn = new Label();
		if (processInstanceDetail.isEnded()) {
			endedOn.setText(" Ended On:" + processInstanceDetail.getEndTime().getDate() + ":"
					+ (processInstanceDetail.getEndTime().getMonth() + 1) + ":"
					+ (1900 + processInstanceDetail.getEndTime().getYear()));
		}

		horizontalLayout1.add(title);
		horizontalLayout1.add(cancelProcessButton);

		horizontalLayout2.add(startedBy);
		horizontalLayout2.add(startedOn);
		horizontalLayout2.add(endedOn);

		verticalLayout.add(horizontalLayout1);
		verticalLayout.add(horizontalLayout2);

		add(verticalLayout);
	}

	private void showActiveTask() {
		final List<Task> tasks = controller.getNextTaskForProcessInstance(processInstanceDetail);

		final VerticalLayout verticalLayout = new VerticalLayout();
		
		final Label title = new Label();
		title.setText("Active Tasks");
		title.setWidth("400px");
		verticalLayout.add(title);
		
		if (tasks.size() == 0) {
			final Label noActiveTask = new Label("No tasks are currently active ...");
			HorizontalLayout horizontalLayout = new HorizontalLayout();
			horizontalLayout.add(noActiveTask);
			verticalLayout.add(horizontalLayout);
		} else {
			for (final Task task : tasks) {
				final Button activeTaskButton = new Button();
				activeTaskButton.setWidth("300px");
				activeTaskButton.setText(task.getName());
				activeTaskButton.addClickListener(event -> {
					controller.onActiveTaskClick(task);
				});

				final Label taskCreated = new Label();
				taskCreated.setText("Created On: " + task.getCreateTime().getDay() + ":"
						+ task.getCreateTime().getMonth() + ":" + (1900 + task.getCreateTime().getYear()));
				taskCreated.setWidth("400px");
				
				HorizontalLayout horizontalLayout = new HorizontalLayout();
				horizontalLayout.add(activeTaskButton);
				horizontalLayout.add(taskCreated);
				verticalLayout.add(horizontalLayout);
			}
		}

		add(verticalLayout);

	}

	private void showCompletedTasks() {
		final List<HistoricTaskInstance> historicTaskInstances = controller
				.getCompletedTasksForProcessInstance(processInstanceDetail);

		final VerticalLayout verticalLayout = new VerticalLayout();

		final Label title = new Label();
		title.setText("Completed Tasks");
		title.setWidth("400px");

		verticalLayout.add(title);

		if (historicTaskInstances.size() == 0) {
			final HorizontalLayout horizontalLayout = new HorizontalLayout();
			final Label taskDetails1 = new Label();
			taskDetails1.setText("No tasks have been completed yet...");
			horizontalLayout.add(taskDetails1);
			verticalLayout.add(horizontalLayout);
		} else {
			for (final HistoricTaskInstance historicTaskInstance : historicTaskInstances) {
				final Button completedTaskButton = new Button();
				completedTaskButton.setText(historicTaskInstance.getName());
				completedTaskButton.addClickListener(event -> {
					controller.onCompletedTaskClick(historicTaskInstance);
				});

				final HorizontalLayout horizontalLayout = new HorizontalLayout();

				final Label taskDetails1 = new Label();
				if (historicTaskInstance.getAssignee() != null) {
					taskDetails1.setText("Completed By: " + historicTaskInstance.getAssignee());
				} else {
					taskDetails1.setText("Assigned to nobody");
				}

				final Duration d = Duration.ofMillis(historicTaskInstance.getDurationInMillis());
				final long hours = d.toHours();
				final long minutes = d.toMinutes();
				final long seconds = d.toMillis() / 1000;

				final Label taskDetails2 = new Label();
				taskDetails2.setText("Took: " + " hrs:" + hours + " mins:" + minutes + " secs:" + seconds);

				horizontalLayout.add(taskDetails1);
				horizontalLayout.add(taskDetails2);

				verticalLayout.add(completedTaskButton);
				verticalLayout.add(horizontalLayout);
			}

		}

		add(verticalLayout);
	}

	
	
	public void resetParentView() {
		parentView.resetView();
	}


}

