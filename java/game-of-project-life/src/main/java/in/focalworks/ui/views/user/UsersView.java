package in.focalworks.ui.views.user;

import org.springframework.beans.factory.annotation.Autowired;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.HtmlImport;
import com.vaadin.flow.component.polymertemplate.PolymerTemplate;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.templatemodel.TemplateModel;

import in.focalworks.ui.MainView;
import in.focalworks.ui.utils.AppConst;

@Tag("users-view")
@HtmlImport("src/views/user/users-view.html")
@Route(value = AppConst.PAGE_USERS, layout = MainView.class)
@PageTitle(AppConst.TITLE_USERS)

public class UsersView extends PolymerTemplate<TemplateModel> implements RouterLayout {

	@Autowired
	public UsersView() {

	}
}
