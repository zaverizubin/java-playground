package in.focalworks.spring;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;

public class CustomerForm extends FormLayout {

	private final TextField firstName = new TextField("First name");
	private final TextField lastName = new TextField("Last name");
	private final ComboBox<CustomerStatus> status = new ComboBox<>("Status");
	private final CustomerService service = CustomerService.getInstance();
	private Customer customer;
	private final MainView mainView;
	private final Binder<Customer> binder = new Binder<>(Customer.class);

	private final Button save = new Button("Save");
	private final Button delete = new Button("Delete");

	public CustomerForm(final MainView mainView) {
		this.mainView = mainView;
		final HorizontalLayout buttons = new HorizontalLayout(save, delete);
		add(firstName, lastName, status, buttons);
		save.getElement().setAttribute("theme", "primary");
		status.setItems(CustomerStatus.values());
		binder.bindInstanceFields(this);
		save.addClickListener(e -> save());
		delete.addClickListener(e -> delete());
		setCustomer(null);
	}

	public void setCustomer(final Customer customer) {
		this.customer = customer;
		binder.setBean(customer);
		final boolean enabled = customer != null;
		save.setEnabled(enabled);
		delete.setEnabled(enabled);
		if (enabled) {
			firstName.focus();
		}
	}

	private void delete() {
		service.delete(customer);
		mainView.updateList();
		setCustomer(null);
	}

	private void save() {
		service.save(customer);
		mainView.updateList();
		setCustomer(null);
	}

}
