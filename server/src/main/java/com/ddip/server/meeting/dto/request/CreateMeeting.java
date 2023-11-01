package com.ddip.server.meeting.dto.request;

import com.ddip.server.meeting.domain.Meeting;
import com.ddip.server.user.domain.Users;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class CreateMeeting {

  @NotBlank(message = "번개 제목이 필요합니다.")
  String title;
  @NotBlank(message = "번개 설명이 필요합니다.")
  private String description;
  @NotNull(message = "주소가 필요합니다")
  private Address address;
  private String openChat;
  @NotNull(message = "번개 시간이 필요합니다.")
  private LocalDateTime meetingAt;
  @NotNull(message = "번개 모집인원이 필요합니다.")
  private Integer numberOfRecruits;


  public Meeting toMeeting(Users owner) {
    return Meeting.builder()
        .owner(owner)
        .title(title)
        .description(description)
        .location(address.toLocation())
        .openChat(openChat)
        .meetingAt(meetingAt)
        .numberOfRecruits(numberOfRecruits)
        .build();
  }
}
