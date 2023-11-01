import Button from "../component/Button";

function ModifyEmoji({
  emoji,
  handleClickRandomEmoji,
  handleClickChangeEmoji
}) {
  return (
    <>
      <Button
        styles="lightblue"
        fullWidth="full-width"
        onClick={handleClickRandomEmoji}
      >
        랜덤체인지
      </Button>

      <Button
        styles="blue"
        fullWidth="full-width"
        onClick={handleClickChangeEmoji}
      >
        이모지 변경하기
      </Button>
    </>
  );
}

export default ModifyEmoji;
