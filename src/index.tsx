import { createRoot } from "react-dom/client";
import { App } from './App'
import {createBrowserRouter, RouterProvider} from "react-router";

const root = document.getElementById('root');

const app = createRoot(root);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    }
]);

app.render(<RouterProvider router={router}/>);