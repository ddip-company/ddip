package com.ddip.server.meeting.repository;

import com.ddip.server.meeting.domain.Meeting;
import com.ddip.server.meeting.dto.request.SearchMeeting;
import java.util.List;

public interface MeetingRepositoryCustom {

  List<Meeting> search(SearchMeeting searchMeeting);
}
