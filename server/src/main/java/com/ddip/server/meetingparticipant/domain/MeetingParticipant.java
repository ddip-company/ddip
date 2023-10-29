package com.ddip.server.meetingparticipant.domain;

import com.ddip.server.meeting.domain.Meeting;
import com.ddip.server.user.domain.Users;
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
public class MeetingParticipant {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "participant_id")
  private Users participant;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "meeting_id")
  private Meeting meeting;

  @CreatedDate
  private LocalDateTime createdAt;
  @LastModifiedDate
  private LocalDateTime modifiedAt;

  @Builder
  public MeetingParticipant(Users participant, Meeting meeting) {
    this.participant = participant;
    this.meeting = meeting;
  }
}
