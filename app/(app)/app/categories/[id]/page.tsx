'use client'
import React, { useEffect, useState } from 'react'
import CategoryEdit from '../components/CategoryEdit'
import { useAppSelector } from '@/app/store/hooks';
import { useCatsValid } from '@/app/util/stateValidationHooks';

function EditCategoryPage({ params }: { params: { id: string }}) {
  const categories = useAppSelector(state => state.categories.categories);
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const catsValid = useCatsValid();

  useEffect(() => {
    if (catsValid) {
      setCategory(categories.find((cat: Category) => cat.id === parseInt(params.id)));
    }
  }, [categories, catsValid, params.id]);


  return (
    <div className="mt-10">
      {category && <CategoryEdit category={category}/>}
    </div>
    
  )
}

export default EditCategoryPage