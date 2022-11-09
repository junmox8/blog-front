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
export const getArticleList = async (page, limit) => {
  return Axios.get(
    "/api/article/getArticleList?page=" + page + "&limit=" + limit
  );
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
export const handUpImgKind = async (name) => {
  return Axios.post("/api/album/handUpImgKind", {
    name,
  });
};
export const getAllImgKinds = async () => {
  return Axios.get("/api/album/getAllImgKinds");
};
export const handUpImg = async (urls, kindName) => {
  return Axios.post("/api/album/handUpImg", {
    urls,
    kindName,
  });
};
export const getImgs = async (kindName) => {
  return Axios.get("/api/album/getImgs?kindName=" + kindName);
};
export const handUpMessage = async (content) => {
  return Axios.post("/api/message/handUpMessage", {
    content,
  });
};
export const getAllMessageNumber = async () => {
  return Axios.get("/api/message/getAllMessageNumber");
};
export const getOnePageMessage = async (page) => {
  return Axios.get("/api/message/getOnePageMessage?page=" + page);
};
export const handUpMessageAttach = async (content, toUserId, messageId) => {
  return Axios.post("/api/message/handUpMessageAttach", {
    content,
    messageId,
    toUserId,
  });
};
export const getTheMessageAttach = async (contentId) => {
  return Axios.get("/api/message/getTheMessageAttach?id=" + contentId);
};
export const handUpMessageAttachAttach = async (
  content,
  toUserId,
  messageId
) => {
  return Axios.post("/api/message/handUpMessageAttachAttach", {
    content,
    messageId,
    toUserId,
  });
};
export const addPageViews = async (articleId) => {
  return Axios.post("/api/article/addPageViews", {
    articleId,
  });
};
export const likeOrNot = async (articleId) => {
  return Axios.post("/api/article/likeOrNot", {
    articleId,
  });
};
export const hasLike = async (articleId) => {
  return Axios.get("/api/article/hasLike?articleId=" + articleId);
};
export const searchArticle = async (word, page) => {
  return Axios.get("/api/article/searchArticle?word=" + word + "&page=" + page);
};
export const searchArticleByTag = async (tags, word, page) => {
  return Axios.get(
    "/api/article/searchArticleByTag?tags=" +
      tags +
      "&word=" +
      word +
      "&page=" +
      page
  );
};
export const deleteMessage = async (id) => {
  return Axios.post("/api/message/deleteMessage", {
    id,
  });
};
export const deleteMessageAttach = async (id) => {
  return Axios.post("/api/message/deleteMessageAttach", {
    id,
  });
};
export const deleteComment = async (id) => {
  return Axios.post("/api/articleComment/deleteComment", {
    id,
  });
};
export const deleteCommentAttach = async (id) => {
  return Axios.post("/api/articleComment/deleteCommentAttach", {
    id,
  });
};
