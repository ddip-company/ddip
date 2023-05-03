import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { formSchema } from "../util/authValidation";
import * as authApi from "../api/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [uniqueNickname, setUniqueNickname] = useState(null);
  const [checkMsg, setCheckMsg] = useState(null);
  const nicknameCheckMsg = uniqueNickname !== null;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(formSchema)
  });

  const nicknameValue = watch("nickname");
  const emailValue = watch("email");

  useEffect(() => {
    setUniqueNickname(null);
  }, [nicknameValue]);

  useEffect(() => {
    if (uniqueNickname === true) {
      setCheckMsg("사용가능한 닉네임입니다.");
    } else if (uniqueNickname === false) {
      setCheckMsg("이미 존재하는 닉네임입니다.");
    } else {
      setCheckMsg(null);
    }
  }, [uniqueNickname]);

  const duplicationHandler = () => {
    authApi
      .nicknameDuplication(nicknameValue)
      .then((res) => {
        if (res.status === 200) {
          setUniqueNickname(false);
        }
      })
      .catch((error) => {
        setUniqueNickname(true);
      });
  };

  const onSubmit = async (data) => {
    console.log(data);

    const { email, nickname, password } = data;
    try {
      const res = await authApi.signup(email, nickname, password);
      if (res.status === 200) {
        navigate("/email-auth", { state: emailValue });
      }
    } catch (error) {
      console.log(error);
    }
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <h1>회원가입</h1>
          <label htmlFor="email_id">E-Mail</label>
          <input
            name="email"
            id="email_id"
            placeholder="이메일"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
          <label htmlFor="name_id">Nick Name</label>
          <input
            type="text"
            name="nickname"
            id="name_id"
            placeholder="닉네임"
            {...register("nickname")}
          />
          {errors.nickname && <p>{errors.nickname.message}</p>}
          <button onClick={duplicationHandler}>중복</button>
          {nicknameCheckMsg && <p>{checkMsg}</p>}
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
