import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "../util/authValidation";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";
import HeadingPageContent from "./PageContent/HeadingPageContent";
import "../styles/css/Withdraw.css";
import "../styles/css/Input.css";
import Button from "../component/Button";

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
      <HeadingPageContent />

      <section className="withdraw-container">
        <form className="withdraw-form">
          <h1 className="withdraw-title">회원 탈퇴</h1>
          <label className="withdraw-label" htmlFor="email_id">
            E-Mail
          </label>
          <input
            className="authInput"
            name="email"
            id="email_id"
            placeholder="이메일을 입력하세요."
            {...register("email")}
          />
          {errors.email && (
            <p className="withdraw-errors">{errors.email.message}</p>
          )}
          <label className="withdraw-label" htmlFor="password_id">
            Password
          </label>
          <input
            className="authInput"
            type="password"
            name="password"
            id="password_id"
            placeholder="비밀번호를 입력하세요."
            {...register("password")}
          />
          <p className="withdraw-errors">
            탈퇴 시 등록된 정보를 복구할 수 없습니다.
          </p>
          <div className="button-container">
            <Button
              type="button"
              styles="gray"
              fullWidth="full-width"
              onClick={() => navigate(-1)}
            >
              돌아가기
            </Button>
            <Button
              styles="blue"
              fullWidth="full-width"
              onClick={handleSubmit(onSubmit)}
            >
              탈퇴하기
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Withdraw;
