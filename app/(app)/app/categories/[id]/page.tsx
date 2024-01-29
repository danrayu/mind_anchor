'use client'
import React from 'react'
import CategoryEdit from '../components/CategoryEdit'
import { fetchGetCategory } from '@/app/fetchActions';

async function EditCategoryPage({ params }: { params: { id: string }}) {
  const response = await fetchGetCategory(parseInt(params.id));
  var category: Category = await response.json();

  return (
    <div className="mt-10">
      <CategoryEdit category={category}/>
    </div>
    
  )
}

export default EditCategoryPage