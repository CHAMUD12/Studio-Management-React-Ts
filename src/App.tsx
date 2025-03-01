
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import {RootLayout} from "./components/RootLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Customer from "./pages/Customer.tsx";
import Instructor from "./pages/Instructor.tsx";
import RentalItem from "./pages/RentalItem.tsx";
import EventPackage from "./pages/EventPackage.tsx";
import Booking from "./pages/Booking.tsx";
import Rental from "./pages/Rental.tsx";

function App() {
    const routes = createBrowserRouter([
        {
            path: "",
            element: <RootLayout />,
            children: [
                { path: "", element: <Dashboard /> },
                { path: "/customer", element: <Customer /> },
                { path: "/instructor", element: <Instructor /> },
                { path: "/rentalItem", element: <RentalItem /> },
                { path: "/eventPackage", element: <EventPackage /> },
                { path: "/booking", element: <Booking /> },
                { path: "/rental", element: <Rental /> },

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
