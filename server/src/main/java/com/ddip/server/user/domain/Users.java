package com.ddip.server.user.domain;

import static com.ddip.server.user.service.JwtService.buildJwt;

import com.ddip.server.user.dto.request.Login;
import com.ddip.server.user.dto.response.LoginUser;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String email;

    @Column(unique = true)
    private String nickname;

    private String password;

    private Boolean isConfirm;
    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime modifiedAt;

    @Builder
    public Users(String email, String nickname, String password, Boolean isConfirm) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.isConfirm = isConfirm;
    }

    public void confirm() {
        this.isConfirm = true;
    }

    public boolean isAvailableLogin(Login login) {
        return password.equals(login.getPassword()) && email.equals(login.getEmail()) && isConfirm;
    }

    public LoginUser toLoginUser() {
        return LoginUser.builder().email(email).nickname(nickname).jwt(buildJwt(email)).build();
    }
}
