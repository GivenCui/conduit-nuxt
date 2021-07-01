import request from "@/utils/webApi";

// 获取公共文章列表
export const getArticles = (params) => {
  return request({
    method: "GET",
    url: "/api/articles",
    params,
  });
};

// 获取关注的用户文章列表
// 需要登录, 并且传 authorization, 否则 401
export const getFeedArticle = (params) => {
  return request({
    method: "GET",
    url: "/api/articles/feed",
    headers: {
      Authorization: 'Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTcwNzIyLCJ1c2VybmFtZSI6ImdpdmVuY3VpIiwiZXhwIjoxNjI5NzI3MzUxfQ.qswjH8tO36hbVSsC2VgHkbILWTaDDNAePaDlkQ1hZ-s'
    },
    params,
  });
};