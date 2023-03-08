package com.ddip.server.user.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    private static String jwtKey;

    @Value("${jwt.key}")
    public void setJwtKey(String value) {
        jwtKey = value;
    }

    public static String buildJwt(String email) {

        SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(jwtKey));

        return Jwts.builder()
                .setSubject(email)
                .signWith(key)
                .setIssuedAt(new Date())
                .setExpiration(
                        Date.from(LocalDate.now().plusMonths(1).atStartOfDay(ZoneId.systemDefault()).toInstant()))
                .compact();
    }
}
