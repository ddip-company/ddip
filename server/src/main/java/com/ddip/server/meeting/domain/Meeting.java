package com.ddip.server.meeting.domain;

import com.ddip.server.meeting.dto.response.MeetingResponse;
import com.ddip.server.meetingparticipant.domain.MeetingParticipant;
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
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
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
  @ManyToOne(fetch = FetchType.LAZY)
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
  private String openChat;
  @Column
  private LocalDateTime meetingAt;
  @Column
  private Integer numberOfRecruits;
  @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<MeetingParticipant> meetingParticipants;
  @CreatedDate
  private LocalDateTime createdAt;
  @LastModifiedDate
  private LocalDateTime modifiedAt;

  @Builder
  public Meeting(Users owner, String title, String description, Location location, String openChat,
      LocalDateTime meetingAt,
      Integer numberOfRecruits) {
    this.owner = owner;
    this.title = title;
    this.description = description;
    this.location = location;
    this.openChat = openChat;
    this.meetingAt = meetingAt;
    this.numberOfRecruits = numberOfRecruits;
    this.meetingParticipants = List.of();
  }

  public MeetingResponse toMeetingResponse() {
    return MeetingResponse.builder()
        .id(id)
        .owner(owner.toUser())
        .title(title)
        .description(description)
        .location(location.toResponse())
        .openChat(openChat)
        .meetingAt(meetingAt)
        .numberOfRecruits(numberOfRecruits)
        .numberOfParticipants(meetingParticipants.size())
        .createdAt(createdAt)
        .build();
  }

  public void update(Users owner, String title, String description, Location location, String openChat, LocalDateTime meetingAt,
      Integer numberOfRecruits) {
    if (!owner.equals(this.owner)) {
      throw new SecurityException("번개의 주인만 수정이 가능합니다.");
    }
    this.title = title;
    this.description = description;
    this.location = location;
    this.openChat = openChat;
    this.meetingAt = meetingAt;
    this.numberOfRecruits = numberOfRecruits;
  }

  public boolean isOwner(Users owner) {
    return owner.equals(this.owner);
  }

  public void participate(Users participant) {
    if (isParticipatedMember(participant)) {
      throw new RuntimeException("이미 참가한 띱에는 참가할 수 없습니다.");
    }
    meetingParticipants.add(MeetingParticipant.builder().participant(participant).meeting(this).build());
  }

  public void leave(Users leaver) {
    if (!isParticipatedMember(leaver)) {
      throw new RuntimeException("참가하지 않은 띱입니다.");
    }
    meetingParticipants.remove(MeetingParticipant.builder().participant(leaver).meeting(this).build());
  }

  private boolean isParticipatedMember(Users leaver) {
    return meetingParticipants.stream().anyMatch(i -> i.equalsParticipant(leaver));
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }

    Meeting meeting = (Meeting) o;

    return Objects.equals(id, meeting.id);
  }

  @Override
  public int hashCode() {
    return id != null ? id.hashCode() : 0;
  }
}
