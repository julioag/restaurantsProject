import React, { useState } from "react";
import Layout from "../../components/layout";
import RestaurantForm from "../../components/restaurantForm";
import { createRestaurant } from "../../lib/restaurants";

export default function NewRestaurant() {
  const Create = async (restaurant) => {
    const success = await createRestaurant(restaurant);
    if (success) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Layout>
      <h1>Crea un nuevo restaurant</h1>
      <RestaurantForm handleSubmit={Create} />
    </Layout>
  );
}
