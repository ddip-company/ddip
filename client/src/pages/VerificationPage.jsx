import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { emailFormSchema } from "../util/authValidation";
import { useNavigate, useLocation } from "react-router-dom";
import * as authApi from "../api/auth";

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
      console.log(res);
    } catch (error) {
      window.alert("인증번호가 올바르지 않습니다.");
      console.log(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
      }}
    >
      <form style={{ display: "flex", flexDirection: "column" }}>
        <h1>E-mail 인증</h1>
        <input
          name="authNumber"
          placeholder="인증번호"
          {...register("authNumber")}
        />
        {errors.authNumber && <p>{errors.authNumber.message}</p>}
        <button onClick={handleSubmit(handleSubmitAuthNumber)}>인증확인</button>
      </form>
    </div>
  );
}

export default VerificationPage;
