package com.ddip.server.user.service;

import com.ddip.server.config.UserSession;
import com.ddip.server.user.domain.Users;
import com.ddip.server.user.dto.request.UpdateUser;
import com.ddip.server.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void update(UserSession userSession, UpdateUser updateUser) {
        Users user = userRepository.findById(userSession.getId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
        user.update(updateUser.nickname(), updateUser.emoji(), updateUser.password());
    }
}
