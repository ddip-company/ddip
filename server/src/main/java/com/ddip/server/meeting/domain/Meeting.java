package com.ddip.server.meeting.domain;

import com.ddip.server.meeting.dto.response.MeetingResponse;
import com.ddip.server.user.domain.Users;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
public class Meeting {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "owner_id")
  private Users owner;
  @Column
  private String title;
  @Column
  private String description;
  @Column
  @Embedded
  private Location location;
  @Column
  private LocalDateTime meetingAt;
  @Column
  private Integer numberOfPeople;
  @CreatedDate
  private LocalDateTime createdAt;
  @LastModifiedDate
  private LocalDateTime modifiedAt;

  @Builder
  public Meeting(Users owner, String title, String description, Location location,
      LocalDateTime meetingAt,
      Integer numberOfPeople) {
    this.owner = owner;
    this.title = title;
    this.description = description;
    this.location = location;
    this.meetingAt = meetingAt;
    this.numberOfPeople = numberOfPeople;
  }

  public MeetingResponse toMeetingResponse() {
    return MeetingResponse.builder()
        .id(id)
        .owner(owner.toUser())
        .title(title)
        .description(description)
        .location(location.toResponse())
        .meetingAt(meetingAt)
        .numberOfPeople(numberOfPeople)
        .build();
  }
}
