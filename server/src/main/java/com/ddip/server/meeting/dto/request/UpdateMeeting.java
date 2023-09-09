package com.ddip.server.meeting.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UpdateMeeting {

  @NotBlank(message = "번개 제목이 필요합니다.")
  private String title;
  @NotBlank(message = "번개 설명이 필요합니다.")
  private String description;
  @NotNull(message = "주소가 필요합니다")
  private Address address;
  @NotNull(message = "번개 시간이 필요합니다.")
  private LocalDateTime meetingAt;
  @NotNull(message = "번개 모집인원이 필요합니다.")
  private Integer numberOfRecruits;

  @Builder
  public UpdateMeeting(Long id, String title, String description, Address address, LocalDateTime meetingAt,
      Integer numberOfRecruits) {
    this.title = title;
    this.description = description;
    this.address = address;
    this.meetingAt = meetingAt;
    this.numberOfRecruits = numberOfRecruits;
  }
}
