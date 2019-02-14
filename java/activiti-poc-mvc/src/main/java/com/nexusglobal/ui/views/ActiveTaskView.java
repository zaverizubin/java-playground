package com.nexusglobal.ui.views;

import org.activiti.engine.form.FormProperty;
import org.activiti.engine.form.TaskFormData;
import org.springframework.beans.factory.annotation.Autowired;

import com.nexusglobal.ui.common.PrototypeComponent;
import com.nexusglobal.ui.presenters.ActiveTaskPresenter;
import com.nexusglobal.ui.viewmodels.ActiveTaskViewModel;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.checkbox.Checkbox;
import com.vaadin.flow.component.dialog.Dialog;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.html.NativeButton;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;

@PrototypeComponent
public class ActiveTaskView extends VerticalLayout {

	private final ActiveTaskPresenter presenter;
	private ActiveTaskViewModel viewModel;


	@Autowired
	public ActiveTaskView(final ActiveTaskPresenter presenter) {
		this.presenter = presenter;
		presenter.setView(this);
	}

	public ActiveTaskPresenter getPresenter() {
		return presenter;
	}

	public void refresh() {
		removeAll();
		viewModel = presenter.getViewModel();
		buildView();
	}

	private void buildView() {
		final VerticalLayout verticalLayout = new VerticalLayout();
		verticalLayout.addClassName("instanceDetailTitleBar");

		final HorizontalLayout horizontalLayout1 = new HorizontalLayout();
		final HorizontalLayout horizontalLayout2 = new HorizontalLayout();
		horizontalLayout1.setWidth("100%");
		horizontalLayout2.setWidth("100%");

		final Label title = new Label();
		title.setText(viewModel.getTask().getName());
		title.setWidth("400px");
		title.addClassName("instanceDetailTitle");

		final Button buttonBackToProcess = new Button();
		buttonBackToProcess.setWidth("200px");
		buttonBackToProcess.setText("Back to Process");
		buttonBackToProcess.addClickListener(event -> {
			presenter.onBackToProcessClick();
		});

		final Button buttonComplete = new Button();
		buttonComplete.setText("Complete");
		buttonComplete.setWidth("150px");
		buttonComplete.setVisible(false);
		buttonComplete.addClickListener(event -> {
			presenter.onTaskCompleteClick();
		});

		final Button buttonClaim = new Button();
		buttonClaim.setText("Claim");
		buttonClaim.addClickListener(event -> {
			presenter.onClaimTaskClick();
			showTaskDetails();
			buttonClaim.setVisible(false);
			buttonComplete.setVisible(true);
		});

		final Label assignee = new Label();
		if (viewModel.getTask().getAssignee() != null) {
			assignee.setText("Assignee:" + viewModel.getTask().getAssignee());
		} else {
			assignee.setText("Assignee: Assigned to nobody");
		}

		final Label dueOn = new Label();
		if (viewModel.getTask().getDueDate() != null) {
			dueOn.setText("Due:" + viewModel.getTask().getDueDate().getDate() + ":"
					+ (viewModel.getTask().getDueDate().getMonth() + 1) + ":"
					+ (1900 + viewModel.getTask().getDueDate().getYear()));
		} else {
			dueOn.setText("No due date");
		}

		final Label partOfProcess = new Label();
		partOfProcess.setText(
				"Part of process: "
						+ viewModel.getProcessDefinition().getName());

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


	public void showPathSelectionDialog() {

		final Dialog dialog = new Dialog();

		dialog.setCloseOnEsc(false);
		dialog.setCloseOnOutsideClick(false);

		final Label messageLabel = new Label();
		messageLabel.setText("Select the forms you want to work with");

		final VerticalLayout verticalLayout = new VerticalLayout();

		final Checkbox chk1 = new Checkbox();
		chk1.setLabel("Injuries");
		if (viewModel.getProcessInstance().getProcessVariables().containsKey("injury")
				&& (boolean) viewModel.getProcessInstance().getProcessVariables().get("injury")) {
			chk1.setEnabled(false);
		}

		final Checkbox chk2 = new Checkbox();
		chk2.setLabel("Accidents");
		if (viewModel.getProcessInstance().getProcessVariables().containsKey("accident")
				&& (boolean) viewModel.getProcessInstance().getProcessVariables().get("accident")) {
			chk2.setEnabled(false);
		}

		final Checkbox chk3 = new Checkbox();
		chk3.setLabel("Spills");
		if (viewModel.getProcessInstance().getProcessVariables().containsKey("spill")
				&& (boolean) viewModel.getProcessInstance().getProcessVariables().get("spill")) {
			chk3.setEnabled(false);
		}

		verticalLayout.add(chk1, chk2, chk3);

		final NativeButton confirmButton = new NativeButton("Ok", event -> {
			presenter.onPathSelectionClick(chk1.getValue(), chk2.getValue(), chk3.getValue());
			dialog.close();
		});

		dialog.add(messageLabel);
		dialog.add(verticalLayout);
		dialog.add(confirmButton);

		dialog.open();
	}

	private void showTaskDetails() {

		final VerticalLayout verticalLayout = new VerticalLayout();
		verticalLayout.setWidth("100%");

		int count = 1;
		final TaskFormData taskFormData = viewModel.getTaskFormData();
		for (final FormProperty formProperty : taskFormData.getFormProperties()) {

			final HorizontalLayout horizontalLayout = new HorizontalLayout();
			horizontalLayout.setWidth("100%");
			count += 1;

			final Label label1 = new Label();
			label1.setText(formProperty.getName() + ":");

			final TextField formField = new TextField();
			formField.setWidth("400px");
			if (count % 2 == 0) {
				formField.setClassName("formValueBkg-1");
			} else {
				formField.setClassName("formValueBkg-2");
			}
			viewModel.getFormData().put(formProperty.getName(), formField);

			horizontalLayout.add(label1);
			horizontalLayout.add(formField);
			verticalLayout.add(horizontalLayout);
		}
		add(verticalLayout);
	}

}

