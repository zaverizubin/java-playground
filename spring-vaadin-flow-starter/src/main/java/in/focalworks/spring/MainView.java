package in.focalworks.spring;

import org.springframework.beans.factory.annotation.Autowired;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.icon.Icon;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.Route;

@Route
public class MainView extends VerticalLayout {

	private final CustomerService service = CustomerService.getInstance();
	private final Grid<Customer> grid = new Grid<>();
	private final TextField filterText = new TextField();
	private final CustomerForm form = new CustomerForm(this);

	public MainView() {

		filterText.setPlaceholder("Filter by name...");
		filterText.setValueChangeMode(ValueChangeMode.EAGER);
		filterText.addValueChangeListener(e -> updateList());
		final Button clearFilterTextBtn = new Button(new Icon(VaadinIcon.CLOSE_CIRCLE));
		clearFilterTextBtn.addClickListener(e -> filterText.clear());
		final HorizontalLayout filtering = new HorizontalLayout(filterText, clearFilterTextBtn);

		final Button addCustomerBtn = new Button("Add new customer");
		addCustomerBtn.addClickListener(e -> {
			grid.asSingleSelect().clear();
			form.setCustomer(new Customer());
		});
		final HorizontalLayout toolbar = new HorizontalLayout(filtering, addCustomerBtn);

		grid.setSizeFull();

		grid.addColumn(Customer::getFirstName).setHeader("First name");
		grid.addColumn(Customer::getLastName).setHeader("Last name");
		grid.addColumn(Customer::getStatus).setHeader("Status");

		final HorizontalLayout main = new HorizontalLayout(grid, form);
		main.setAlignItems(Alignment.START);
		main.setSizeFull();

		add(toolbar, main);
		setHeight("100vh");
		updateList();

		grid.asSingleSelect().addValueChangeListener(event -> {
			form.setCustomer(event.getValue());
		});
	}

	public MainView(@Autowired final MessageBean bean) {
		final Button button = new Button("Click me",
				e -> Notification.show(bean.getMessage()));
		add(button);
	}

	public void updateList() {
		grid.setItems(service.findAll(filterText.getValue()));
	}

}
