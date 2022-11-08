import Head from "next/head";
import React, { useState } from "react";
import Layout from "../../../components/layout";
import {
  getAllRestaurantIds,
  getRestaurantData,
  updateRestaurant,
} from "../../../lib/restaurants";
import { useRouter } from "next/router";
import RestaurantForm from "../../../components/restaurantForm";

export async function getStaticProps({ params }) {
  const restaurantData = await getRestaurantData(params.id);
  return {
    props: {
      restaurantData,
    },
  };
}

export async function getStaticPaths() {
  const paths = await getAllRestaurantIds();
  return {
    paths,
    fallback: false,
  };
}

export default function EditRestaurant({ restaurantData }) {
  const router = useRouter();

  const Edit = async (restaurant) => {
    const success = await updateRestaurant(restaurantData.id, restaurant);
    if (success) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Layout>
      <h1>Edita el restaurant {restaurantData.name}</h1>
      <RestaurantForm
        name={restaurantData.name}
        food_type={restaurantData.food_type}
        location={restaurantData.location}
        rating={restaurantData.rating}
        checkbox={restaurantData.checkbox}
        handleSubmit={Edit}
      />
    </Layout>
  );
}
