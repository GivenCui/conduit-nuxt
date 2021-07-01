import { fetch } from "@/plugins/fetch";

// 用户登录
export const login = (data) => {
  return fetch({
    method: "POST",
    url: "/api/users/login",
    data,
  });
};

// 用户注册
export const register = (data) => {
  return fetch({
    method: "POST",
    url: "/api/users",
    data,
  });
};
