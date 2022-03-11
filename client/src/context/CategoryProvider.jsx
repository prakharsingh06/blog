import { useState, createContext } from "react";

export const CategoryContext = createContext(null);

const CategoryProvider = ({children})=>{
    const [category,setCategory] = useState("All");

    return(
        <CategoryContext.Provider value={{
            category,
            setCategory
     }}>
            {children}
        </CategoryContext.Provider>
    )
    
}

export default CategoryProvider;