package com.ddip.server.user.service;

import com.ddip.server.user.dto.external.ToMail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailConfirmationSenderImp implements ConfirmationSender {

    private final JavaMailSender mailSender;

    private static final String FROM_ADDRESS = "dltntnqo@gmail.com";

    private ToMail toMail;

    public MailConfirmationSenderImp(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void setToMail(ToMail toMail) {
        this.toMail = toMail;
    }

    @Override
    public void send(String confirmationNumber) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toMail.getAddress());
        message.setFrom(FROM_ADDRESS);
        message.setSubject(toMail.getTitle());
        message.setText("인증번호 : " + confirmationNumber);

        mailSender.send(message);
    }
}
