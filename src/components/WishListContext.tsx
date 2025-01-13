import { createContext, ReactNode, useContext, useReducer } from "react";

interface WishListState {
    productId: number;
}

interface WishListAction {
    type: "toggle";
    payload: {
        productId: number;
    };
}

interface WishListContextValue {
    wishListState: WishListState[];
    handleWishListProduct: (productId: number) => void;
}

const WishListContex = createContext<WishListContextValue | undefined>(undefined);

const wishListReducer = (wishListState: WishListState[], action: WishListAction) => {
    const { type, payload } = action;
    switch (type) {
        case "toggle":{
            const existingProduct = wishListState.find(
                (item) => item.productId === payload.productId
            );
            if (existingProduct) {
                return wishListState.filter((item) => item.productId !== payload.productId);
            } else {
                return [...wishListState, { productId: payload.productId }];
            }}
        default:
            return wishListState;
    }
};

export const WishListProvider = ({ children }: { children: ReactNode }) => {
    const [wishListState, dispatch] = useReducer(wishListReducer, []);

    const handleWishListProduct = (productId: number) => {
        dispatch({ type: "toggle", payload: { productId } });
    };

    return (
        <WishListContex.Provider value={{ wishListState, handleWishListProduct }}>
            {children}
        </WishListContex.Provider>
    );
};

export const useWishList = () => {
    const context = useContext(WishListContex);
    if (!context) {
        throw new Error("useWishList must be used within a WishListProvider");
    }
    return context;
};
