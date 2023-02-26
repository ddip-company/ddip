package com.ddip.server.user.service;

import org.springframework.stereotype.Service;

@Service
public interface ConfirmationSender {
    void send(String confirmationNumber);
}
