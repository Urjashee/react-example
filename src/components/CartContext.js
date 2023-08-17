import { createContext, useState } from "react";


const cartContext = createContext();

export function CartProvider({children}) {
    const [items, setItems] = useState([])

    const addToCart = (product_id,image,name,price) => {
        setItems((prevState) => [...prevState, {product_id, image, name, price}])
    }
    console.log(items)
    return (
        <cartContext.Provider value={{ items, addToCart }}>
            {children}
        </cartContext.Provider>
    )
}


export default cartContext;