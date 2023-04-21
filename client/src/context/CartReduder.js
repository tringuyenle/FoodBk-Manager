
export const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            let list = state.cartData;

            const existingIndex = list.findIndex(
                (item) => item.id === action.payload.id
            );

            if (existingIndex >= 0) {
                state.cartData[existingIndex] = {
                    ...state.cartData[existingIndex],
                    amount: state.cartData[existingIndex].amount + action.amount
                }
                list = state.cartData;
                window.localStorage.setItem("FOOD_ITEM", JSON.stringify(state.cartData));
                // Toast location
                // toast.info("Increased product quantity", {
                //     position: toast.POSITION.TOP_LEFT
                // });
            }
            else {
                action.payload.amount = action.amount;
                list.push(action.payload);
                window.localStorage.setItem("FOOD_ITEM", JSON.stringify(list));
                // Toast location
                // toast.success("Product added to cart", {
                //     position: toast.POSITION.TOP_LEFT
                // });
            }
            return {
                ...state,
                cartData: list,
                cartTotalQuantity: state.cartTotalQuantity + parseInt(action.payload.price) * action.amount,
                cartTotalAmount: state.cartTotalAmount + parseInt(action.amount)
            };
        case "REMOVE_FROM_CART":
            // console.log(state.cartData)
            let tempData = state.cartData.filter(item => item.id !== action.payload.id);
            // console.log(tempData);
            window.localStorage.setItem("FOOD_ITEM", JSON.stringify(tempData));
            return {
                ...state,
                cartData: tempData,
                cartTotalQuantity: state.cartTotalQuantity - parseInt(action.payload.price) * action.amount,
                cartTotalAmount: state.cartTotalAmount - parseInt(action.payload.amount)
            }
        case "CLEAR_CART":
            return {
                ...state,
                cart: state.cart.filter((c) =>
                    c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
                ),
            };
        default:
            return state;
    }
};