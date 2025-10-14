import { createRoot } from "react-dom/client";
import { App } from './App'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import ProductsPage from "./pages/ProductsPage";

const root = document.getElementById('root');
const app = createRoot(root);
const store = setupStore();


const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: '/signup',
        element: <SignUpPage/>
    },
    {
        path: "/",
        element: <App/>,
        children:[
            {
                path:'products',
                element: <ProductsPage/>,
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