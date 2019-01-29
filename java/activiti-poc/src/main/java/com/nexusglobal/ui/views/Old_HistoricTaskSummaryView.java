package com.nexusglobal.ui.views;

import java.util.Map;

import org.activiti.engine.history.HistoricTaskInstance;

import com.nexusglobal.controllers.HistoricTaskSummaryController;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

public class Old_HistoricTaskSummaryView extends VerticalLayout {

	private final Old_MainView parentView;
	private HistoricTaskInstance historicTaskInstance;
	private final HistoricTaskSummaryController controller;

	public Old_HistoricTaskSummaryView(final Old_MainView parentView) {
		this.parentView = parentView;
		controller = new HistoricTaskSummaryController(this);
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
		partOfProcess.setText(
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
		final VerticalLayout verticalLayout = new VerticalLayout();
		verticalLayout.setWidth("100%");

		int count = 1;
		final Map<String, Object> variables = historicTaskInstance.getTaskLocalVariables();

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

