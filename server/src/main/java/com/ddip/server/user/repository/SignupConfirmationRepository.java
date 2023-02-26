package com.ddip.server.user.repository;

import com.ddip.server.user.domain.SignupConfirmation;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
@RequiredArgsConstructor
public class SignupConfirmationRepository {
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper mapper = new ObjectMapper();


    public SignupConfirmation save(String email) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        SignupConfirmation signupConfirmation = SignupConfirmation.builder().key(UUID.randomUUID().toString()).build();
        valueOperations.set(email, signupConfirmation);

        return signupConfirmation;
    }

    public Optional<SignupConfirmation> findOneByEmail(String email) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        SignupConfirmation signupConfirmation = null;
        try {
            signupConfirmation = mapper.convertValue(valueOperations.get(email), SignupConfirmation.class);
        } catch (Exception exception) {
        }
        return Optional.ofNullable(signupConfirmation);
    }
}
