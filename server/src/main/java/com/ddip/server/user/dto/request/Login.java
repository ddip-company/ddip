package com.ddip.server.user.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Login {
    @NotBlank(message = "이메일이 필요합니다.")
    private String email;
    @NotBlank(message = "비밀번호가 필요합니다.")
    private String password;

    @Builder
    Login(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
