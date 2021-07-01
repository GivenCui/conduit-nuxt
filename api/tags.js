import { fetch } from "@/plugins/fetch";

// 获取文章标签列表
export const getTags = () => {
  return fetch({
    method: "GET",
    url: "/api/tags"
  });
};