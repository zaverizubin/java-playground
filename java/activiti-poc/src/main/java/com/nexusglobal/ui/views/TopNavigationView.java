package com.nexusglobal.ui.views;

import com.vaadin.flow.component.Text;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.HighlightConditions;
import com.vaadin.flow.router.RouterLink;

public class TopNavigationView extends VerticalLayout {

	public void refresh() {
		buildView();
	}

	private void buildView() {
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
}
