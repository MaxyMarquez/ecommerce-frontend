// reducer.js
import { CREATE_PRODUCT_REVIEW, ADD_ITEM_TO_PRODUCT_REVIEW, UPDATE_PRODUCT_REVIEW, DELETE_PRODUCT_REVIEW, GET_ALL_PRODUCT_REVIEWS, AGREGAR_AL_CARRITO, GET_ALL_CATEGORIES, GET_ALL_PRODUCTS, GET_TESTIMONIALS, SEARCH_PRODUCTS, SORT_PRICE, GET_CARRITO, ACTUALIZAR_CARRITO, GET_FAVORITES } from "./action-type";

const initialState = {
    products: [],
    categories: [],
    filters: [],
    reviews: [],
    user: {},
    carrito: [],
    productReviews: [],
    favorites: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
            };
        case SEARCH_PRODUCTS:
            return {
                ...state,
                products: action.payload,
            };
        case GET_FAVORITES:
            return {
                ...state,
                favorites: action.payload
            }
        case GET_TESTIMONIALS:
            return {
                ...state,
                reviews: action.payload,
            };
        case SORT_PRICE:
            const { products } = state;
            const orderBy = action.payload;

            let sortedProducts = [];
            console.log('redux', products.precio);
            switch (orderBy) {
                case 'price_asc':
                    sortedProducts = [...products].sort((a, b) => b.precio - a.precio);
                    break;
                case 'price_desc':
                    sortedProducts = [...products].sort((a, b) => a.precio - b.precio);
                    break;

                default:
                    return { ...state, };
            }

            return {
                ...state,
                products: sortedProducts,
            };
        case AGREGAR_AL_CARRITO:
            return {
                ...state,
                carrito: action.payload,
            };
        case GET_CARRITO:
            return {
                ...state,
                carrito: action.payload,
            };
        case ACTUALIZAR_CARRITO:
            return {
                ...state,
                carrito: action.payload,
            };
        case GET_ALL_PRODUCT_REVIEWS:
            return {
                ...state,
                productReviews: action.payload,
            };
        case CREATE_PRODUCT_REVIEW:
        case ADD_ITEM_TO_PRODUCT_REVIEW:
        case UPDATE_PRODUCT_REVIEW:
        case DELETE_PRODUCT_REVIEW:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default rootReducer;
