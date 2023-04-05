import React, { useState } from "react";
import Navbar from "../component/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as formSchema from "../util/authValidation";
import * as authApi from "../api/auth";

const SignUp = () => {
  const [authNumberIsOpen, setAuthNumberIsOpen] = useState(false);
  const navigate = useNavigate();

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
    const { email, nickname, password } = data;
    authApi
      .signup(email, nickname, password)
      .then((res) => {
        if (res.status === 200) {
          setAuthNumberIsOpen(true);
        }

        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmitAuthNumber = (data) => {
    const { email, authNumber } = data;
    console.log(data);
    authApi.confirmAuthNumber(email, authNumber).then((res) => {
      if (res.status === 200) navigate("/login");

      console.log(res);
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
          <h1>회원가입</h1>
          <label htmlFor="email_id">E-Mail</label>
          <input
            name="email"
            id="email_id"
            placeholder="이메일"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
          {authNumberIsOpen && (
            <div>
              <input
                name="authNumber"
                placeholder="인증번호"
                {...register("authNumber")}
              />
              <button onClick={handleSubmit(handleSubmitAuthNumber)}>
                인증확인
              </button>
            </div>
          )}
          <label htmlFor="name_id">Nick Name</label>
          <input
            type="text"
            name="nickname"
            id="name_id"
            placeholder="닉네임"
            {...register("nickname")}
          />
          {errors.nickname && <p>{errors.nickname.message}</p>}
          <label htmlFor="password_id">Password</label>
          <input
            type="password"
            name="password"
            id="password_id"
            placeholder="비밀번호"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
          <label htmlFor="confirm_id">Password Confirm</label>
          <input
            type="password"
            name="passwordConfirm"
            id="confirm_id"
            placeholder="비밀번호 확인"
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && <p>{errors.passwordConfirm.message}</p>}
          <br />
          <button onClick={handleSubmit(onSubmit)} type="submit">
            가입하기
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
