package com.nexusglobal.ui.views;

import org.activiti.engine.history.HistoricTaskInstance;
import org.activiti.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;

import com.nexusglobal.ui.presenters.MainPresenter;
import com.vaadin.flow.component.dependency.HtmlImport;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.page.Viewport;
import com.vaadin.flow.router.RouterLayout;

/**
 * The main layout contains the header with the navigation buttons, and the
 * child views below that.
 */
@HtmlImport("frontend://styles/shared-styles.html")
@HtmlImport("frontend://styles/styles.html")
@Viewport("width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes")
public class MainView extends Div  implements RouterLayout {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;
	private final  MainPresenter presenter;
	private final  TopNavigationView topNavigationView;
	private final  ProcessDefinitionView processDefinitionView;
	private final  ProcessInstanceListView processInstanceListView;
	private final  ProcessInstanceSummaryView processInstanceSummaryView;
	private final  ActiveTaskView activeTaskView;
	private final  HistoricTaskView historicTaskView;

	private VerticalLayout verticalLayout1;
	private VerticalLayout verticalLayout2;


	@Autowired
	public MainView(final MainPresenter presenter, final TopNavigationView topNavigationView,
			final ProcessDefinitionView processDefinitionView,
			final ProcessInstanceListView processInstanceListView,
			final ProcessInstanceSummaryView processInstanceSummaryView,
			final ActiveTaskView activeTaskView, final HistoricTaskView historicTaskView) {
		this.presenter = presenter;
		this.topNavigationView = topNavigationView;
		this.processDefinitionView = processDefinitionView;
		this.processInstanceListView = processInstanceListView;
		this.processInstanceSummaryView = processInstanceSummaryView;
		this.activeTaskView = activeTaskView;
		this.historicTaskView = historicTaskView;
		this.presenter.setView(this);
		refresh();
	}

	public MainPresenter getPresenter() {
		return presenter;
	}

	public void refresh() {
		removeAll();
		buildView();
		presenter.bindEventListeners(processDefinitionView.getPresenter(), processInstanceListView.getPresenter(),
				processInstanceSummaryView.getPresenter(), activeTaskView.getPresenter(),
				historicTaskView.getPresenter());
	}



	private void buildView() {

		verticalLayout1 = new VerticalLayout();
		verticalLayout1.addClassName("verticalBoxBorder");

		verticalLayout2 = new VerticalLayout();
		verticalLayout2.addClassName("verticalBoxBorder");

		verticalLayout1.setWidth("500px");
		verticalLayout2.setWidth("800px");

		verticalLayout1.add(processDefinitionView);
		verticalLayout1.add(processInstanceListView);
		verticalLayout2.add(processInstanceSummaryView);

		final HorizontalLayout horizontalLayout = new HorizontalLayout();
		horizontalLayout.add(verticalLayout1, verticalLayout2);

		add(topNavigationView);
		add(horizontalLayout);
	}

	public void clearSummaryView() {
		verticalLayout2.removeAll();
	}

	public void showProcessInstanceSummaryView() {
		verticalLayout2.removeAll();
		verticalLayout2.add(processInstanceSummaryView);
		processInstanceSummaryView.refresh();
	}

	public void showActiveTaskView(final Task task) {
		verticalLayout2.removeAll();
		verticalLayout2.add(activeTaskView);
		activeTaskView.getPresenter().updateViewModel(task);
	}

	public void showHistoricTaskSummaryView(final HistoricTaskInstance historicTaskInstance) {
		verticalLayout2.removeAll();
		verticalLayout2.add(historicTaskView);
		historicTaskView.getPresenter().updateViewModel(historicTaskInstance);
	}

}
