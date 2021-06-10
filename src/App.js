import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddStore from "./pages/store/addStore.component";
import StoreList from "./pages/store/storelist.component";

import AddCategory from "./pages/category/addCategory.component";
import AddProduct from "./pages/product/addProduct.component";


function App() {
  return (
    <div className="App">
      <div> 
        <nav className="navbar navbar-expand navbar-dark bg-dark p-2">
          <a href="/" className="navbar-brand">
            Lezzoo React Admin
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/stores"} className="nav-link">
                Stores
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/stores"]} component={StoreList} />
            <Route path="/addstore" component={AddStore} /> 
            <Route path="/addCategory/:storeId" component={AddCategory} />
            <Route path="/addProduct/:categoryId" component={AddProduct} />
          </Switch>
        </div>

      </div>
    </div>
  );
}

export default App;
