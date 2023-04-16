package com.ddip.server.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class User {
  private final String email;
  private final String nickname;

  @Builder
  public User(String email, String nickname) {
    this.email = email;
    this.nickname = nickname;
  }
}
