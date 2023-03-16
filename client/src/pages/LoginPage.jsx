import Navbar from "../component/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const formSchema = yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다."),
    password: yup.string()
  });
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema)
  });

  const onSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    axios({
      method: "post",
      url: "/auth/login",
      data: {
        email,
        password
      }
    })
      .then((res) => {
        localStorage.setItem("token", res.data.jwt);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem("expiration", expiration.toISOString());
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError("이메일 또는 비밀번호를 잘못 입력하셨습니다.");
      });
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
          <Link to="/signUp" type="submit">
            회원가입
          </Link>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
