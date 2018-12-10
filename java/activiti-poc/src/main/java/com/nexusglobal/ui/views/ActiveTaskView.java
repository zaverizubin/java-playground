package com.nexusglobal.ui.views;

import java.util.HashMap;
import java.util.Map;

import org.activiti.engine.form.FormProperty;
import org.activiti.engine.form.TaskFormData;
import org.activiti.engine.task.Task;

import com.nexusglobal.controllers.ActiveTaskController;
import com.nexusglobal.models.SessionData;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;

public class ActiveTaskView extends VerticalLayout {

	private final ActivitiMainView parentView;
	private Task task;
	private final ActiveTaskController controller;
	private HashMap<String, TextField> formData = new HashMap<String, TextField>();
	
	public ActiveTaskView(final ActivitiMainView parentView) {
		this.parentView = parentView;
		controller = new ActiveTaskController(this);
	}

	public VerticalLayout showTaskSummary(final Task task) {
		this.task = task;
		buildTaskInstanceSummaryView();
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
		title.setWidth("400px");
		title.addClassName("instanceDetailTitle");

		final Button buttonBackToProcess = new Button();
		buttonBackToProcess.setWidth("200px");
		buttonBackToProcess.setText("Back to Process");
		buttonBackToProcess.addClickListener(event -> {
			parentView.hideTaskDetails();
		});

		final Button buttonComplete = new Button();
		buttonComplete.setText("Complete");
		buttonComplete.setWidth("150px");
		buttonComplete.setVisible(false);
		buttonComplete.addClickListener(event -> {
			
			final Map<String, Object> variables = new HashMap<>();
			for (Map.Entry<String, TextField> entry : formData.entrySet()) {
				variables.put(entry.getKey(), entry.getValue().getValue());
			}
			controller.completeTask(task.getId(), variables);
			parentView.hideTaskDetails();
			
		});

		final Button buttonClaim = new Button();
		buttonClaim.setText("Claim");
		buttonClaim.addClickListener(event -> {
			controller.claimTask(task.getId(), SessionData.getSessionData().getUserId());
			showTaskDetails();
			buttonClaim.setVisible(false);
			buttonComplete.setVisible(true);
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
		horizontalLayout1.add(buttonComplete);

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
		final TaskFormData taskFormData = controller.getTaskFormData(task.getId());
		for (final FormProperty formProperty : taskFormData.getFormProperties()) {

			final HorizontalLayout horizontalLayout = new HorizontalLayout();
			horizontalLayout.setWidth("100%");
			count += 1;


			final Label label1 = new Label();
			label1.setText(formProperty.getName() + ":");
			
			TextField formField = new TextField();
			formField.setWidth("400px");
			if (count % 2 == 0) {
				formField.setClassName("formValueBkg-1");
			} else {
				formField.setClassName("formValueBkg-2");
			}
			formData.put(formProperty.getName(), formField);
			
			horizontalLayout.add(label1);
			horizontalLayout.add(formField);
			verticalLayout.add(horizontalLayout);
		}
		add(verticalLayout);
	}

	public void resetParentView() {
		parentView.resetView();
	}
}

