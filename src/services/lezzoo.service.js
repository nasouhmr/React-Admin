import http from "../http-common";

class LezzooService {

  getAllStores() {
    return http.get("/store");
  } 

  createStore(data) {
    return http.post("/store/save", data);
  }    

  getAllCategories(store_id) {  
    return http.get("/category?store_id="+store_id);
  } 

  createCategory(data) {
    return http.post("/category/save", data);
  }    

  getAllProducts(cate_id) {
    return http.get("/product?category_id="+cate_id);
  } 

  createProduct(data) {
    return http.post("/product/save", data);
  }    

}

export default new LezzooService();