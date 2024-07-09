import MenProducts from "./collections/Electronic.js";
import Cart from "./collections/Cart";
import RootLayout from './collections/RootLayout';
import Products from "./collections/Products";
import Women from "./collections/Women.js";
import Men from "./collections/Men.js";
import HomeAndLiving from "./collections/HomeAndLiving.js";
import Studio from "./collections/Studio.js";
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route} from 'react-router-dom';
import Profile from "./collections/Profile.js";
import WishList from "./collections/WishList";
import Login from "./collections/Login";
import Register from "./collections/Register";
import BackendData from "./collections/BackendData.js";
import ProductDetails from "./collections/ProductDetails.js";
import ElectronicProductDetails from "./collections/ElectromicProductsDetails.js"


function App() {
  


  const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route path="MenProducts"  element={<MenProducts/>}></Route>
      <Route path="Women"  element={<Women/>}></Route>
      <Route path="Men"  element={<Men/>}></Route>
      <Route path="HomeAndLiving"  element={<HomeAndLiving/>}></Route>
      <Route path="Studio"  element={<Studio/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/wishlist" element={<WishList/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/backendData" element={<BackendData/>}></Route>
      <Route path="/product/:productId" element={<ProductDetails/>}></Route>
      <Route path="/MenProducts/:productId" element={<ElectronicProductDetails/>}></Route>
      
      <Route index element={<Products/>}></Route>
    </Route>
  ))
  return (
    <div className="App">
     <RouterProvider router={router}/>
    
    </div>
  );
}

export default App;