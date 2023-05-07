package com.ddip.server.meeting.dto.request;

import static java.lang.Math.max;
import static java.lang.Math.min;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchMeeting {

  private static final int MAX_SIZE = 2000;
  @Builder.Default
  private Integer page = 1;
  @Builder.Default
  private Integer size = 10;
  private String keyword;

  public long getOffset() {
    return (long) (max(1, page) - 1) * min(size, MAX_SIZE);
  }
}
