package com.ddip.server.meeting.dto.request;

import com.ddip.server.meeting.domain.Location;
import lombok.Getter;

@Getter
public class Address {
  String country;
  String city;
  String state;
  String street;
  String zipCode;
  String detail;
  public Location toLocation(){
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
