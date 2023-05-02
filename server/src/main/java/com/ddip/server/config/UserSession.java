package com.ddip.server.config;

import lombok.Builder;
import lombok.Data;

@Data
public class UserSession {

  private Long id;

  @Builder
  public UserSession(Long id) {
    this.id = id;
  }

}
