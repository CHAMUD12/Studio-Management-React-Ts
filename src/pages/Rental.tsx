import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { addRental, fetchCustomers, fetchRentalItems } from "../reducers/RentalReducer";
import Rental, { RentingDetails } from "../models/Rental";
import { RootState } from "@reduxjs/toolkit/query";
import { Trash2 } from "react-feather";
import RentalDetailsCard from "./RentalDetailsCard.tsx";

interface CartItem extends RentingDetails {
    Name: string;
    Quantity: number;
    TotalPrice: number;
}

const RentalComponent = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { customers, rentalItems, status, error } = useSelector((state: RootState) => state.rental);

    const [selectedCustomerId, setSelectedCustomerId] = useState<number | "">("");
    const [selectedRentalItemId, setSelectedRentalItemId] = useState<number | "">("");
    const [quantity, setQuantity] = useState<number>(1);
    const [rentedAt, setRentedAt] = useState("");
    const [returnBy, setReturnBy] = useState("");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);

    const customersList = Array.isArray(customers) ? customers : [];
    const rentalItemsList = Array.isArray(rentalItems) ? rentalItems : [];

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            dispatch(fetchCustomers()),
            dispatch(fetchRentalItems())
        ]).then(() => setIsLoading(false))
            .catch(error => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });
    }, [dispatch]);

    useEffect(() => {
        const total = cart.reduce((sum, item) => sum + item.TotalPrice, 0);
        setTotalAmount(total);
    }, [cart]);

    const handleAddToCart = () => {
        if (!selectedRentalItemId) return;

        const rentalItem = rentalItemsList.find(item => Number(item.RentalItemId) === Number(selectedRentalItemId));
        if (!rentalItem) return;

        const price = Number(rentalItem.Price);
        if (isNaN(price)) return;

        const itemTotalPrice = price * quantity;
        const existingItemIndex = cart.findIndex(item => item.RentalItemId === rentalItem.RentalItemId);

        if (existingItemIndex >= 0) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex].Quantity += quantity;
            updatedCart[existingItemIndex].TotalPrice = price * updatedCart[existingItemIndex].Quantity;
            setCart(updatedCart);
        } else {
            setCart([...cart, {
                RentalItemId: rentalItem.RentalItemId,
                Name: rentalItem.Name,
                Price: price,
                Quantity: quantity,
                TotalPrice: itemTotalPrice
            }]);
        }

        setSelectedRentalItemId("");
        setQuantity(1);
    };

    const handleRemoveFromCart = (index: number) => {
        setCart(cart.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        if (!selectedCustomerId || !rentedAt || !returnBy || cart.length === 0) {
            alert("Please fill all required fields and add at least one rental item.");
            return;
        }

        const rentingDetails: RentingDetails[] = cart.map(item => ({
            RentalItemId: item.RentalItemId,
            Price: item.Price,
            Quantity: item.Quantity
        }));

        const newRental: Rental = {
            CustomerId: Number(selectedCustomerId),
            RentedAt: new Date(rentedAt),
            ReturnBy: new Date(returnBy),
            RentingDetails: rentingDetails,
            TotalAmount: totalAmount
        };

        dispatch(addRental(newRental))
            .unwrap()
            .then(() => {
                setCart([]);
                setSelectedCustomerId("");
                setRentedAt("");
                setReturnBy("");
                alert("Success Order!");
            })
            .catch((error) => {
                console.error("Failed to add rental:", error);
            });
    };

    if (isLoading) return <p>Loading data...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-300">
            <div className="bg-white p-6 rounded-xl shadow-xl mt-4">
                <h2 className="text-2xl font-bold mb-4 text-blue-800">Create New Rental</h2>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-black font-bold text-sm mb-1">Customer</label>
                            <select
                                className="p-2 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
                                value={selectedCustomerId}
                                onChange={(e) => setSelectedCustomerId(Number(e.target.value) || "")}
                            >
                                <option value="">Select Customer</option>
                                {customersList.map(customer => (
                                    <option key={customer.CustomerId} value={customer.CustomerId}>
                                        {customer.Name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-black font-bold text-sm mb-1">Rented At</label>
                            <input
                                type="date"
                                className="p-2 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
                                value={rentedAt}
                                onChange={(e) => setRentedAt(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-black font-bold text-sm mb-1">Return By</label>
                            <input
                                type="date"
                                className="p-2 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
                                value={returnBy}
                                onChange={(e) => setReturnBy(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-black font-bold text-sm mb-1">Rental Item</label>
                            <select
                                className="p-2 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
                                value={selectedRentalItemId}
                                onChange={(e) => setSelectedRentalItemId(Number(e.target.value) || "")}
                            >
                                <option value="">Select Rental Item</option>
                                {rentalItemsList.map(item => (
                                    <option key={item.RentalItemId} value={item.RentalItemId}>
                                        {item.Name} - LKR {Number(item.Price).toFixed(2)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-black font-bold text-sm mb-1">Quantity</label>
                            <input
                                type="number"
                                min="1"
                                className="p-2 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                            />
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md w-full mt-2"
                            disabled={!selectedRentalItemId}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-blue-800">Selected Rental Items</h3>
                    {cart.length === 0 ? (
                        <p className="text-gray-500 p-4 bg-blue-50 rounded-lg">No rental items selected</p>
                    ) : (
                        <div className="space-y-2">
                            {cart.map((item, index) => (
                                <div key={index} className="flex justify-between items-center bg-blue-100 p-4 rounded-lg hover:bg-blue-200 transition-colors">
                                    <div className="flex-1">
                                        <span className="font-medium text-blue-800">
                                            {item.Name}
                                        </span>
                                        <div className="grid grid-cols-3 gap-4 mt-2">
                                            <span>Price: LKR {item.Price.toFixed(2)}</span>
                                            <span>Quantity: {item.Quantity}</span>
                                            <span>Total: LKR {item.TotalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveFromCart(index)}
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
                        Total Amount: LKR {totalAmount.toFixed(2)}
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2"
                        disabled={cart.length === 0 || !selectedCustomerId || !rentedAt || !returnBy}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RentalComponent;
