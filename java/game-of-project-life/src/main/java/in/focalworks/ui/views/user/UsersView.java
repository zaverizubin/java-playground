package in.focalworks.ui.views.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.HtmlImport;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.polymertemplate.Id;
import com.vaadin.flow.component.polymertemplate.PolymerTemplate;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLayout;
import com.vaadin.flow.templatemodel.TemplateModel;

import in.focalworks.backend.data.entity.User;
import in.focalworks.backend.repositories.UserRepository;
import in.focalworks.ui.MainView;
import in.focalworks.ui.utils.AppConst;

@Tag("users-view")
@HtmlImport("src/views/user/users-view.html")
@Route(value = AppConst.PAGE_USERS, layout = MainView.class)
@PageTitle(AppConst.TITLE_USERS)

public class UsersView extends PolymerTemplate<TemplateModel> implements RouterLayout {

	private final UserRepository userRepository;

	@Id("grid")
	private Grid<User> grid;

	@Autowired
	public UsersView(final UserRepository userRepository) {
		this.userRepository = userRepository;
		Test();
	}

	private void Test() {
		final Page<User> page = userRepository.findByUsernameNotIgnoreCaseOrderByEnabledAsc("admin",
				PageRequest.of(1, 20));
		System.out.println("hi");
	}

}
