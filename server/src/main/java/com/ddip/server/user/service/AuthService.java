package com.ddip.server.user.service;

import com.ddip.server.user.domain.SignupConfirmation;
import com.ddip.server.user.domain.Users;
import com.ddip.server.user.dto.external.ToMail;
import com.ddip.server.user.dto.request.Confirm;
import com.ddip.server.user.dto.request.Login;
import com.ddip.server.user.dto.request.Signup;
import com.ddip.server.user.dto.response.LoginUser;
import com.ddip.server.user.repository.SignupConfirmationRepository;
import com.ddip.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final SignupConfirmationRepository signupConfirmationRepository;
    private final MailConfirmationSenderImp mailSender;

    private static final String MAIL_TITLE = "Ddip 서비스 인증번호";

    public void signup(Signup signup) throws RuntimeException {
        validateSignup(signup);

        var user = Users.builder()
                .email(signup.getEmail())
                .password(signup.getPassword())
                .nickname(signup.getNickname())
                .isConfirm(false)
                .build();

        userRepository.save(user);
        SignupConfirmation signupConfirmation = signupConfirmationRepository.save(signup.getEmail());

        mailSender.setToMail(ToMail.builder().address(signup.getEmail()).title(MAIL_TITLE).build());
        mailSender.send(signupConfirmation.getKey());
    }

    public void confirm(Confirm confirm) {
        if (!signupConfirmationRepository.findOneByEmail(confirm.getEmail()).orElseThrow()
                .equals(confirm.toSignupConfirmation())) {
            throw new RuntimeException("인증번호가 틀렸습니다");
        }
        Users user = userRepository.findByEmail(confirm.getEmail())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 email 입니다."));
        user.confirm();
    }

    public LoginUser login(Login login) {
        Users users = userRepository.findByEmail(login.getEmail())
                .orElseThrow(() -> new RuntimeException("존재하지 않는 이메일 입니다."));
        if (!users.isAvailableLogin(login)) {
            throw new RuntimeException("이메일과 비밀번호가 맞지 않거나 아직 가입인증을 하지 않았습니다.");
        }

        return users.toLoginUser();
    }

    private void validateSignup(Signup signup) throws RuntimeException {
        if (userRepository.findByEmail(signup.getEmail()).isPresent()) {
            throw new RuntimeException("이미 존재하는 이메일 입니다.");
        }

        if (userRepository.findByNickname(signup.getNickname()).isPresent()) {
            throw new RuntimeException("이미 존재하는 닉네임 입니다.");
        }
    }
}
