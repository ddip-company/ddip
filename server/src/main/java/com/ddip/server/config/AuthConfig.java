package com.ddip.server.config;

import java.util.Base64;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "jwt")
public class AuthConfig {

  private byte[] key;

  public void setKey(String key) {
    this.key = Base64.getDecoder().decode(key);
  }


  public byte[] getKey() {
    return key;
  }
}
