package com.ddip.server.meeting.domain;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import com.ddip.server.user.domain.Users;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class MeetingTest {

  @Test
  @DisplayName("번개의 주인이 아닌 유저가 번개를 수정을 하려고 하면 권한 실패")
  void updateMeetingFailForNotOwner() {

    var owner = Users.builder().id(1l).email("test@test.com").nickname("owner").password("password").build();

    var meeting = Meeting.builder()
        .owner(owner)
        .title("title")
        .description("description")
        .location(null)
        .openChat("openChat")
        .meetingAt(LocalDateTime.now())
        .numberOfRecruits(5)
        .build();

    var notOwner = Users.builder().id(2l).email("test@test.com").nickname("owner").password("password").build();
    assertThatThrownBy(
        () -> meeting.update(notOwner, "updatedTitle", "description", null, null, LocalDateTime.now(), 5)).isInstanceOf(
        SecurityException.class);

  }

}
