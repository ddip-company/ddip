package com.ddip.server.meeting.dto.response;

import com.ddip.server.user.dto.response.User;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MeetingResponse {

  private Long id;
  private User owner;
  private String title;
  private String description;
  private Location location;
  private String openChat;
  private LocalDateTime meetingAt;
  private LocalDateTime createdAt;
  private Integer numberOfRecruits;
  private List<Long> participantIds;
  private Integer numberOfParticipants;


  @Builder
  public MeetingResponse(Long id, User owner, String title, String description, Location location, String openChat,
      LocalDateTime meetingAt, LocalDateTime createdAt, Integer numberOfRecruits, List<Long> participantIds, Integer numberOfParticipants) {
    this.id = id;
    this.owner = owner;
    this.title = title;
    this.description = description;
    this.location = location;
    this.openChat = openChat;
    this.meetingAt = meetingAt;
    this.createdAt = createdAt;
    this.numberOfRecruits = numberOfRecruits;
    this.participantIds = participantIds;
    this.numberOfParticipants = numberOfParticipants;
  }
}
