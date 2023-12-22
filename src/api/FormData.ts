export const categoryFromDataApi = {
  createCategory: (body: any) => {
    const formData = new FormData();
    formData.append("categoryName", body.categoryName);
    formData.append("image", body.image);
    formData.append("icon", body.icon);
    return formData;
  },
};

export const brandFromDataApi = {
  createBrand: (body: any) => {
    const formData = new FormData();
    formData.append("brandName", body.brandName);
    formData.append("image", body.image);
    formData.append("icon", body.icon);
    return formData;
  }
}

export const productFromDatApi = {
  createProduct: (body: any) => {
    console.log(body.image, "body.image");
    const formData = new FormData();

    if (Array.isArray(body.category)) {
      body.category.forEach((categoryItem: any, index: any) => {
        formData.append(`category[${index}]`, categoryItem);
      });
    } else {
      formData.append("category", body.category);
    }

    if (Array.isArray(body.image)) {
      body.image.forEach((image: any, index: any) => {
        formData.append(`images`, image);
      });
    } else {
      formData.append("images", body.image);
    }

    body.dummyPrice && formData.append("dummyPrice", body.dummyPrice);
    formData.append("productName", body.productName);
    formData.append("description", body.description);
    formData.append("stock", body.stock);
    formData.append("brand", body.brand);
    formData.append("price", body.price);
    formData.append("productModel", body.productModel);
    formData.append("warranty", body.warranty);
    formData.append("thumbnail", body.thumbnail)
    return formData;
  }
};
