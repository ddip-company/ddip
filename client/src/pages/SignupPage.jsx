import React, { useState } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [authNumberIsOpen, setAuthNumberIsOpen] = useState(false);
  const navigate = useNavigate();
  const formSchema = yup.object({
    email: yup
      .string()
      .required("이메일을 입력해주세요")
      .email("이메일 형식이 아닙니다."),
    nickname: yup
      .string()
      .min(2, "닉네임은 최소 2글자 이상입니다!")
      .max(10, "닉네임은 최대 10글자입니다!")
      .matches(
        /^[가-힣a-zA-Z][^!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?\s]*$/,
        "닉네임에 특수문자가 포함되면 안되고 숫자로 시작하면 안됩니다!"
      ),
    password: yup
      .string()
      .required("영문, 숫자포함 8자리를 입력해주세요.")
      .min(8, "최소 8자 이상 가능합니다")
      .max(15, "최대 15자 까지만 가능합니다")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
        "영문 숫자포함 8자리를 입력해주세요."
      ),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
    authNumber: yup.string().min(5, "인증번호는 최소 5글자 이상입니다!")
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
    const { email, nickname, password } = data;
    axios({
      method: "post",
      url: "/auth/signup",
      data: {
        email,
        nickname,
        password
      }
    })
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
    axios({
      method: "patch",
      url: "/auth/confirm",
      data: {
        email,
        authNumber
      }
    }).then((res) => {
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
