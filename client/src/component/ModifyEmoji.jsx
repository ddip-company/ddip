import Button from "./UI/Button";

function ModifyEmoji({ emoji, onRandomClick, onEmojiChangeClick }) {
  return (
    <>
      <Button styles="lightblue" fullWidth="full-width" onClick={onRandomClick}>
        랜덤체인지
      </Button>

      <Button styles="blue" fullWidth="full-width" onClick={onEmojiChangeClick}>
        이모지 변경하기
      </Button>
    </>
  );
}

export default ModifyEmoji;
