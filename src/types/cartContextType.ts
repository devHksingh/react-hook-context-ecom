import { CartItem } from "./cartTypes";

export interface CartContextType {
    // Method properties
    addProduct(productId: number): void;
    removeProduct(productId: number): void;
    
    
    cartState: CartItem[];
}