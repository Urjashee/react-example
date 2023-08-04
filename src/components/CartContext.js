import { createContext, useState } from "react";


const cartContext = createContext();

export function CartProvider({children}) {
    const [items, setItems] = useState([])

    const addToCart = (image,name,price) => {
        setItems((prevState) => [...prevState, {image, name, price}])
    }

    return (
        <cartContext.Provider value={{ items, addToCart }}>
            {children}
        </cartContext.Provider>
    )
}


export default cartContext;