package com.ddip.server.meeting.dto.request;

import com.ddip.server.meeting.domain.Location;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class Address {

    String country;
    String city;
    String state;
    String street;
    String zipCode;
    String detail;

    @Builder
    public Address(String country, String city, String state, String street, String zipCode, String detail) {
        this.country = country;
        this.city = city;
        this.state = state;
        this.street = street;
        this.zipCode = zipCode;
        this.detail = detail;
    }

    public Location toLocation() {
        return Location.builder()
                .country(country)
                .city(city)
                .state(state)
                .street(street)
                .zipCode(zipCode)
                .detail(detail)
                .build();
    }
}
