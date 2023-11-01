package com.ddip.server.user.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.ddip.server.user.domain.SignupConfirmation;
import com.ddip.server.user.domain.Users;
import com.ddip.server.user.dto.request.Confirm;
import com.ddip.server.user.dto.request.Login;
import com.ddip.server.user.dto.request.Signup;
import com.ddip.server.user.dto.request.Withdraw;
import com.ddip.server.user.dto.response.LoginUser;
import com.ddip.server.user.repository.SignupConfirmationRepository;
import com.ddip.server.user.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.Optional;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
class AuthServiceTest {

  @Autowired
  private AuthService authService;
  @Autowired
  private UserService userService;
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private SignupConfirmationRepository signupConfirmationRepository;

  @Autowired
  private RedisTemplate<String, SignupConfirmation> redisTemplate;

  private final String existEmail = "test@test.com";
  private final String existNickname = "testNickname";
  private final String existPassword = "1234";

  @BeforeEach
  void setUp() {
    userRepository.save(Users.builder().email(existEmail).nickname(existNickname).password(existPassword).build());
  }

  @AfterEach
  void tearDown() {
    userRepository.deleteAll();
  }

  @Test
  @DisplayName("회원가입 성공")
  void test1() {
    // given 회원 가입 시도
    Signup signup = Signup.builder().email("email").nickname("nickname").password("1234").build();
    authService.signup(signup);
    // when 회원 가입 시도가 성공하면
    // then 회원의 인증 번호가 생긴다
    assertThat(userRepository.findByEmail("email").isPresent()).isTrue();

    Optional<SignupConfirmation> signupConfirmation = signupConfirmationRepository.findOneByEmail("email");
    assertThat(signupConfirmation.isPresent()).isTrue();
  }

  @Test
  @DisplayName("회원가입 중복된 이메일 실패")
  void test2() {
    Signup signup = Signup.builder().email(existEmail).nickname("nick").password("1234").build();
    assertThatThrownBy(() -> authService.signup(signup)).isInstanceOf(RuntimeException.class);
  }

  @Test
  @DisplayName("회원가입 중복된 닉네임 실패")
  void test3() {
    Signup signup = Signup.builder().email("email").nickname(existNickname).password("1234").build();
    assertThatThrownBy(() -> authService.signup(signup)).isInstanceOf(RuntimeException.class);
  }

  @Test
  @DisplayName("인증번호로 인증 성공")
  void test4() {
    // given 회원 가입 성공
    Signup signup = Signup.builder().email("dltntnqo@naver.com").nickname("nickname").password("1234").build();
    authService.signup(signup);

    // when 인증번호로 인증 시도가 성공하면
    SignupConfirmation signupConfirmation = signupConfirmationRepository.findOneByEmail("dltntnqo@naver.com").get();
    Confirm confirm = Confirm.builder().email("dltntnqo@naver.com").authNumber(signupConfirmation.getKey()).build();

    // then 인증이 성공한다
    authService.confirm(confirm);
  }

  @Test
  @DisplayName("잘못된 인증번호로 인증 실패")
  void test5() {
    // given 회원 가입 성공
    Signup signup = Signup.builder().email("dltntnqo@naver.com").nickname("nickname").password("1234").build();
    authService.signup(signup);

    // when 잘못된 인증번호로 인증 시도하면
    Confirm confirm = Confirm.builder().email("dltntnqo@naver.com").authNumber("notAuthNumber").build();

    // then 인증에 실패한다
    assertThatThrownBy(() -> authService.confirm(confirm)).isInstanceOf(RuntimeException.class);
  }

  @Test
  @DisplayName("로그인 성공")
  void test6() {
    // given 회원이 존재하고
    // when 이메일과 패스워드로 로그인 시도
    Login login = Login.builder().email(existEmail).password(existPassword).build();
    LoginUser loginUser = authService.login(login);
    // then 로그인 성공
    assertThat(loginUser).isEqualTo(
        LoginUser.builder().email(existEmail).nickname(existNickname).jwt(null).build());
  }

  @Test
  @DisplayName("잘못된 이메일로 로그인 실패")
  void test7() {
    // given 회원이 존재하고

    Login login = Login.builder().email("notExistEmail").password(existPassword).build();
    // when 잘못된 이메일로 로그인 시도
    // then 로그인 실패
    assertThatThrownBy(() -> authService.login(login)).isInstanceOf(RuntimeException.class);

  }

  @Test
  @DisplayName("잘못된 비밀번호로 로그인 실패")
  void test8() {
    // given 회원이 존재하고
    Login login = Login.builder().email(existEmail).password("notExistPassword").build();
    // when 잘못된 비밀번호로 로그인 시도
    // then 로그인 실패
    assertThatThrownBy(() -> authService.login(login)).isInstanceOf(RuntimeException.class);
  }

  @Test
  @DisplayName("회원 탈퇴 성공")
  void test9() {
    // given 회원이 존재하고
    // when 회원 탈퇴 시도
    var withdraw = Withdraw.builder().email(existEmail).password(existPassword).build();
    authService.withdraw(withdraw);
    // then 회원이 삭제된다
    assertThat(userRepository.findByEmail(existEmail).isPresent()).isFalse();
  }

  @Test
  @DisplayName("회원 탈퇴 비밀번호 오류")
  void test10() {
    // given 회원이 존재하고
    // when 회원 탈퇴 시도
    var withdraw = Withdraw.builder().email(existEmail).password("notExistPassword").build();

    // then 패스워드 일치 예외 발생
    assertThatThrownBy(() -> authService.withdraw(withdraw)).isInstanceOf(RuntimeException.class);
  }

  @Test
  @DisplayName("닉네임으로 회원 찾기")
  void test11() {
    // given 회원이 존재하고
    // when 회원 찾기 시도
    var nickname = existNickname;
    // then 존재하지 않는 닉네임으로 회원찾기 실패
    var user = userService.findUserByNickname(nickname);
    assertThat(user.getNickname()).isEqualTo(nickname);
  }

  @Test
  @DisplayName("닉네임으로 회원 찾기 실패")
  void test12() {

    // then 존재하지 않는 닉네임으로 회원찾기 실패
    assertThatThrownBy(() -> userService.findUserByNickname("notExistNickname")).isInstanceOf(
        EntityNotFoundException.class);
  }
}