package com.ddip.server.meeting.controller;

import com.ddip.server.config.UserSession;
import com.ddip.server.meeting.dto.request.CreateMeeting;
import com.ddip.server.meeting.dto.response.MeetingResponse;
import com.ddip.server.meeting.service.MeetingService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/meeting")
@RequiredArgsConstructor
public class MeetingController {

  private final MeetingService meetingService;

  @PostMapping
  public void createMeeting(
      @RequestBody @Valid CreateMeeting createMeeting,
      UserSession userSession) {
    meetingService.createMeeting(userSession, createMeeting);
  }

  @GetMapping
  public ResponseEntity<List<MeetingResponse>> getMeetings() {
    return ResponseEntity.ok().body(meetingService.getMeetings());
  }
}
