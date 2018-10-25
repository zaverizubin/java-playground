package in.focalworks.ui;



import com.vaadin.flow.component.HasElement;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.HtmlImport;
import com.vaadin.flow.component.page.Viewport;
import com.vaadin.flow.component.polymertemplate.PolymerTemplate;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.templatemodel.TemplateModel;

import in.focalworks.ui.utils.AppConst;

@Tag("base-view")
@HtmlImport("src/base-view.html")
@PageTitle("Game of Project Life")
@Viewport(AppConst.VIEWPORT)
public class BaseView extends PolymerTemplate<TemplateModel> implements RouterLayout {

	@Override
	public void showRouterLayoutContent(final HasElement content) {
		if (content != null) {
			getElement().appendChild(content.getElement());
		}
	}

}
