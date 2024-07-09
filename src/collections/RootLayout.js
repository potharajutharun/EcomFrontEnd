import  {React} from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { Provider } from 'react-redux';
import store from '../store/Store';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
const RootLayout=()=>{
    const  location=useLocation();
    return(
        <>
        <Provider store={store}>
        <Navigation/>
        <main>
            <Outlet/>
        </main>
        {location.pathname !== "/login" && location.pathname !== "/register" && <Footer />}
        </Provider>
       
        </>
    );
}
export default RootLayout