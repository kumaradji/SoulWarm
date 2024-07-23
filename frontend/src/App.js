import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Authorization from './pages/Authorization/Authorization';
import Profile from './pages/Profile/Profile';
import LessonsPage from './pages/LessonsPage/LessonsPage';
import ShopPage from './pages/ShopPage/ShopPage';
import AboutMePage from './pages/AboutMePage/AboutMePage';
import GalleryPage from './pages/GalleryPage/GalleryPage';
import LandingPage from './pages/LandingPage/LandingPage';
import LessonPage from './pages/LessonsPage/LessonPage/LessonPage';
import MarenGarden from './pages/MarenGarden/MarenGarden';
import MarenGardenContent from './pages/MarenGarden/MarenGardenContent/MarenGardenContent';
import GalleryList from './pages/GalleryPage/GalleriesList/GalleryList';
import PromoPage from './pages/MarenGarden/PromoPage/PromoPage';
import ProductDetail from './pages/ShopPage/ProductDetail/ProductDetail';
import ChatButton from './components/ChatButton/ChatButton';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import ChangePassword from './components/ChangePassword/ChangePassword';

import galleries from './pages/GalleryPage/galleries';
import marenGardenChapters from './pages/MarenGarden/MarenGardenChapters';
import './styles/styles.scss';
import CartButton from './pages/ShopPage/CartButton/CartButton';
import CartPage from './pages/ShopPage/CartPage/CartPage';
import ConspectPage from './pages/MarenGarden/MarenGardenContent/ConspectPage/ConspectPage';
import { CartProvider } from './context/CartContext';
import OfferAgreement from './pages/ShopPage/OfferAgreement/OfferAgreement';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const { isLoggedIn, checkAuthStatus, user } = useAuth();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log('Пользователь не залогинен, обновите UI');
    }
  }, [isLoggedIn]);

  return (
    <Router>
      <ScrollToTop />
      <CartProvider>
        <div className="app-container">
          <div className="content">
            <Header isLoggedIn={isLoggedIn} userName={userName} setUserName={setUserName} />
            <CartButton />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<Authorization />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/profile" element={isLoggedIn ? <Profile /> : <Authorization redirectBack="/profile" />} />
              <Route path="/lessons" element={<LessonsPage />} />
              <Route path="/lesson/:lessonId" element={<LessonPage />} />
              <Route path="/about" element={<AboutMePage />} />
              <Route path="/promo" element={<PromoPage />} />
              <Route path="/masterclass"
                     element={<PrivateRoute element={<MarenGarden marenGardenChapters={marenGardenChapters} />}
                                            requiredGroup="VIP" />} />
              <Route path="/masterclass/:chapterId"
                     element={<PrivateRoute element={<MarenGardenContent marenGardenChapters={marenGardenChapters} />}
                                            requiredGroup="VIP" />} />
              <Route path="/conspects" element={<PrivateRoute element={<ConspectPage />} requiredGroup="VIP" />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/gallery/:galleryId" element={<GalleryPage />} />
              <Route path="/gallery" element={<GalleryList galleries={galleries} />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/offer-agreement" element={<OfferAgreement />} />
            </Routes>
            <ChatButton />
          </div>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
