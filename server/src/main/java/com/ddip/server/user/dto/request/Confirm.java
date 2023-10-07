package com.ddip.server.user.dto.request;

import com.ddip.server.user.domain.SignupConfirmation;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Confirm {

    @Email(message = "이메일이 필요합니다.")
    private String email;
    @NotBlank(message = "인증번호가 필요합니다.")
    private String authNumber;

    @Builder
    Confirm(String email, String authNumber) {
        this.email = email;
        this.authNumber = authNumber;
    }

    public SignupConfirmation toSignupConfirmation() {
        return SignupConfirmation.builder().key(authNumber).build();
    }
}
