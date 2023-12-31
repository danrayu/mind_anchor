'use client'
import React from "react";
import CategoriesView from "./components/CategoriesView";

async function CategoriesPage() {
  const categoriesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`
  );

  const categories = await categoriesResponse.json();

  return <CategoriesView categories={categories}></CategoriesView>;
}

export default CategoriesPage;
