import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { LoginApi } from '../api/Login';
import { ProductApi } from '../api/Product';
import { CategoryApi } from '../api/Category';
import { BrandApi } from '../api/Brand';
import { OrdersApi } from '../api/Orders';
import { CustomerApi } from '../api/Customer';
import { OfferApi } from '../api/Offer';

export const store = configureStore({
    reducer: {
        [LoginApi.reducerPath]: LoginApi.reducer,
        [ProductApi.reducerPath]: ProductApi.reducer,
        [CategoryApi.reducerPath]: CategoryApi.reducer,
        [BrandApi.reducerPath]: BrandApi.reducer,
        [OrdersApi.reducerPath]: OrdersApi.reducer,
        [CustomerApi.reducerPath]: CustomerApi.reducer,
        [OfferApi.reducerPath]: OfferApi.reducer
    },
    middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware()
            .concat(LoginApi.middleware)
            .concat(ProductApi.middleware)
            .concat(CategoryApi.middleware)
            .concat(BrandApi.middleware)
            .concat(OrdersApi.middleware)
            .concat(CustomerApi.middleware)
            .concat(OfferApi.middleware)
});
setupListeners(store.dispatch);