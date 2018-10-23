/**
 *
 */
package in.focalworks.zubin.ui.crud;

import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

import in.focalworks.zubin.backend.data.entity.Order;
import in.focalworks.zubin.backend.data.entity.Product;
import in.focalworks.zubin.backend.data.entity.User;
import in.focalworks.zubin.backend.service.OrderService;
import in.focalworks.zubin.backend.service.ProductService;
import in.focalworks.zubin.backend.service.UserService;
import in.focalworks.zubin.ui.views.storefront.StorefrontView;

@Configuration
public class PresenterFactory {

	@Bean
	@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
	public CrudEntityPresenter<Product> productPresenter(ProductService crudService, User currentUser) {
		return new CrudEntityPresenter<>(crudService, currentUser);
	}

	@Bean
	@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
	public CrudEntityPresenter<User> userPresenter(UserService crudService, User currentUser) {
		return new CrudEntityPresenter<>(crudService, currentUser);
	}

	@Bean
	@Scope(ConfigurableBeanFactory.SCOPE_PROTOTYPE)
	public EntityPresenter<Order, StorefrontView> orderEntityPresenter(OrderService crudService, User currentUser) {
		return new EntityPresenter<>(crudService, currentUser);
	}

}
