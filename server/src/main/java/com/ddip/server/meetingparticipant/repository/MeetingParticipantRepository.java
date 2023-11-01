package com.ddip.server.meetingparticipant.repository;

import com.ddip.server.meetingparticipant.domain.MeetingParticipant;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingParticipantRepository extends CrudRepository<MeetingParticipant, Long> {

}
