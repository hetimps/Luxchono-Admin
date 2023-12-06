export const categoryFromDataApi = {
    createCategory:  (body:any) => {
      const formData = new FormData();
      formData.append("categoryName", body.categoryName      );
      formData.append("image", body.image);
      return formData;
    },
  };