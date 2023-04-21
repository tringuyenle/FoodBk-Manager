import { createContext, useContext, useEffect, useReducer} from "react";
import { CartReducer } from "./CartReduder";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
    const [cart, dispatchCart] = useReducer(CartReducer, {
        cartData: JSON.parse(window.localStorage.getItem("FOOD_ITEM"))
            ? JSON.parse(window.localStorage.getItem("FOOD_ITEM"))
            : [],
        cartTotalQuantity: parseInt(window.localStorage.getItem("FOOD_TOTAL_QUANTITY"))
            ? parseInt(window.localStorage.getItem("FOOD_TOTAL_QUANTITY"))
            : 0,
        cartTotalAmount: parseInt(window.localStorage.getItem("FOOD_TOTAL_AMOUNT"))
            ? parseInt(window.localStorage.getItem("FOOD_TOTAL_AMOUNT"))
            : 0
    });
    useEffect(() => {
        window.localStorage.setItem("FOOD_TOTAL_QUANTITY", JSON.stringify(cart.cartTotalQuantity))
        window.localStorage.setItem("FOOD_TOTAL_AMOUNT", JSON.stringify(cart.cartTotalAmount))
    }, [cart])
    return (
        <CartContext.Provider
            value={{
                cart,
                dispatchCart,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
export const CartState = () => {
    return useContext(CartContext);
}
export default CartProvider;