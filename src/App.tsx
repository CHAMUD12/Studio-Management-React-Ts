
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./components/RootLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Customer from "./pages/Customer.tsx";

function App() {
    const routes = createBrowserRouter([
        {
            path: "",
            element: <RootLayout />,
            children: [
                { path: "", element: <Dashboard /> },
                { path: "/customer", element: <Customer /> },
                // { path: "/item", element: <Item /> },
                // { path: "/place-order", element: <PlaceOrder /> }
            ]
        }
    ])

    return (
        <>
            <RouterProvider router={routes} />
        </>
    )
}

export default App
