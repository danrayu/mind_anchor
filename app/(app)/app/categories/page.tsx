'use client'
import React from "react";
import CategoriesView from "./components/CategoriesView";
import { useAppSelector } from "@/app/store/hooks";

function CategoriesPage() {
  var cats = useAppSelector(state => state.categories.categories);

  return <CategoriesView categories={cats}></CategoriesView>;
}

export default CategoriesPage;
