import { createContext, useContext, useEffect, useState } from "react";
import { getAllFoods } from "../utils/user.utils";

const FoodContext = createContext({});

export const FoodProvider = ({children}) => {
    const [food, setFood] = useState([]);
    useEffect(() => {
        getAllFoods().then(f => setFood(f.data))
    },[])
    return(
        <FoodContext.Provider
            value={{
                food
            }}
        >
            {children}
        </FoodContext.Provider>
    );
}

export const FoodState = () => {
    return useContext(FoodContext);
}
export default FoodProvider;