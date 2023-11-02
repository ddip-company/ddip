export const getBackgroundPosition = (idx) => {
  let positionY = -10;
  for (let i = 0; i < idx; i++) {
    positionY -= 46;
  }
  return `0 ${positionY}px`;
};
