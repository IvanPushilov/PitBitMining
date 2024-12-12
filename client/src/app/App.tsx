import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import AuthorisationPage from '../features/Auth/components/AuthorisationPage';
import RegLog from '../features/Auth/components/RegLog';
import Main from '../features/Main/components/Main';
import MainPage from '../features/MainContent/components/MainPage';
import Profile from '../features/Profile/components/Profile';
import MinersPage from '../features/Miners/components/MinersPage';
import MinerPage from '../features/Miners/components/MinerPage';
import '../index.css'
import { type RootState, useAppDispatch } from '../store/store';
import { authCheckUser } from '../features/Auth/authSlice';
import { minersLoad } from '../features/Miners/minersSlice';
import { brandsLoad } from '../features/Miners/brandsSlice';
import { currenciesLoad } from '../features/Miners/currencySlice';
import { algorithmsLoad } from '../features/Miners/algSlice';
import { modellsLoad } from '../features/Miners/modellsSlice';
import { hashratesLoad } from '../features/Miners/hashratesSlice';
import { subbrandsLoad } from '../features/Miners/subSlice';
import LeasingPage from '../features/Leasing/components/LeasingPage';
import ContactsPage from '../features/Contacts/components/ContactsPage';
import MinerControlPage from '../features/MinerControl/components/MinerControlPage';
import PartnersHostingPage from '../features/PartnersHosting/components/PartnersHostingPage';
import NotFound from '../features/404/NotFound';
import GuaranteePage from '../features/Guarantee/components/GuaranteePage';
import FeedBack from '../features/FeedBack/components/FeedBack';
import PolicyPage from '../features/Policy/components/Policy';
import { favoriteLoad } from '../features/Miners/favoriteSlice';
import Order from '../features/Order/components/Order';
import Favorite from '../features/Favorite/components/Favorite';
import { orderLoad } from '../features/Miners/ordersSlice';
import { serviceLoad } from '../features/Miners/serviceSlice';
import { deliveryLoad } from '../features/Miners/deliverySlice';
import { postLoad } from '../features/News/postsSlice';
import NewsPage from '../features/News/components/NewsPage';


function App(): JSX.Element {

  const dispatch = useAppDispatch()

  const user = useSelector((store: RootState) => store.auth.user);


  useEffect(() => {
    dispatch(authCheckUser()).catch(console.log)
    dispatch(minersLoad()).catch(console.log)
    dispatch(brandsLoad()).catch(console.log)
    dispatch(algorithmsLoad()).catch(console.log)
    dispatch(currenciesLoad()).catch(console.log)
    dispatch(modellsLoad()).catch(console.log)
    dispatch(hashratesLoad()).catch(console.log)
    dispatch(subbrandsLoad()).catch(console.log)
    dispatch(serviceLoad()).catch(console.log)
    dispatch(postLoad()).catch(console.log)
    
  }, [dispatch])


  useEffect(() => {
    if (user !== null) {
      dispatch(favoriteLoad()).catch(console.log);
      dispatch(orderLoad()).catch(console.log)
      dispatch(deliveryLoad()).catch(console.log)
    }
  }, [user, dispatch]);


  return (
    <>
    <Routes>
    <Route path='/' element={<Main/>}>
    <Route index element={<MainPage/>}/>
    <Route path="order" element={<Order />} />
    <Route path="favorite" element={<Favorite />} />
    <Route path='auth' element={<RegLog/>} />
    <Route path='sign-in' element={<AuthorisationPage/>} />
    <Route path='profile' element={<Profile/>}/>
    <Route path='miners' element={<MinersPage/>}/>
    <Route path='miners/:minerId' element={<MinerPage/>}/>
    <Route path='leasing' element={<LeasingPage/>}/>
    <Route path='contacts' element={<ContactsPage/>}/>
    <Route path='miner-control' element={<MinerControlPage/>}/>
    <Route path='partners-hosting' element={<PartnersHostingPage/>}/>
    <Route path='guarantee' element={<GuaranteePage/>}/>
    <Route path='about' element={<FeedBack/>}/>
    <Route path='policy' element={<PolicyPage/>}/>
    <Route path='news' element={<NewsPage/>}/>
    <Route path="*" element={<NotFound/>}/>
    </Route>
  </Routes>
    <ToastContainer />
    </>
  );
}

export default App;
