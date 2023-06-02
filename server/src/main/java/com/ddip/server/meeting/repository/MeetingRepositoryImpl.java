package com.ddip.server.meeting.repository;

import static com.ddip.server.meeting.domain.QMeeting.meeting;

import com.ddip.server.meeting.domain.Meeting;
import com.ddip.server.meeting.dto.request.Address;
import com.ddip.server.meeting.dto.request.SearchMeeting;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;

@RequiredArgsConstructor
public class MeetingRepositoryImpl implements MeetingRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<Meeting> search(SearchMeeting searchMeeting) {
        return jpaQueryFactory
                .selectFrom(meeting)
                .where(
                        containsTitle(searchMeeting.getKeyword()).or(containsDescription(searchMeeting.getKeyword())),
                        eqCountry(searchMeeting.getAddress().getCountry()),
                        eqCity(searchMeeting.getAddress().getCity()),
                        eqState(searchMeeting.getAddress().getState()),
                        eqStreet(searchMeeting.getAddress().getStreet()),
                        eqZipCode(searchMeeting.getAddress().getZipCode())
                )
                .limit(searchMeeting.getSize())
                .offset(searchMeeting.getOffset())
                .orderBy(meeting.id.desc())
                .fetch();
    }

    private BooleanExpression containsLocation(Address address) {
        if (address == null) {
            return null;
        }
        return eqCountry(address.getCountry())
                .and(eqCity(address.getCity()))
                .and(eqState(address.getState()))
                .and(eqStreet(address.getStreet()))
                .and(eqZipCode(address.getZipCode()));
    }

    private BooleanExpression containsTitle(String title) {
        if (StringUtils.isEmpty(title)) {
            return null;
        }
        return meeting.title.containsIgnoreCase(title);
    }

    private BooleanExpression containsDescription(String description) {
        if (StringUtils.isEmpty(description)) {
            return null;
        }
        return meeting.description.containsIgnoreCase(description);
    }

    private BooleanExpression eqCountry(String country) {
        if (StringUtils.isEmpty(country)) {
            return null;
        }
        return meeting.location.country.eq(country);
    }

    private BooleanExpression eqCity(String city) {
        if (StringUtils.isEmpty(city)) {
            return null;
        }
        return meeting.location.city.eq(city);
    }

    private BooleanExpression eqState(String state) {
        if (StringUtils.isEmpty(state)) {
            return null;
        }
        return meeting.location.state.eq(state);
    }

    private BooleanExpression eqStreet(String street) {
        if (StringUtils.isEmpty(street)) {
            return null;
        }
        return meeting.location.street.eq(street);
    }

    private BooleanExpression eqZipCode(String zipCode) {
        if (StringUtils.isEmpty(zipCode)) {
            return null;
        }
        return meeting.location.zipCode.eq(zipCode);
    }

}
