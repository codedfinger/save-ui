import React from "react";
import { IconButton } from "../../../SubComponents/Button";

import "../UserAccount.css";

export function Food({ isSeller }) {
  return (
    <>
      {isSeller ? (
        <IconButton
          title="Start planning your farm with us. Coordinate your produce with consumers and grow into sustainability."
          icon="notes"
          label="My Farm Plan"
          color="turquoise"
          goTo="/farm-plan"
        />
      ) : (
        <IconButton
          title="Start planning your farm with us. Coordinate your produce with consumers and grow into sustainability."
          icon="notes"
          label="My Farm Plan"
          color="turquoise"
          goTo="/farm-auth"
        />
      )}
      <IconButton
        title="Find out more about the Plan to Save campaign, and what you can do to help."
        icon="food"
        label="Plan to Save"
        color="yellow"
        goTo="/pts"
      />

      {/* <IconButton
        icon="my-products"
        label="Food Sold"
        color="turquoise"
        goTo="/view-products"
      /> */}
      <IconButton
        icon="my-products"
        label="Food Returned"
        color="turquoise"
        goTo="/view-products"
        disabled
      />
      <IconButton
        icon="chart"
        label="Produce Chart"
        color="yellow"
        goTo="/produce"
      />
      <IconButton
        icon="notes"
        label="Turnover"
        color="turquoise"
        goTo="/"
        disabled
      />
      <IconButton
        icon="notes"
        label="Profit"
        color="turquoise"
        goTo="/"
        disabled
      />
      <IconButton
        icon="notes"
        label="Rent/Buy Item"
        color="turquoise"
        goTo="/supply"
      />
    </>
  );
}

export function Environment() {
  return (
    <>
      <IconButton
        title="Record your food loss."
        icon="waste"
        label="Food Loss"
        color="turquoise"
        goTo="/food-loss"
      />
      <IconButton
        title="View your food loss data."
        icon="chart"
        label="Waste Chart"
        color="yellow"
        goTo="/chart"
      />
      <IconButton
        title="Useful tips on how to reduce food waste in your home."
        icon="info"
        label="Food Waste Reduction Tips"
        color="green"
        goTo="/food-reduction"
      />
      <IconButton
        title="View the world map of WFT users!"
        icon="world"
        label="Users Map"
        color="yellow"
        goTo="/view-map"
      />
      <IconButton
        title="Find out more about the Plan to Save campaign, and what you can do to help."
        icon="food"
        label="Plan to Save"
        color="yellow"
        goTo="/pts"
      />
    </>
  );
}

export function FSSP() {
  return (
    <>
      <IconButton
        title="Find out about our Agrifood TechPreneur program."
        icon="plant"
        label="Agrifood Technpreneur"
        color="turquoise"
        goTo="https://intellidigest.com/services/food-system-sustainability/agrifood-techpreneur-club/"
      />
      <IconButton
        title="Buff up the sustainability of your business with our online masterclasses."
        icon="book"
        label="Masterclasses"
        color="turquoise"
        goTo="https://intellidigest.com/masterclasses-overview/"
      />
      <IconButton
        title="Calculate the Food Industry Sustainability Index (FISI) of your business."
        icon="info"
        label="FISI"
        color="green"
        goTo="https://intellidigest.com/services/food-system-sustainability/food-industry-sustainability-index/"
      />
      <IconButton
        title="Find out more about the Plan to Save campaign, and what you can do to help."
        icon="food"
        label="Plan to Save"
        color="yellow"
        goTo="/pts"
      />
    </>
  );
}
