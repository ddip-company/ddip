package com.ddip.server.meeting.service;

import com.ddip.server.config.UserSession;
import com.ddip.server.meeting.domain.Meeting;
import com.ddip.server.meeting.dto.request.CreateMeeting;
import com.ddip.server.meeting.dto.response.MeetingResponse;
import com.ddip.server.meeting.repository.MeetingRepository;
import com.ddip.server.user.domain.Users;
import com.ddip.server.user.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MeetingService {

  private final MeetingRepository meetingRepository;
  private final UserRepository userRepository;

  @Transactional
  public void createMeeting(UserSession userSession, CreateMeeting request) {
    Users owner = userRepository.findById(userSession.getId())
        .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다."));
    meetingRepository.save(request.toMeeting(owner));
  }

  @Transactional
  public List<MeetingResponse> getMeetings() {
    List<Meeting> meetings = meetingRepository.findAll();
    return meetings.stream().map(Meeting::toMeetingResponse).collect(Collectors.toList());
  }
}
