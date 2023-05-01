package com.ddip.server.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Configuration
@RequiredArgsConstructor
public class AuthResolver implements HandlerMethodArgumentResolver {

  private final AuthConfig authConfig;

  @Override
  public boolean supportsParameter(MethodParameter parameter) {
    return parameter.getParameterType().equals(UserSession.class);
  }

  @Override
  public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
      NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {

    String jws = webRequest.getHeader("Authorization");
    if (jws == null || jws.equals("")) {
      throw new RuntimeException("Authorization header is not exist");
    }

    String token = jws.substring(7);

    try {
      Jws<Claims> claims = Jwts.parserBuilder()
          .setSigningKey(authConfig.getKey())
          .build()
          .parseClaimsJws(token);
      String userId = claims.getBody().getSubject();
      return new UserSession(Long.parseLong(userId));
    } catch (JwtException e) {
      throw new RuntimeException("token이 잘못됐습니다");
    }

  }

}
