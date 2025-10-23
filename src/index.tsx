import { createRoot } from "react-dom/client"
import { App } from "./App"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import { createTheme, ThemeProvider } from "@mui/material"
import AuthPage from "./pages/AuthPage"
import { Provider } from "react-redux"
import { setupStore } from "./store/store"
import ProductsPage from "./pages/ProductsPage"
import AuthLayout from "./layouts/AuthLayout"
import MainLayout from "./layouts/MainLayout"
import ProductPage from "./pages/ProductPage"
import ProtectedRoutes from "./utils/ProtectedRoutes"
import CartPage from "./pages/CartPage"

const root = document.getElementById("root")
const app = createRoot(root)
const store = setupStore()

const router = createBrowserRouter([
   {
      path: "/",
      Component: App,
      children: [
         {
            index: true,
            element: <Navigate to={"/main/products"} replace />,
         },
         {
            path: "auth",
            Component: AuthLayout,
            children: [
               { path: "login", Component: AuthPage },
               { path: "signup", Component: AuthPage },
            ],
         },
         {
            path: "main",
            Component: MainLayout,
            children: [
               { path: "products", Component: ProductsPage },
               { path: "products/:id", Component: ProductPage },
               { path: "cart", Component: CartPage },
            ],
         },
         {
            Component: ProtectedRoutes,
            children: [
               {
                  path: "checkout",
               },
            ],
         },
      ],
   },
])

const customTheme = createTheme({
   palette: {
      primary: {
         main: "#01788A",
      },
      secondary: {
         main: "#E7F6FB",
      },
   },
})

app.render(
   <Provider store={store}>
      <ThemeProvider theme={customTheme}>
         <RouterProvider router={router} />
      </ThemeProvider>
   </Provider>
)
