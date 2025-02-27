import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { addBooking } from "../reducers/BookingReducer";
import { getCustomer } from "../reducers/CustomerReducer";
import { getEventPackages } from "../reducers/EventPackageReducer";
import {BookingDetails} from "../models/Booking.ts";
import {Customers} from "../models/Customers.ts";
import {EventPackages} from "../models/EventPackages.ts";


const BookingComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const customers = useSelector((state: any) => state.customer);
    const packages = useSelector((state: any) => state.eventPackage);
    const [selectedCustomerId, setSelectedCustomerId] = useState<number | "">("");
    const [selectedPackageId, setSelectedPackageId] = useState<number | "">("");
    const [eventDate, setEventDate] = useState("");
    const [advance, setAdvance] = useState<number>(0);
    const [cart, setCart] = useState<BookingDetails[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        dispatch(getCustomer());
        dispatch(getEventPackages());
    }, [dispatch]);

    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + (item.Price - item.Advance), 0);
        setTotalPrice(total);
    }, [cart]);

    const getCustomerName = () => {
        const customer = customers.find((c: Customers) =>
            Number(c.CustomerId) === Number(selectedCustomerId));
        return customer ? customer.Name : "";
    };

    const getPackageDetails = (packageId: number) => {
        return packages.find((p: EventPackages) =>
            Number(p.PackageId) === Number(packageId));
    };

    const handleAddToCart = () => {
        if (!selectedPackageId) return;

        const selectedPackage = getPackageDetails(selectedPackageId);
        if (selectedPackage) {
            const newItem: BookingDetails = {
                PackageId: selectedPackage.PackageId,
                Price: selectedPackage.Price,
                Advance: advance,
                TotalPrice: selectedPackage.Price - advance
            };
            setCart([...cart, newItem]);
            setAdvance(0);
            setSelectedPackageId("");
        }
    };

    const handleSubmit = () => {
        if (!selectedCustomerId || !eventDate || cart.length === 0) {
            alert("Please fill all required fields and add at least one package");
            return;
        }

        const newBooking: any = {
            CustomerId: Number(selectedCustomerId),
            EventDate: new Date(eventDate),
            BookingDetails: cart
        };

        dispatch(addBooking(newBooking));
        setCart([]);
        setSelectedCustomerId("");
        setEventDate("");
    };

    return (
        <div className="p-6 bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Create New Booking</h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Customer</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={selectedCustomerId}
                                onChange={(e) => setSelectedCustomerId(Number(e.target.value))}
                            >
                                <option value="">Select Customer</option>
                                {customers.map((customer: Customers) => (
                                    <option key={customer.CustomerId} value={customer.CustomerId}>
                                        {customer.CustomerId} - {customer.Name}
                                    </option>
                                ))}
                            </select>
                            {selectedCustomerId && (
                                <div className="mt-2">
                                    <p>Customer Name: {getCustomerName()}</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Event Date</label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Package</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={selectedPackageId}
                                onChange={(e) => setSelectedPackageId(Number(e.target.value))}
                            >
                                <option value="">Select Package</option>
                                {packages.map((pkg: EventPackages) => (
                                    <option key={pkg.PackageId} value={pkg.PackageId}>
                                        {pkg.Name} - ${pkg.Price}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Advance Payment</label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded"
                                value={advance}
                                onChange={(e) => setAdvance(Number(e.target.value))}
                            />
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Selected Packages</h3>
                    {cart.length === 0 ? (
                        <p className="text-gray-500">No packages selected</p>
                    ) : (
                        <div className="space-y-2">
                            {cart.map((item, index) => (
                                <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                    <div>
                                        <span className="font-medium">
                                            {getPackageDetails(item.PackageId)?.Name}
                                        </span>
                                        <span className="ml-4">Price: LKR {item.Price}</span>
                                        <span className="ml-4">Advance: LKR {item.Advance}</span>
                                        <span className="ml-4">Total: LKR {item.Price - item.Advance}</span>
                                    </div>
                                    <button
                                        onClick={() => setCart(cart.filter((_, i) => i !== index))}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-xl font-bold">
                        Total Price: LKR {totalPrice.toFixed(2)}
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingComponent;
