import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { loginFormSchema } from "../util/authValidation";
import HeadingPageContent from "./PageContent/HeadingPageContent";
import "../component/Input.css";
import "./LoginPage.css";
import Button from "../component/Button";

const LoginPage = () => {
  const authCtx = useContext(AuthContext);
  const [error, setError] = useState(null);
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
    const { email, password } = data;

    const tryCatch = {
      try() {
        navigate("/");
      },
      catch() {
        setError("이메일 또는 비밀번호를 잘못 입력하셨습니다.");
      }
    };

    authCtx.loginHandler(email, password, tryCatch);
  };

  return (
    <>
      <HeadingPageContent />
      <div className="login-container">
        <form className="login-form">
          <h1 className="login-title">로그인</h1>
          <label className="login-label" htmlFor="email_id">
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
            <p className="login-errors">{errors.email.message}</p>
          )}
          <label className="login-label" htmlFor="password_id">
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
          {error && <p className="login-errors">{error}</p>}
          <Button
            styles="blue"
            fullWidth="full-width"
            onClick={handleSubmit(onSubmit)}
          >
            로그인
          </Button>
          <Link className="signup-button" to="/signup" type="submit">
            회원가입
          </Link>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
