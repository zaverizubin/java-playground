package in.focalworks.backend.data.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Session extends AbstractEntity {

	@NotBlank
	@Size(max = 100)
	private String sessionKey;

	@NotNull
	private boolean completed;

	@NotBlank
	private Date startDate;

	@NotBlank
	private Date endDate;

	private String sessionData;

	@ManyToOne(fetch = FetchType.LAZY)
	private Room room;

	public Session() {
		// An empty constructor is needed for all beans
	}

	public String getSessionKey() {
		return sessionKey;
	}

	public void setSessionKey(final String sessionKey) {
		this.sessionKey = sessionKey;
	}

	public boolean getCompleted() {
		return completed;
	}

	public void setCompleted(final boolean completed) {
		this.completed = completed;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(final Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(final Date endDate) {
		this.endDate = endDate;
	}

	public String getSessionData() {
		return sessionData;
	}

	public void setSessionData(final String sessionData) {
		this.sessionData = sessionData;
	}


	public Room getRoom() {
		return room;
	}

	public void setRoom(final Room room) {
		this.room = room;
	}

}
