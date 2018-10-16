package com.nexusglobal.ui.views;

import java.util.Map;

import org.activiti.engine.task.Task;

import com.nexusglobal.controllers.ActiveTaskController;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

public class ActiveTaskView extends VerticalLayout {

	private final ActivitiMainView parentView;
	private Task task;
	private final ActiveTaskController controller;

	public ActiveTaskView(final ActivitiMainView parentView) {
		this.parentView = parentView;
		controller = new ActiveTaskController(this);
	}

	public VerticalLayout showTaskSummary(final Task task) {
		this.task = task;
		buildTaskInstanceSummaryView();
		showTaskDetails();
		return this;
	}

	private void buildTaskInstanceSummaryView() {
		final VerticalLayout verticalLayout = new VerticalLayout();
		verticalLayout.addClassName("instanceDetailTitleBar");

		final HorizontalLayout horizontalLayout1 = new HorizontalLayout();
		final HorizontalLayout horizontalLayout2 = new HorizontalLayout();
		horizontalLayout1.setWidth("100%");
		horizontalLayout2.setWidth("100%");


		final Label title = new Label();
		title.setText(task.getName());
		title.setWidth("500px");
		title.addClassName("instanceDetailTitle");

		final Button buttonBackToProcess = new Button();
		buttonBackToProcess.setWidth("200px");
		buttonBackToProcess.setText("Back to Process");
		buttonBackToProcess.addClickListener(event -> {
			parentView.hideTaskDetails();
		});

		final Button buttonClaim = new Button();
		buttonClaim.setText("Claim");
		buttonClaim.addClickListener(event -> {
			// controller.claimTask(task.getId(), SessionData.getSessionData().getUserId());
			showTaskDetails();
		});


		final Label assignee = new Label();
		if (task.getAssignee() != null) {
			assignee.setText("Assignee:" + task.getAssignee());
		} else {
			assignee.setText("Assignee: Assigned to nobody");
		}

		final Label dueOn = new Label();
		if (task.getDueDate() != null) {
			dueOn.setText("Due:" + task.getDueDate().getDate() + ":" + (task.getDueDate().getMonth() + 1) + ":"
					+ (1900 + task.getDueDate().getYear()));
		} else {
			dueOn.setText("No due date");
		}

		final Label partOfProcess = new Label();
		partOfProcess.setText(
				"Part of process: "
						+ controller.getProcessDefinition(task.getProcessDefinitionId()).getName());

		horizontalLayout1.add(title);
		horizontalLayout1.add(buttonBackToProcess);
		horizontalLayout1.add(buttonClaim);

		horizontalLayout2.add(assignee);
		horizontalLayout2.add(dueOn);
		horizontalLayout2.add(partOfProcess);

		verticalLayout.add(horizontalLayout1);
		verticalLayout.add(horizontalLayout2);

		add(verticalLayout);
	}

	private void showTaskDetails() {

		final VerticalLayout verticalLayout = new VerticalLayout();
		verticalLayout.setWidth("100%");

		int count = 1;
		final Map<String, Object> variables = task.getProcessVariables();

		//final Form form = controller.getForm(task.getFormKey());
		final Object form = controller.getTaskFormData(task.getId());

		for (final String key : variables.keySet()) {

			final HorizontalLayout horizontalLayout = new HorizontalLayout();
			horizontalLayout.setWidth("100%");
			if (count % 2 == 0) {
				horizontalLayout.setClassName("formValueBkg-1");
			} else {
				horizontalLayout.setClassName("formValueBkg-2");
			}
			count += 1;

			final Label label1 = new Label();
			label1.setText(key + ":");
			final Label label2 = new Label();
			label2.setText(variables.get(key).toString());

			horizontalLayout.add(label1);
			horizontalLayout.add(label2);
			verticalLayout.add(horizontalLayout);
		}
		add(verticalLayout);
	}

	public void resetParentView() {
		parentView.resetView();
	}
}

