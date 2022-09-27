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
export const getAllContent = async (id, page) => {
  return Axios.get(
    "/api/articleComment/getAllContent?id=" + id + "&page=" + page
  );
};
export const handUpCommentAttach = async (userId, commentId, content) => {
  return Axios.post("/api/articleComment/handUpCommentAttach", {
    userId,
    commentId,
    content,
  });
};
export const getTheCommentAttach = async (id) => {
  return Axios.get("/api/articleComment/getTheCommentAttach?id=" + id);
};
export const getUserInfo = async (id) => {
  return Axios.get("/api/user/getUserInfo?id=" + id);
};
export const getMyUserInfo = async () => {
  return Axios.get("/api/user/getMyUserInfo");
};
export const handUpCommentAttachAttach = async (
  content,
  toUserId,
  commentId
) => {
  return Axios.post("/api/articleComment/handUpCommentAttachAttach", {
    commentId,
    toUserId,
    content,
  });
};
export const getCommentNumber = async (id) => {
  return Axios.get("/api/articleComment/getCommentNumber?id=" + id);
};
export const updateUserInfo = async (name, avatar, introduction) => {
  return Axios.post("/api/user/updateUserInfo", {
    name,
    avatar,
    introduction,
  });
};
