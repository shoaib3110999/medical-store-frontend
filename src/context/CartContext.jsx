import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const localData = localStorage.getItem('cartItems');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.title === product.title);
            if (existingItem) {
                return prevItems.map((item) =>
                    item.title === product.title
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        alert(`${product.title} added to cart!`);
    };

    const removeFromCart = (title) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.title !== title)
        );
    };

    const updateQuantity = (title, quantity) => {
        if (quantity < 1) {
            removeFromCart(title);
            return;
        }
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.title === title ? { ...item, quantity } : item
            )
        );
    }

    const clearCart = () => {
        setCartItems([]);
    }

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
