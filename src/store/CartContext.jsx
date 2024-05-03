import { createContext, useReducer } from 'react';

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    clearCart: () => { },
});

const cartReducer = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);
        const newItems = [...state.items];

        if (existingItemIndex > -1) {
            const existingItem = newItems[existingItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            newItems[existingItemIndex] = updatedItem;
        } else {
            newItems.push({
                ...action.payload,
                quantity: 1,
            });
        }

        return {
            ...state,
            items: newItems,
        };
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingItemIndex = state.items.findIndex((item) => item.id === action.payload);
        const newItems = [...state.items];
        const existingItem = { ...newItems[existingItemIndex] };
        if (existingItem.quantity > 1) {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1,
            };
            newItems[existingItemIndex] = updatedItem;
        } else {
            newItems.splice(existingItemIndex, 1);
        }

        return {
            ...state,
            items: newItems,
        };
    }

    if (action.type === 'CLEAR_CART') {
        return {
            ...state,
            items: [],
        };
    }

    return state;
};

export const CartContextProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, { items: [] });

    const addItem = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart,
    };
    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;