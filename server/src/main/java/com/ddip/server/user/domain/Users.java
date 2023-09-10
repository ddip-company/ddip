package com.ddip.server.user.domain;

import static com.ddip.server.user.service.JwtService.buildJwt;

import com.ddip.server.meeting.domain.Meeting;
import com.ddip.server.user.dto.request.Login;
import com.ddip.server.user.dto.response.LoginUser;
import com.ddip.server.user.dto.response.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
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
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true)
  private String email;

  @Column(unique = true)
  private String nickname;
  private String emoji;
  private String password;

  private Boolean isConfirm;
  @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<Meeting> meetings;
  @CreatedDate
  private LocalDateTime createdAt;
  @LastModifiedDate
  private LocalDateTime modifiedAt;

  @Builder
  public Users(Long id, String email, String nickname, String emoji, String password, Boolean isConfirm) {
    this.id = id;
    this.email = email;
    this.nickname = nickname;
    this.emoji = emoji;
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
    return LoginUser.builder().id(id).email(email).nickname(nickname).emoji(emoji).jwt(buildJwt(id)).build();
  }

  public User toUser() {
    return User.builder().id(id).email(email).nickname(nickname).emoji(emoji).build();
  }

  public void withdraw(String password) {
    if (!this.password.equals(password)) {
      throw new RuntimeException("비밀번호가 틀렸습니다.");
    }
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof Users users)) {
      return false;
    }
    return id.equals(users.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

}
