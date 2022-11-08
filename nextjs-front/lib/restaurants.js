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

export async function deleteRestaurant(id) {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return true;
  } else {
    return false;
  }
}
