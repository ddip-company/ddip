import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "../util/authValidation";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";

function Withdraw() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginFormSchema)
  });

  const onSubmit = (data) => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      const { email, password } = data;

      const tryCatch = {
        try() {
          navigate("/");
        },
        catch() {
          window.alert("비밀번호를 다시 확인해 주세요.");
        }
      };
      authCtx.withdrawHandler(email, password, tryCatch);
    }
  };
  return (
    <>
      <h1>회원 탈퇴</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "20vh"
        }}
      >
        <form style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="email_id">E-Mail</label>
          <input
            name="email"
            id="email_id"
            placeholder="이메일"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <label htmlFor="password_id">Password</label>
          <input
            type="password"
            name="password"
            id="password_id"
            placeholder="비밀번호"
            {...register("password")}
          />
        </form>
      </div>
      <p>탈퇴 시 등록된 정보를 복구할 수 없습니다.</p>
      <div>
        <button onClick={() => navigate(-1)}>돌아가기</button>
        <button onClick={handleSubmit(onSubmit)} type="submit">
          탈퇴 하기
        </button>
      </div>
    </>
  );
}

export default Withdraw;
