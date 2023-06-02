package com.ddip.server.meeting.dto.request;

import static java.lang.Math.max;
import static java.lang.Math.min;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchMeeting {

    private static final int MAX_SIZE = 2000;
    @Builder.Default
    private Integer page = 1;
    @Builder.Default
    private Integer size = 10;
    private String keyword;
    private String country;
    private String city;
    private String state;
    private String street;
    private String zipCode;
    private String detail;

    public long getOffset() {
        return (long) (max(1, page) - 1) * min(size, MAX_SIZE);
    }

    public Address getAddress() {
        return Address.builder()
                .country(country)
                .city(city)
                .state(state)
                .street(street)
                .zipCode(zipCode)
                .detail(detail)
                .build();
    }
}
