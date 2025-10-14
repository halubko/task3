import { createRoot } from "react-dom/client";
import { App } from './App'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import ProductsPage from "./pages/ProductsPage";
import AuthLayout from "./layouts/AuthLayout";
import ProductsLayout from "./layouts/ProductsLayout";

const root = document.getElementById('root');
const app = createRoot(root);
const store = setupStore();

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children:[
            {
                path: 'auth',
                Component: AuthLayout,
                children:[
                    {path:'login', Component: LoginPage},
                    {path:'signup', Component: SignUpPage},
                ],
            },
            {
                path:'products',
                Component: ProductsLayout,
                children:[
                    {path:'all', Component: ProductsPage},
                ]
            }
        ]
    }
]);

const customTheme = createTheme({
    palette: {
        primary: {
            main: '#01788A',
        },
        secondary: {
            main: '#E7F6FB',
        }
    }
});

app.render(
    <Provider store={store}>
        <ThemeProvider theme={customTheme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </Provider>
);