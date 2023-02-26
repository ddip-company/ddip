package com.ddip.server.user.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.assertThat;

import com.ddip.server.user.domain.SignupConfirmation;
import com.ddip.server.user.domain.Users;
import com.ddip.server.user.dto.request.Signup;
import com.ddip.server.user.repository.SignupConfirmationRepository;
import com.ddip.server.user.repository.UserRepository;
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
    private UserRepository userRepository;

    @Autowired
    private SignupConfirmationRepository signupConfirmationRepository;

    @Autowired
    private RedisTemplate<String, SignupConfirmation> redisTemplate;

    private final String existEmail = "test@test.com";
    private final String existNickname = "testNickname";

    @BeforeEach
    void setUp() {
        userRepository.save(Users.builder().email(existEmail).nickname(existNickname).password("1234").build());
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
}