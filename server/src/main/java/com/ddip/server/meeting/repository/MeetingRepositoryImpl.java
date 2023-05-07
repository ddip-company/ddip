package com.ddip.server.meeting.repository;

import static com.ddip.server.meeting.domain.QMeeting.meeting;

import com.ddip.server.meeting.domain.Meeting;
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
            containsTitle(searchMeeting.getKeyword()).or(
                containsDescription(searchMeeting.getKeyword())
            ).or(
                containsCountry(searchMeeting.getKeyword())
            ).or(
                containsCity(searchMeeting.getKeyword())
            ).or(
                containsState(searchMeeting.getKeyword())
            ).or(
                containsStreet(searchMeeting.getKeyword())
            ).or(
                containsZipCode(searchMeeting.getKeyword()))
        )
        .limit(searchMeeting.getSize())
        .offset(searchMeeting.getOffset())
        .orderBy(meeting.id.desc())
        .fetch();
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

  private BooleanExpression containsCountry(String country) {
    if (StringUtils.isEmpty(country)) {
      return null;
    }
    return meeting.location.country.containsIgnoreCase(country);
  }

  private BooleanExpression containsCity(String city) {
    if (StringUtils.isEmpty(city)) {
      return null;
    }
    return meeting.location.city.containsIgnoreCase(city);
  }

  private BooleanExpression containsState(String state) {
    if (StringUtils.isEmpty(state)) {
      return null;
    }
    return meeting.location.state.containsIgnoreCase(state);
  }

  private BooleanExpression containsStreet(String street) {
    if (StringUtils.isEmpty(street)) {
      return null;
    }
    return meeting.location.street.containsIgnoreCase(street);
  }

  private BooleanExpression containsZipCode(String zipCode) {
    if (StringUtils.isEmpty(zipCode)) {
      return null;
    }
    return meeting.location.zipCode.containsIgnoreCase(zipCode);
  }

}
