import React, { createContext, useState, useContext, ReactNode } from 'react'
import { Category } from '../Components/Header/Header'

interface FilterContextType {
  category: Category
  setCategory: (category: Category) => void
  searchTerm: string
  setSearchTerm: (searchTerm: string) => void
}

const FilterContext = createContext<FilterContextType>({
  category: Category?.None,
  setCategory: () => {},
  searchTerm: '',
  setSearchTerm: () => {},
})

export const FilterContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [category, setCategory] = useState<Category>(Category.None)
  const [searchTerm, setSearchTerm] = useState<string>('')

  return (
    <FilterContext.Provider
      value={{ category, setCategory, searchTerm, setSearchTerm }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export default FilterContextProvider
export { FilterContext }
export type { FilterContextType }
