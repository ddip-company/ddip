package com.ddip.server.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Withdraw {
  @NotBlank(message = "이메일이 필요합니다.")
  private String email;
  @NotBlank(message = "비밀번호가 필요합니다.")
  private String password;

  @Builder
  Withdraw(String email, String password) {
    this.email = email;
    this.password = password;
  }
}
