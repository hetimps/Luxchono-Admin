export const categoryFromDataApi = {
    createCategory: (body: any) => {
        const formData = new FormData();
        formData.append('categoryName', body.categoryName);
        formData.append('image', body.image);
        formData.append('icon', body.icon);
        return formData;
    },
};

export const brandFromDataApi = {
    createBrand: (body: any) => {
        const formData = new FormData();
        formData.append('brandName', body.brandName);
        formData.append('image', body.image);
        formData.append('icon', body.icon);
        return formData;
    }
};

export const productFromDatApi = {
    createProduct: (body: any) => {
        const formData = new FormData();
        if (Array.isArray(body.category)) {
            body.category.forEach((categoryItem: any, index: any) => {
                formData.append(`category[${index}]`, categoryItem);
            });
        } else {
            formData.append('category', body.category);
        }
        if (Array.isArray(body.image)) {
            body.image.forEach((image: any) => {
                formData.append('images', image);
            });
        } else {
            formData.append('images', body.image);
        }
        body.dummyPrice && formData.append('dummyPrice', body.dummyPrice);
        formData.append('productName', body.productName);
        formData.append('description', body.description);
        formData.append('stock', body.stock);
        formData.append('brand', body.brand);
        formData.append('price', body.price);
        formData.append('productModel', body.productModel);
        formData.append('warranty', body.warranty);
        formData.append('thumbnail', body.thumbnail);
        return formData;
    }
};
export const OfferFromDataApi = {
    createOffer: (body: any) => {
        const formData = new FormData();
        if (Array.isArray(body.brands)) {
            body.brands.forEach((BrandItem: any, index: any) => {
                formData.append(`brands[${index}]`, BrandItem);
            });
        } else {
            formData.append('brands', body.brands);
        }
        if (Array.isArray(body.products)) {
            body.products.forEach((ProductItem: any, index: any) => {
                formData.append(`products[${index}]`, ProductItem);
            });
        } else {
            formData.append('products', body.products);
        }
        formData.append('image', body.image);
        formData.append('offerName', body.offerName);
        formData.append('offerCode', body.offerCode);
        formData.append('description', body.description);
        formData.append('discount', body.discount);
        formData.append('dateFrom', body.dateFrom);
        formData.append('dateTo', body.dateTo);
        formData.append('discountType', body.discountType);
        return formData;
    },
};
