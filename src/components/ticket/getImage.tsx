export const getImage = async (url: string = "/vite.svg") => {
  const res = await fetch(url);
  const blob = await res.blob();
  return URL.createObjectURL(blob);
};
