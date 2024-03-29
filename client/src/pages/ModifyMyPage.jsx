import Button from "../component/UI/Button";
import { useNavigate } from "react-router-dom";
import HeadingPageContent from "./PageContent/HeadingPageContent";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { modifyMyPageFormSchema } from "../util/authValidation";
import * as authApi from "../api/auth";
import React, { useEffect, useState } from "react";
import Input from "../component/UI/Input";
import * as authAction from "../util/authAction";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";
import ModifyEmoji from "../component/ModifyEmoji";

function ModifyMyPage() {
  const { userInfo, updateUserInfo } = useContext(AuthContext);
  const [emoji, setEmoji] = useState(userInfo ? userInfo.emoji : "");
  const handleClickRandomEmoji = () => {
    const randomEmoji = authAction.getRandomEmoji();
    setEmoji(randomEmoji);
  };
  const navigate = useNavigate();
  const [uniqueNickname, setUniqueNickname] = useState(null);
  const [checkMsg, setCheckMsg] = useState(null);
  const nicknameCheckMsg = uniqueNickname !== null;
  const {
    register,
    watch,
    formState: { errors }
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(modifyMyPageFormSchema)
  });

  const nicknameValue = watch("nickname");
  const newPasswordValue = watch("password");
  const emojiValue = emoji;

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
    console.log("duplicationHandler is called");
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

  const token = localStorage.getItem("token");

  const modifyEmojiHandler = async () => {
    try {
      const res = await authApi.updateUser({ emoji: emojiValue }, token);
      if (res.status === 200) {
        const updatedInfo = { ...userInfo, emoji: emojiValue };
        updateUserInfo(updatedInfo);
        console.log("이모지 변경이 완료되었습니다.");
        navigate(`/mypage/${userInfo.nickname}`);
      }
    } catch (error) {
      console.error("이모지 변경 에러:", error);
    }
  };

  const nicknameChangeHandler = async () => {
    try {
      const res = await authApi.updateUser({ nickname: nicknameValue }, token);
      if (res.status === 200) {
        const updatedInfo = { ...userInfo, nickname: nicknameValue };
        updateUserInfo(updatedInfo);
        console.log("닉네임 변경이 완료되었습니다.");

        navigate(`/mypage/${nicknameValue}`);
      }
    } catch (error) {
      console.error("닉네임 변경 에러:", error);
    }
  };

  const changePasswordHandler = async () => {
    try {
      const res = await authApi.updateUser(
        { password: newPasswordValue },
        token
      );
      if (res.status === 200) {
        const updatedInfo = { ...userInfo, password: newPasswordValue };
        updateUserInfo(updatedInfo);
        console.log("비밀번호 변경이 완료되었습니다.");
        navigate(`/mypage/${userInfo.nickname}`);
      }
    } catch (error) {
      console.error("비밀번호 변경 에러:", error);
    }
  };

  return (
    <>
      <HeadingPageContent />
      <section className="mypage-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="mypage-form"
        >
          <h1 className="mypage-title">프로필 수정</h1>
          <div className="mypage-emoji">{emoji}</div>
          <p className="mypage-label">{userInfo.nickname}</p>
          <div className="signupPassword-container">
            <ModifyEmoji
              emoji={emoji}
              onRandomClick={handleClickRandomEmoji}
              onEmojiChangeClick={modifyEmojiHandler}
            />
          </div>
          <div className="signupPassword-container">
            <Input
              label="New Nick Name"
              name="nickname"
              id="name_id"
              placeholder="새 닉네임을 입력하세요."
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
            <Button
              styles="blue"
              fullWidth="full-width"
              onClick={() => {
                nicknameChangeHandler();
              }}
            >
              닉네임 변경하기
            </Button>
            {nicknameCheckMsg && <p className="signup-errors">{checkMsg}</p>}
          </div>
          <div className="signupPassword-container">
            <Input
              label="New Password"
              name="password"
              id="password_id"
              type="password"
              placeholder="새 비밀번호를 입력하세요."
              register={register}
              errors={errors.password}
            />
            <Input
              label="New Password Confirm"
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
            onClick={() => {
              changePasswordHandler();
            }}
          >
            비밀번호 변경하기
          </Button>
          <Button
            styles="gray"
            fullWidth="full-width"
            onClick={() => navigate("/withdraw")}
            type="button"
          >
            회원 탈퇴
          </Button>
        </form>
      </section>
    </>
  );
}

export default ModifyMyPage;
