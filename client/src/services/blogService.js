import API from "./api";

export const getBlogs = () => API.get("/blogs");

export const getBlog = (id) => API.get(`/blogs/${id}`);