export const envelopeOpenSound = new Audio("/sounds/envelope_open.wav");
export const envelopeCloseSound = new Audio("/sounds/envelope_close.wav");
export const sendSuccessSound = new Audio("/sounds/success.mp3");
export const errorSound = new Audio("/sounds/error.wav");
export const clickSound = new Audio("/sounds/click.mp3");
export const card_swipe = new Audio("/sounds/card_swipe.mp3");
export const swoosh = new Audio("/sounds/swoosh.mp3");

export const playSound = (audio) => {
  audio.currentTime = 0;
  audio.play();
};
