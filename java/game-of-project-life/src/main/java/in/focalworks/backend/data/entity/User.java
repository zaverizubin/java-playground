package in.focalworks.backend.data.entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity(name = "User")
public class User extends AbstractEntity {

	@NotBlank
	@Size(max = 255)
	private String username;

	@NotNull
	@Size(min = 4, max = 255)
	private String password;

	@NotBlank
	private boolean enabled;

	@NotBlank
	private Date createdOn;

	@OneToMany(mappedBy = "facilitator", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Room> roomsAsFacilitator;

	@OneToMany(mappedBy = "scorer", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Room> roomsAsScorer;

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "userrole", joinColumns = @JoinColumn(name = "user"), inverseJoinColumns = @JoinColumn(name = "role"))
	private Set<Role> roles;

	@PrePersist
	@PreUpdate
	private void prepareData(){
		createdOn = createdOn == null ? new Date() : createdOn;
	}

	public User() {
		// An empty constructor is needed for all beans
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(final String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(final String password) {
		this.password = password;
	}

	public boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(final boolean enabled) {
		this.enabled = enabled;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(final Date createdOn) {
		this.createdOn = createdOn;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(final Set<Role> roles) {
		this.roles = roles;
	}

}
