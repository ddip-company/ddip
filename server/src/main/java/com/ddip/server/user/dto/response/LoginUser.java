package com.ddip.server.user.dto.response;

import java.util.Objects;
import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginUser {
    private final String email;
    private final String nickname;
    private final String jwt;

    @Builder
    public LoginUser(String email, String nickname, String jwt) {
        this.email = email;
        this.nickname = nickname;
        this.jwt = jwt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        LoginUser loginUser = (LoginUser) o;
        return Objects.equals(email, loginUser.email) && Objects.equals(nickname, loginUser.nickname);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email, nickname, jwt);
    }
}
