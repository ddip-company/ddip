import Navbar from "../component/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { loginFormSchema } from "../util/authValidation";

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
      <Navbar />
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
          <h1>로그인</h1>
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
          <br />
          {error && <p>{error}</p>}
          <button onClick={handleSubmit(onSubmit)} type="submit">
            로그인
          </button>
          <br />
          <Link to="/signup" type="submit">
            회원가입
          </Link>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
