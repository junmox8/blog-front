import Axios from "./index";
export const register = async (username, password) => {
  return Axios.post("/api/user/register", {
    username,
    password,
  });
};
export const login = async (username, password) => {
  return Axios.post("/api/user/login", {
    username,
    password,
  });
};
export const getTempSecret = async () => {
  return Axios.get("/api/upload/getTempSecret");
};
export const handUpArticle = async (
  title,
  introduction,
  content,
  tags,
  categories,
  img
) => {
  return Axios.post("/api/article/handUpArticle", {
    content,
    title,
    introduction,
    categories,
    tags,
    img,
  });
};
export const getAllArticleNumber = async () => {
  return Axios.get("/api/article/getAllArticleNumber");
};
export const getArticleList = async (page) => {
  return Axios.get("/api/article/getArticleList?page=" + page);
};
export const getRecentArticle = async () => {
  return Axios.get("/api/article/getRecentArticle");
};
export const getArticleById = async (id) => {
  return Axios.get("/api/article/getArticleById?id=" + id);
};
export const handUpComment = async (content, articleId) => {
  return Axios.post("/api/articleComment/handUpComment", {
    content,
    articleId,
  });
};
