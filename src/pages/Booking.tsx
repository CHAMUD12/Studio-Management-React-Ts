import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { addBooking } from "../reducers/BookingReducer";
import { getCustomer } from "../reducers/CustomerReducer";
import { getEventPackages } from "../reducers/EventPackageReducer";
import {BookingDetails} from "../models/Booking.ts";
import {Customers} from "../models/Customers.ts";
import {EventPackages} from "../models/EventPackages.ts";
import {Trash2} from "react-feather";

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
        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-300">
            <div className="bg-white p-6 rounded-xl shadow-xl mt-4">
                <h2 className="text-2xl font-bold mb-4 text-blue-800">Create New Booking</h2>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-black font-bold text-sm mb-1">Customer</label>
                            <select
                                className="p-2 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
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
                                <div className="mt-2 text-blue-600 font-medium">
                                    Customer Name: {getCustomerName()}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label className="text-black font-bold text-sm mb-1">Event Date</label>
                            <input
                                type="date"
                                className="p-2 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-black font-bold text-sm mb-1">Package</label>
                            <select
                                className="p-2 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
                                value={selectedPackageId}
                                onChange={(e) => setSelectedPackageId(Number(e.target.value))}
                            >
                                <option value="">Select Package</option>
                                {packages.map((pkg: EventPackages) => (
                                    <option key={pkg.PackageId} value={pkg.PackageId}>
                                        {pkg.Name} - LKR {pkg.Price}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-black font-bold text-sm mb-1">Advance Payment</label>
                            <input
                                type="number"
                                className="p-2 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
                                value={advance}
                                onChange={(e) => setAdvance(Number(e.target.value))}
                            />
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md w-full mt-2"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-blue-800">Selected Packages</h3>
                    {cart.length === 0 ? (
                        <p className="text-gray-500 p-4 bg-blue-50 rounded-lg">No packages selected</p>
                    ) : (
                        <div className="space-y-2">
                            {cart.map((item, index) => (
                                <div key={index} className="flex justify-between items-center bg-blue-100 p-4 rounded-lg hover:bg-blue-200 transition-colors">
                                    <div className="flex-1">
                                        <span className="font-medium text-blue-800">
                                            {getPackageDetails(item.PackageId)?.Name}
                                        </span>
                                        <div className="grid grid-cols-3 gap-4 mt-2">
                                            <span>Price: LKR {item.Price}</span>
                                            <span>Advance: LKR {item.Advance}</span>
                                            <span>Total: LKR {item.Price - item.Advance}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setCart(cart.filter((_, i) => i !== index))}
                                        className="text-red-500 hover:text-red-700 flex items-center gap-1"
                                    >
                                        <Trash2 size={16} /> Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center mt-8 border-t pt-4">
                    <div className="text-xl font-bold text-blue-800">
                        Total Price: LKR {totalPrice.toFixed(2)}
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2"
                    >
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingComponent;
