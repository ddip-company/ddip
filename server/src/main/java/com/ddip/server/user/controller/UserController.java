package com.ddip.server.user.controller;

import com.ddip.server.config.UserSession;
import com.ddip.server.user.dto.request.UpdateUser;
import com.ddip.server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PatchMapping
    public void update(
            UserSession userSession,
            @RequestBody UpdateUser updateUser
    ) {
        userService.update(userSession, updateUser);
    }

}
