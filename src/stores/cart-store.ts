import { ProductProps } from "@/utils/data/products"
import {create} from "zustand"
import * as cartInmemory from "./helpers/cart-in-memory"

import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

export type ProductCartProps = ProductProps & {
    quantity: number
}

type StateProps = {
    products: ProductCartProps[]
    add: (product: ProductProps) => void
    remove: (productId: string) => void
    clear: () => void
}

export const useCartStore = create(


persist<StateProps>
    ((set)=> ({
        products: [],

        add: (product: ProductProps) => 
            set((state) => ({
                products: cartInmemory.add(state.products, product)
            })),

        remove: (productid: string) =>
            set((state) => ({
                products: cartInmemory.remove(state.products, productid),
            })),
        
        clear: () => set(()=>({products: []})),    

    }), {
      name: "nlw-expert:cart",
      storage: createJSONStorage(()=> AsyncStorage),  
    }))