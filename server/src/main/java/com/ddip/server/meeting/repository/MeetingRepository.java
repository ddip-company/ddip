package com.ddip.server.meeting.repository;

import com.ddip.server.meeting.domain.Meeting;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface MeetingRepository extends CrudRepository<Meeting, Long> {

  List<Meeting> findAll();
}
