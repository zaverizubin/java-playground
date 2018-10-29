package in.focalworks.backend.data.entity;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity(name = "Room")
public class Room extends AbstractEntity {

	@NotBlank
	@Size(max = 255)
	private String name;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	private User facilitator;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	private User scorer;

	@NotBlank
	private Date createdOn;

	@OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Session> sessions;

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "roomteam", joinColumns = @JoinColumn(name = "room"), inverseJoinColumns = @JoinColumn(name = "team"))
	private Set<Team> teams;

	@PrePersist
	@PreUpdate
	private void prepareData(){
		createdOn = createdOn == null ? new Date() : createdOn;
	}

	public Room() {
		// An empty constructor is needed for all beans
	}

	public String getName() {
		return name;
	}

	public void setName(final String name) {
		this.name = name;
	}

	public User getFacilitator() {
		return facilitator;
	}

	public void setFacilitator(final User facilitator) {
		this.facilitator = facilitator;
	}

	public User getScorer() {
		return facilitator;
	}

	public void setScorer(final User scorer) {
		this.scorer = scorer;
	}

	public Date getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(final Date createdOn) {
		this.createdOn = createdOn;
	}

	public Set<Session> getSessions() {
		return sessions;
	}

	public void setSessions(final Set<Session> sessions) {
		this.sessions = sessions;
	}

	public Set<Team> getTeams() {
		return teams;
	}

	public void setTeams(final Set<Team> teams) {
		this.teams = teams;
	}
}
