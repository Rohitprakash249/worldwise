import { BrowserRouter ,Routes ,Route ,Navigate} from "react-router-dom";
import React ,{useState} from "react";
import Product from "./pages/product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import Pagenotfound from "./pages/Pagenotfound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider , useCities } from "./contexts/CitiesContext";
import {AuthProvider , useAuth} from "./contexts/fakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";


function App() {
  


  return (
    <AuthProvider>
    <CitiesProvider>
 
    <BrowserRouter>
     <Routes>
     <Route index element={<Homepage />} />
      <Route path="product" element={<Product />} />
      <Route path="pricing" element={<Pricing />} />
      
      <Route path="login" element={<Login /> } />

      <Route path="/app"
       element={<ProtectedRoute> <AppLayout /></ProtectedRoute>
      
       } >
         <Route index element={<Navigate replace to="cities" />} />
      
         <Route path="cities/:id" element={<City />} />
         <Route path="cities" element={<CityList />} />
         <Route path="countries" element={<CountryList />} />
         <Route path="form" element={<Form />} />
      </Route>
      <Route path="*" element={<Pagenotfound />} />
     </Routes>
     </BrowserRouter>
      
   </CitiesProvider>
   </AuthProvider>
  )
}
export default App;

