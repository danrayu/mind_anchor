'use client'
import React from 'react'
import CategoryEdit from '../components/CategoryEdit'

async function EditCategoryPage({ params }: { params: { id: string }}) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories/${params.id}`);
  var category: Category = await response.json();

  return (
    <div className="mt-10">
      <CategoryEdit category={category}/>
    </div>
    
  )
}

export default EditCategoryPage