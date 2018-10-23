package in.focalworks.zubin.ui.views.storefront.events;

import com.vaadin.flow.component.ComponentEvent;
import in.focalworks.zubin.ui.views.orderedit.OrderEditor;

public class ReviewEvent extends ComponentEvent<OrderEditor> {

	public ReviewEvent(OrderEditor component) {
		super(component, false);
	}
}