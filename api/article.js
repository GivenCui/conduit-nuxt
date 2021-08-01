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

// 添加关注
export const addFavoriteArticle = (slug) => {
  return fetch({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  });
}
// 删除关注
export const delFavoriteArticle = (slug) => {
  return fetch({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  });
}

// 获取文章详情
export const getArticle = (slug) => {
  return fetch({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}