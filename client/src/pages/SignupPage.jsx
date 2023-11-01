import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { formSchema } from "../util/authValidation";
import * as authApi from "../api/auth";
import { emojiList } from "../static/dummy/emojiList";
import HeadingPageContent from "./PageContent/HeadingPageContent";
import "../styles/css/SignupPage.css";
import Button from "../component/Button";
import Input from "../component/Input";

const getRandomEmoji = () => {
  const randomIndex = Math.floor(Math.random() * emojiList.length);
  return emojiList[randomIndex];
};

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
    const emoji = getRandomEmoji();
    const { email, nickname, password } = data;

    try {
      const res = await authApi.signup(email, nickname, password, emoji);
      if (res.status === 200) {
        navigate("/email-auth", { state: emailValue });
      }
    } catch (error) {
      console.log("Signup failed:", error);
    }
  };

  return (
    <>
      <HeadingPageContent />

      <section className="signup-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="signup-form"
        >
          <h1 className="signup-title">회원가입</h1>
          <Input
            label="E-Mail"
            name="email"
            id="email_id"
            placeholder="이메일을 입력하세요."
            register={register}
            errors={errors.email}
          />
          <Input
            label="Nick Name"
            name="nickname"
            id="name_id"
            placeholder="닉네임을 입력하세요."
            register={register}
            errors={errors.nickname}
          />
          <Button
            styles="lightblue"
            fullWidth="full-width"
            onClick={duplicationHandler}
          >
            닉네임 중복검사
          </Button>
          {nicknameCheckMsg && <p className="signup-errors">{checkMsg}</p>}
          <div className="signupPassword-container">
            <Input
              label="Password"
              name="password"
              id="password_id"
              type="password"
              placeholder="비밀번호를 입력하세요."
              register={register}
              errors={errors.password}
            />
            <Input
              label="Password Confirm"
              name="passwordConfirm"
              id="confirm_id"
              type="password"
              placeholder="비밀번호를 한번 더 입력하세요."
              register={register}
              errors={errors.passwordConfirm}
            />
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
      </section>
    </>
  );
};

export default SignUp;
