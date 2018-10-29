package in.focalworks.backend.data.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity(name = "Team")
public class Team extends AbstractEntity {

	@NotBlank
	@Size(max = 255)
	private String name;

	@NotNull
	private String description;

	@NotBlank
	private boolean enabled;

	@NotBlank
	private Date createdOn;

	@ManyToMany(mappedBy = "teams")
	private Set<Room> rooms = new HashSet<>();

	@PrePersist
	@PreUpdate
	private void prepareData(){
		createdOn = createdOn == null ? new Date() : createdOn;
	}

	public Team() {
		// An empty constructor is needed for all beans
	}

	public String getName() {
		return name;
	}

	public void setName(final String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(final String description) {
		this.description = description;
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

	public Set<Room> getRooms() {
		return rooms;
	}

	public void setRooms(final Set<Room> rooms) {
		this.rooms = rooms;
	}
}
