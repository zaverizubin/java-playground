package com.nexusglobal.ui.views;

import org.activiti.engine.history.HistoricTaskInstance;

import com.nexusglobal.ui.controllers.TaskSummaryController;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

public class HistoricTaskSummaryView extends VerticalLayout {

	private final ActivitiMainView parentView;
	private HistoricTaskInstance historicTaskInstance;
	private final TaskSummaryController controller;

	public HistoricTaskSummaryView(final ActivitiMainView parentView) {
		this.parentView = parentView;
		controller = new TaskSummaryController(this);
	}

	public VerticalLayout showTaskSummary(final HistoricTaskInstance historicTaskInstance) {
		this.historicTaskInstance = historicTaskInstance;
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
		title.setText(historicTaskInstance.getName());
		title.setWidth("500px");
		title.addClassName("instanceDetailTitle");

		final Button button = new Button();
		button.setText("Back to Process");
		button.addClickListener(event -> {
			parentView.hideTaskDetails();
		});

		final Label assignee = new Label();
		if (historicTaskInstance.getAssignee() != null) {
			assignee.setText("Assignee:" + historicTaskInstance.getAssignee());
		} else {
			assignee.setText("Assignee: Assigned to nobody");
		}

		final Label dueOn = new Label();
		if (historicTaskInstance.getDueDate() != null) {
			dueOn.setText("Due:" + historicTaskInstance.getDueDate().getDate() + ":"
					+ (historicTaskInstance.getDueDate().getMonth() + 1) + ":"
					+ (1900 + historicTaskInstance.getDueDate().getYear()));
		} else {
			dueOn.setText("No due date");
		}

		final Label endedOn = new Label();
		endedOn.setText(" Ended On:" + historicTaskInstance.getEndTime().getDate() + ":"
				+ (historicTaskInstance.getEndTime().getMonth() + 1) + ":"
				+ (1900 + historicTaskInstance.getEndTime().getYear()));

		final Label partOfProcess = new Label();
		endedOn.setText(
				"Part of process: "
						+ controller.getProcessDefinition(historicTaskInstance.getProcessDefinitionId()).getName());

		horizontalLayout1.add(title);
		horizontalLayout1.add(button);

		horizontalLayout2.add(assignee);
		horizontalLayout2.add(dueOn);
		horizontalLayout2.add(endedOn);
		horizontalLayout2.add(partOfProcess);

		verticalLayout.add(horizontalLayout1);
		verticalLayout.add(horizontalLayout2);

		add(verticalLayout);
	}

	private void showTaskDetails() {


	}

	public void resetParentView() {
		parentView.resetView();
	}
}

