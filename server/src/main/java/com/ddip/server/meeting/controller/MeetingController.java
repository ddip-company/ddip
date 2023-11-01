package com.ddip.server.meeting.controller;

import com.ddip.server.config.UserSession;
import com.ddip.server.meeting.dto.request.CreateMeeting;
import com.ddip.server.meeting.dto.request.SearchMeeting;
import com.ddip.server.meeting.dto.request.UpdateMeeting;
import com.ddip.server.meeting.dto.response.MeetingResponse;
import com.ddip.server.meeting.service.MeetingService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/meetings")
@RequiredArgsConstructor
public class MeetingController {

  private final MeetingService meetingService;

  @PostMapping
  public ResponseEntity<MeetingResponse> createMeeting(
      @RequestBody @Valid CreateMeeting createMeeting,
      UserSession userSession) {
    return ResponseEntity.ok().body(meetingService.createMeeting(userSession, createMeeting));
  }

  @GetMapping
  public ResponseEntity<List<MeetingResponse>> getMeetings() {
    return ResponseEntity.ok().body(meetingService.getMeetings());
  }

  @GetMapping("/{id}")
  public ResponseEntity<MeetingResponse> getMeeting(@PathVariable Long id) {
    return ResponseEntity.ok().body(meetingService.getMeeting(id));
  }

  @GetMapping("/search")
  public ResponseEntity<List<MeetingResponse>> searchMeetings(
      @ModelAttribute SearchMeeting searchMeeting) {
    return ResponseEntity.ok().body(meetingService.searchMeetings(searchMeeting));
  }

  @PutMapping("/{id}")
  public void updateMeeting(
      @PathVariable Long id,
      @RequestBody @Valid UpdateMeeting updateMeeting,
      UserSession userSession
  ) {
    meetingService.updateMeeting(userSession, id, updateMeeting);
  }

  @PostMapping("/{id}/participate")
  public void participate(
      @PathVariable Long id,
      UserSession userSession) {
    meetingService.participate(userSession, id);
  }

  @PostMapping("/{id}/leave")
  public void leave(
      @PathVariable Long id,
      UserSession userSession) {
    meetingService.leave(userSession, id);
  }

  @DeleteMapping("/{id}")
  public void deleteMeeting(@PathVariable Long id, UserSession userSession) {
    meetingService.deleteMeeting(userSession, id);
  }

}
