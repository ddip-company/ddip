package com.ddip.server.meeting.domain;

import jakarta.persistence.Embeddable;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Embeddable
@NoArgsConstructor
public class Location {

    // 한국
    String country;
    // 서울
    String city;
    // 성동구
    String state;
    // 성수일로 12가길 , 20
    String street;
    // 04792
    String zipCode;
    String detail;

    @Builder
    public Location(String country, String city, String state, String street, String zipCode,
            String detail) {
        this.country = country;
        this.city = city;
        this.state = state;
        this.street = street;
        this.zipCode = zipCode;
        this.detail = detail;
    }

    public com.ddip.server.meeting.dto.response.Location toResponse() {
        return new com.ddip.server.meeting.dto.response.Location(country, city, state, street, zipCode, detail);
    }
}
