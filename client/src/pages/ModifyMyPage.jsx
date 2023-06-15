import Button from "../component/Button";
import { useNavigate } from "react-router-dom";

function ModifyMypage() {
  const navigate = useNavigate();
  return (
    <>
      <Button onClick={() => navigate("/withdraw")}>회원 탈퇴</Button>
    </>
  );
}

export default ModifyMypage;
