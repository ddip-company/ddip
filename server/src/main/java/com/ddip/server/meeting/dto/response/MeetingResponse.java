package com.ddip.server.meeting.dto.response;

import com.ddip.server.user.dto.response.User;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MeetingResponse {

  private Long id;
  private User owner;
  private String title;
  private String description;
  private Location location;
  private LocalDateTime meetingAt;
  private Integer numberOfPeople;

  @Builder
  public MeetingResponse(Long id, User owner, String title, String description, Location location,
      LocalDateTime meetingAt, Integer numberOfPeople) {
    this.id = id;
    this.owner = owner;
    this.title = title;
    this.description = description;
    this.location = location;
    this.meetingAt = meetingAt;
    this.numberOfPeople = numberOfPeople;
  }
}
