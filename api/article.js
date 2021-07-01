import { fetch } from "@/plugins/fetch";

// 获取公共文章列表
export const getArticles = (params) => {
  return fetch({
    method: "GET",
    url: "/api/articles",
    params,
  });
};

// 获取关注的用户文章列表
// 需要登录, 并且传 authorization, 否则 401
export const getFeedArticle = (params) => {
  return fetch({
    method: "GET",
    url: "/api/articles/feed",
    params,
  });
};