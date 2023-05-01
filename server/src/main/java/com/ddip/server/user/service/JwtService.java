package com.ddip.server.user.service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

  private static String jwtKey = "rTPmA9Sgk+Q1XwuJbG7E6xFFUhQpdi+al5iyPnRTK/Q=";

  public static String buildJwt(Long id) {

    SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(jwtKey));

    return Jwts.builder()
        .setSubject(Long.toString(id))
        .signWith(key)
        .setIssuedAt(new Date())
        .setExpiration(
            Date.from(
                LocalDate.now().plusMonths(1).atStartOfDay(ZoneId.systemDefault()).toInstant()))
        .compact();
  }

  public static String getEmailFromJwt(String jwt) {
    SecretKey key = Keys.hmacShaKeyFor(Base64.getDecoder().decode(jwtKey));
    return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody()
        .getSubject();
  }
}
