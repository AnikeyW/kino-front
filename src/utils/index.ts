export const formatTime = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.round(seconds % 60);

  if (hours === 0 && minutes === 0) {
    return `0:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  } else if (hours === 0) {
    return `${minutes < 10 ? "0" + minutes : minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  } else {
    return `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}`;
  }
};
