import React, { useEffect, useState } from "react";
import { deleteRentalItem, getRentalItem, saveRentalItem, updateRentalItem } from "../reducers/RentalItemReducer";
import { AppDispatch } from "../store/store";
import { RentalItems } from "../models/RentalItems";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "react-feather";

function RentalItem() {
    const dispatch = useDispatch<AppDispatch>();
    const rentalItems = useSelector((state) => state.rentalItem);

    useEffect(() => {
        if (rentalItems.length === 0) {
            dispatch(getRentalItem());
        }
    }, [dispatch, rentalItems.length]);

    useEffect(() => {
        if (rentalItems.length > 0) {
            const maxId = Math.max(...rentalItems.map((item) => Number(item.RentalItemId)));
            setId(String(maxId + 1));
        } else {
            setId("1");
        }
    }, [rentalItems]);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    function handleAdd() {
        if (!id || !name || quantity <= 0 || price <= 0) {
            alert("All fields are required and quantity/price must be greater than 0!");
            return;
        }
        const newRentalItem = new RentalItems(id, name, quantity, price);
        dispatch(saveRentalItem(newRentalItem));
        resetForm();
    }

    const handleEdit = (item) => {
        setId(item.RentalItemId);
        setName(item.Name);
        setQuantity(item.Quantity);
        setPrice(item.Price);
        setIsEditing(true);
    };

    const handleUpdate = () => {
        if (!id || !name || quantity <= 0 || price <= 0) {
            alert("All fields are required and quantity/price must be greater than 0!");
            return;
        }
        const updatedRentalItem = new RentalItems(id, name, quantity, price);
        dispatch(updateRentalItem(updatedRentalItem));
        resetForm();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this rental item?")) {
            dispatch(deleteRentalItem(id));
        }
    };

    const resetForm = () => {
        setId("");
        setName("");
        setQuantity(0);
        setPrice(0);
        setIsEditing(false);
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-300">
            <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow-xl mt-4">
                {[
                    { label: "Rental Item ID", value: id, setter: setId, type: "text" },
                    { label: "Name", value: name, setter: setName, type: "text" },
                    { label: "Quantity", value: quantity, setter: setQuantity, type: "number" },
                    { label: "Price", value: price, setter: setPrice, type: "number" },
                ].map((field, index) => (
                    <div key={index} className="flex flex-col">
                        <label className="text-black font-bold text-sm mb-1">{field.label}</label>
                        <input
                            type={field.type}
                            value={field.value}
                            onChange={(e) => field.setter(field.type === "number" ? Number(e.target.value) : e.target.value)}
                            className="p-2 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
                            autoComplete="off"
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <button
                    onClick={handleAdd}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md w-36 mt-6"
                >
                    Add
                </button>
            </div>
            <div className="flex justify-end mt-4">
                {isEditing ? (
                    <button onClick={handleUpdate}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md mr-2">Update</button>
                ) : null}
                {isEditing && (
                    <button onClick={resetForm}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md">Cancel</button>
                )}
            </div>
            <div className="mt-6">
                <table className="w-full text-left border-collapse rounded-lg shadow-lg overflow-hidden">
                    <thead>
                    <tr className="bg-gradient-to-r from-blue-500 to-black text-white">
                        {["ID", "Name", "Quantity", "Price", "Actions"].map((heading, index) => (
                            <th key={index} className="px-6 py-3">{heading}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {rentalItems.map((item) => (
                        <tr key={item.RentalItemId}
                            className="bg-blue-100 border-b border-blue-300 hover:bg-blue-200 cursor-pointer"
                            onClick={() => handleEdit(item)}
                        >
                            <td className="px-6 py-2">{item.RentalItemId}</td>
                            <td className="px-6 py-2">{item.Name}</td>
                            <td className="px-6 py-2">{item.Quantity}</td>
                            <td className="px-6 py-2">{item.Price}</td>
                            <td className="px-6 py-2 text-center">
                                <button
                                    onClick={() => handleDelete(item.RentalItemId)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow-md flex items-center gap-1"
                                >
                                    <Trash2 size={16}/> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RentalItem;