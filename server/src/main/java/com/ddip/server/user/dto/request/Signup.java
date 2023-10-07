package com.ddip.server.user.dto.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Signup {

    @Email(message = "이메일 입력하세요.")
    private String email;
    @NotBlank(message = "별명을 입력하세요.")
    private String nickname;
    @NotBlank(message = "이메일 형식이어야 합니다.")
    private String emoji;
    @NotBlank(message = "비밀번호를 입력하세요.")
    private String password;

    @Builder
    Signup(String email, String nickname, String emoji, String password) {
        this.email = email;
        this.nickname = nickname;
        this.emoji = emoji;
        this.password = password;
    }
}
