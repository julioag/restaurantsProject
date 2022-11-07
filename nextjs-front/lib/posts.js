import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import url from "../config/url";

export async function getAllRestaurantIds() {
  const res = await fetch(url);
  const restaurants = await res.json();
  return restaurants.map((restaurant) => {
    return {
      params: {
        id: restaurant.id.toString(),
      },
    };
  });
}

export async function getRestaurantData() {
  // Get file names under /posts
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const restaurants = await response.json();
  return restaurants;
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
