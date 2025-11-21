export const getImageUrl = (img) => {
  if (!img) return "https://via.placeholder.com/400";
  // agar img string me full URL hai
  if (img.startsWith("http")) return img;
  // backend API URL
  const API = "http://localhost:5000";
  const trimmedApi = API.replace(/\/$/, "");
  const trimmedImg = img.startsWith("/") ? img : `/${img}`;
  return `${trimmedApi}${trimmedImg}`;
};
