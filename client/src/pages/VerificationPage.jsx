import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailFormSchema } from "../util/authValidation";
import { useNavigate, useLocation } from "react-router-dom";
import * as authApi from "../api/auth";
import "../styles/css/Input.css";
import Button from "../component/UI/Button";
import "../styles/css/VerificationPage.css";

function VerificationPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(emailFormSchema)
  });

  const handleSubmitAuthNumber = async (data) => {
    const { authNumber } = data;
    try {
      const res = await authApi.confirmAuthNumber(email, authNumber);
      if (res.status === 200) {
        window.alert("회원가입이 완료되었습니다.");
        navigate("/login");
      }
    } catch (error) {
      window.alert("인증번호가 올바르지 않습니다.");
      console.log(error);
    }
  };
  return (
    <section className="verification-container">
      <form className="verification-form">
        <h1 className="verification-title">E-mail 인증</h1>
        <p className="verification-p">
          이메일이 인증되어야 회원가입이 완료됩니다.
        </p>
        <input
          className="authInput"
          name="authNumber"
          placeholder="이메일로 전송 받은 인증번호를 입력하세요."
          {...register("authNumber")}
        />
        {errors.authNumber && (
          <p className="verification-errors">{errors.authNumber.message}</p>
        )}
        <Button
          styles="blue"
          fullWidth="full-width"
          onClick={handleSubmit(handleSubmitAuthNumber)}
        >
          인증확인
        </Button>
      </form>
    </section>
  );
}

export default VerificationPage;
