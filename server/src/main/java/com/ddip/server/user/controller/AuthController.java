package com.ddip.server.user.controller;

import com.ddip.server.user.dto.request.Confirm;
import com.ddip.server.user.dto.request.Login;
import com.ddip.server.user.dto.request.Signup;
import com.ddip.server.user.dto.request.Withdraw;
import com.ddip.server.user.dto.response.LoginUser;
import com.ddip.server.user.dto.response.User;
import com.ddip.server.user.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @GetMapping("/users")
    public ResponseEntity<User> getUserByNickname(@RequestParam String nickname) {
        return ResponseEntity.ok().body(authService.findUserByNickname(nickname));
    }

    @PostMapping("/signup")
    public void signup(@RequestBody @Valid Signup signup) {
        authService.signup(signup);
    }

    @PatchMapping("/confirm")
    public void confirm(@RequestBody @Valid Confirm confirm) {
        authService.confirm(confirm);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginUser> login(@RequestBody @Valid Login login) {
        return ResponseEntity.ok().body(authService.login(login));
    }

    @DeleteMapping("/withdraw")
    public void login(
//        @RequestHeader("Authorization") String token,
        @RequestBody @Valid Withdraw withdraw) {
//        if(token.replace("Bearer ", "").equals(withdraw.getEmail())) {
//            throw new RuntimeException("token is not valid");
//        }
        authService.withdraw(withdraw);
    }
}
