import {ComponentType, lazy, Suspense} from 'react'
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom'

import {FullscreenSpinner} from './components/common/Loading/Spinner/FullscreenSpinner'
import {PATHNAME} from './configs/routes'
import ProductDetails from './features/product/Products/Detail/ProductDetails'
import ProductsPage from './features/product/Products/ProductsPage'
import AuthLayout from './layouts/AuthLayout'
import MainLayout from './layouts/MainLayout'

const PageLogin = lazy(() => import('./features/auth/Login'))
const PageNotFound = lazy(() => import('./components/common/404'))

const LazyLoad = (Component: ComponentType) => (
    <Suspense fallback={<FullscreenSpinner/>}>
        <Component/>
    </Suspense>
)

const router = createBrowserRouter([
    {
        path: PATHNAME.root,
        element: <MainLayout/>,

        children: [
            { index: true, element: <Navigate to={PATHNAME.catalog} replace /> },
            {
                path: PATHNAME.catalog,
                element: <ProductsPage/>,
            },
            {
                path: `${PATHNAME.catalog}/:id`,
                element: <ProductDetails />,
            },
        ],
    },
    {
        element: <AuthLayout/>,
        children: [
            {path: PATHNAME.login, element: LazyLoad(PageLogin)},
        ],
    },
    {path: PATHNAME.notFound, element: LazyLoad(PageNotFound)},
    {
        path: PATHNAME.wildcard,
        element: <Navigate to={PATHNAME.notFound} replace/>,
    },
])

function App() {
    return (
        <RouterProvider router={router} fallbackElement={<FullscreenSpinner/>}/>
    )
}

export default App
