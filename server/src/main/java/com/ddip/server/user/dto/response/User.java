package com.ddip.server.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class User {

  private final Long id;
  private final String email;
  private final String nickname;

  @Builder
  public User(Long id, String email, String nickname) {
    this.id = id;
    this.email = email;
    this.nickname = nickname;
  }
}
