package com.ddip.server.meeting.dto.response;

public record Location(String country, String city, String state, String street, String zipCode,
                       String detail) {

}
