import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { formSchema } from "../util/authValidation";
import * as authApi from "../api/auth";
import HeadingPageContent from "./PageContent/HeadingPageContent";
import "./SignupPage.css";
import "../component/Input.css";
import Button from "../component/Button";

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
      <HeadingPageContent />

      <div className="signup-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="signup-form"
        >
          <h1 className="signup-title">회원가입</h1>
          <label className="signup-label" htmlFor="email_id">
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
            <p className="signup-errors">{errors.email.message}</p>
          )}
          <label className="signup-label" htmlFor="name_id">
            Nick Name
          </label>
          <input
            className="authInput"
            type="text"
            name="nickname"
            id="name_id"
            placeholder="닉네임을 입력하세요."
            {...register("nickname")}
          />
          {errors.nickname && (
            <p className="signup-errors">{errors.nickname.message}</p>
          )}
          <Button
            styles="lightblue"
            fullWidth="full-width"
            onClick={duplicationHandler}
          >
            닉네임 중복검사
          </Button>
          {nicknameCheckMsg && <p className="signup-errors">{checkMsg}</p>}
          <div className="signupPassword-container">
            <label className="signup-label" htmlFor="password_id">
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
            {errors.password && (
              <p className="signup-errors">{errors.password.message}</p>
            )}
            <label className="signup-label" htmlFor="confirm_id">
              Password Confirm
            </label>
            <input
              className="authInput"
              type="password"
              name="passwordConfirm"
              id="confirm_id"
              placeholder="비밀번호를 한번 더 입력하세요."
              {...register("passwordConfirm")}
            />
            {errors.passwordConfirm && (
              <p className="signup-errors">{errors.passwordConfirm.message}</p>
            )}
          </div>
          <Button
            styles="blue"
            fullWidth="full-width"
            onClick={handleSubmit(onSubmit)}
            type="submit"
          >
            가입하기
          </Button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
