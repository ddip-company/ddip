import Navbar from "../component/Navbar";
import "../styles/css/GuidePage.css";

const GuidePage = () => {
  return (
    <>
      <Navbar />
      <div className="guide-container">
        <h1 className="guide-title">ddip</h1>
        <div className="guide-contents">
          <p className="guide-text">
            DDip은 핵 개인화된 사회의 니즈에 따라 사람들이 부담 없이 취미활동을
            즐길 수 있도록 돕기 위해 만들었습니다.
          </p>
          <p className="guide-text">
            복잡한 관계나 소속은 부담스럽지만 당장 오늘 저녁, 내일, 이번 주 주말
            같이 놀 사람이 필요하신 분들이 이용하기에 적합한 웹
            애플리케이션입니다.
          </p>
        </div>
        <div className="guide-contents">
          <p className="guide-text">
            개인 정보에 민감한 시대인 만큼 이름, 나이, 성별을 공개하지 않습니다.
          </p>
          <p className="guide-text">
            취미가 맞는 사람들끼리 번개로 만나서 논다는 취지에 맞게 데이팅
            앱으로 변질될 위험도를 낮추기 위해 프로필 사진은 이모지로
            대체합니다.
          </p>
          <p className="guide-text">
            누구든 바로 하고 싶은 취미활동이 생기면 번개를 만들어주세요.
          </p>
          <p className="guide-text">
            하고 싶은 번개가 보이면 참석 버튼을 눌러주세요.
          </p>
        </div>
        <div className="guide-contents">
          <p className="guide-text">
            비회원은 번개에 참석할 수 없고 상세 내용을 볼 수 없습니다.
          </p>
          <p className="guide-text">
            로그인하고 1시간 뒤에 자동 로그아웃됩니다.
          </p>
          <p className="guide-text">
            마이페이지에서 내가 참석한 번개와 내가 만든 번개를 확인할 수
            있습니다.
          </p>
          <p className="guide-text">
            {" "}
            번개를 만들 때 개인정보를 포함하는 문구는 지양해주세요.
          </p>
          <p className="guide-text">
            회원 탈퇴를 하면 참석한 정보나 만들었던 번개 정보는 모두 사라집니다.
          </p>
        </div>
      </div>
    </>
  );
};

export default GuidePage;
