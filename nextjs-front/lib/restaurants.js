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

export async function getAllRestaurantData() {
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

export async function getRestaurantData(id) {
  const response = await fetch(`${url}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const restaurant = await response.json();
  return restaurant;
}
