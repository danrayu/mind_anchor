'use client'
import React, { useState } from "react";
import CategoryEdit from "../components/CategoryEdit";

function NewCategoryPage() {
  return (
    <div className="mt-10">
      <h1 className="text-[35px] font-bold">Add category</h1>
      <CategoryEdit />
    </div>
  )
}

export default NewCategoryPage;
