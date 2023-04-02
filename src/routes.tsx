import Shop from './pages/Shop';
import MainPage from './pages/MainPage'
import { ProductPage } from './pages/ProductPage';
import BasketPage from './pages/BasketPage';
import AdminPage from './pages/AdminPage';

export const authRouter = [
    {
        path: '/',
        Component: MainPage,
    },
    {
        path: '/catalog',
        Component: Shop,
        children: {
            path: '/catalog/:barcode',
            Component: ProductPage,
        }
    },
    {
        path: '/admin',
        Component: AdminPage,
    },
    {
        path: '/basket',
        Component: BasketPage,
    }

]