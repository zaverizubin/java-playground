package in.focalworks.backend.data.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
public class Role extends AbstractEntity {

	@NotBlank
	@Size(max = 255)
	private String name;

	public Role() {
	}

	public Role(final String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(final String name) {
		this.name = name;
	}

	@ManyToMany(mappedBy = "roles")
	private final Set<User> users = new HashSet<>();

}
