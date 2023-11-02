import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useLocation } from "react-router-dom";
import { numberOptionList, timeOptionList } from "../../static/dummy/dropdown";
import * as bungaeInfoUtils from "../../util/cardFunction";
import Button from "../UI/Button";
import useDropdown from "../../hooks/useDropdown";
import InputWithLabel from "../UI/InputWithLabel";
import MeetingLocation from "../MeetingLocation";
import useInputWithValidation from "../../hooks/useInputWithValidation";
import MapModal from "./MapModal";
import "../../styles/css/BungaeCreatePage.css";
import InputWithText from "../UI/InputWithText";
import Dropdown from "../UI/Dropdown";
import * as authApi from "../../api/auth";

function BungaeCreate({ bungaeDetail, isEditModeProp }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = isEditModeProp || location.pathname === "/edit-bungae";
  const {
    initialNumberOfRecruits,
    initialMeetingTime,
    initialMeetingLocation,
    initialOpenChat,
    initialIntroduction
  } = bungaeInfoUtils.getInitialBungaeState(bungaeDetail);

  const {
    ref: numberDropdownRef,
    isOpen: isNumberDropdownOpen,
    selected: selectedNumberOption,
    handleToggleDropdown: handleToggleNumberDropdown,
    handleSelectOption: handleSelectNumberOption
  } = useDropdown(initialNumberOfRecruits);

  const {
    ref: timeDropdownRef,
    isOpen: isTimeDropdownOpen,
    selected: selectedTimeOption,
    handleToggleDropdown: handleToggleTimeDropdown,
    handleSelectOption: handleSelectTimeOption
  } = useDropdown(initialMeetingTime);

  const [isMapOpen, setIsMapOpen] = useState(false);
  const [meetingLocation, setMeetingLocation] = useState(
    initialMeetingLocation
  );
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    // bungaeDetail에 meetingAt 값이 있으면 해당 값을 selectedDate에 설정
    if (bungaeDetail && bungaeDetail.meetingAt) {
      setSelectedDate(new Date(bungaeDetail.meetingAt));
    }
  }, [bungaeDetail]);

  const { value: openChat, handleChangeInput: handleChangeOpenChat } =
    useInputWithValidation(null, initialOpenChat);
  const { value: introduction, handleChangeInput: handleChangeIntroduction } =
    useInputWithValidation(null, initialIntroduction);

  const handleOpenMap = () => {
    setIsMapOpen(true);
  };
  const handleSelectAddress = (address) => {
    setMeetingLocation(address);
    setIsMapOpen(false);
  };

  const token = localStorage.getItem("token");

  const handleSubmitBungae = async () => {
    const [city, state, street, zipCode] = meetingLocation.split(" ");
    const selectedTime = selectedTimeOption.value;
    const koreaTimeOffset = 9 * 60;
    const selectedDateISO = selectedDate
      ? new Date(selectedDate.getTime() + koreaTimeOffset * 60000).toISOString()
      : "";

    const MeetingRequest = {
      title: introduction.title,
      description: introduction.description,
      address: {
        city: city,
        state: state,
        street: street,
        zipCode: zipCode,
        detail: introduction.detail
      },
      meetingAt: `${selectedDateISO.slice(0, 10)}T${selectedTime}`,

      openChat: openChat,
      numberOfRecruits: selectedNumberOption.value
    };

    try {
      if (isEditMode) {
        const res = await authApi.bungaeUpdate(
          bungaeDetail.id,
          MeetingRequest,
          token
        );
        console.log("수정 성공", res.data);
        navigate(`/bungae-detail/${bungaeDetail.id}`);
      } else {
        const res = await authApi.bungaeCreate(MeetingRequest, token);
        console.log("등록 성공", res.data);
        const createdId = res.data.id;
        navigate(`/bungae-detail/${createdId}`);
      }
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  return (
    <>
      <MapModal
        isMapOpen={isMapOpen}
        handleCloseMap={() => setIsMapOpen(false)}
        handleSelectAddress={handleSelectAddress}
      />
      <div className="dropdown-container">
        <Dropdown
          label="모집 인원"
          ref={numberDropdownRef}
          isOpen={isNumberDropdownOpen}
          selected={selectedNumberOption}
          onToggle={handleToggleNumberDropdown}
          onSelect={handleSelectNumberOption}
          options={numberOptionList}
        />
        <Dropdown
          label="모임 시간"
          ref={timeDropdownRef}
          isOpen={isTimeDropdownOpen}
          selected={selectedTimeOption}
          onToggle={handleToggleTimeDropdown}
          onSelect={handleSelectTimeOption}
          options={timeOptionList}
        />
        <div className="pickerContainer">
          <div className="pickerLabel">모임 날짜</div>
          <DatePicker
            className="datePicker"
            placeholderText="달력에서 날짜를 지정해주세요"
            dateFormat="yyyy.MM.dd"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
          />
        </div>
      </div>
      <div className="margin-wrapper">
        <MeetingLocation
          meetingLocation={meetingLocation}
          handleOpenMap={handleOpenMap}
        />
      </div>
      <div className="narrow-margin-wrapper">
        <InputWithLabel
          label="상세주소"
          id="create-bungae-address"
          name="detail"
          placeholder="상세주소를 입력해주세요"
          value={introduction.detail}
          onChange={handleChangeIntroduction}
          autoComplete="off"
        />
      </div>
      <div className="margin-wrapper">
        <InputWithLabel
          label="카카오톡 오픈채팅"
          id="kakao-link"
          placeholder="오픈 카톡방 링크"
          value={openChat}
          onChange={handleChangeOpenChat}
          autoComplete="off"
        />
      </div>
      <div className="narrow-margin-wrapper">
        <InputWithLabel
          label="제목"
          id="create-bungae-title"
          name="title"
          placeholder="제목을 입력해주세요"
          value={introduction.title}
          onChange={handleChangeIntroduction}
          autoComplete="on"
        />
      </div>
      <div className="narrow-margin-wrapper">
        <InputWithText
          name="description"
          placeholder="번개 모임에 대해 소개해주세요"
          value={introduction.description}
          onChange={handleChangeIntroduction}
          autoComplete="off"
        />
      </div>
      <div className="button-container">
        <Button
          styles="gray"
          fullWidth="fullWidth"
          outline="outline"
          onClick={() => navigate(-1)}
        >
          취소
        </Button>
        <Button
          styles="lightblue"
          fullWidth="fullWidth"
          onClick={handleSubmitBungae}
        >
          {isEditMode ? "번개 수정" : "번개 등록"}
        </Button>
      </div>
    </>
  );
}

export default BungaeCreate;
