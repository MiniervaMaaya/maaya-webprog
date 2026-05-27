import axios from "axios";
import constants from "../constants";
import articles from "../assets/article-content";

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

export const fetchArticles = async () => {
  try {
    const { data } = await API.get("/");
    return data.articles || data || [];
  } catch {
    return articles;
  }
};
