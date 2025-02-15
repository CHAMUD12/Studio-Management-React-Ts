import React, {useEffect, useState} from "react";
import {deleteCustomer, getCustomer, saveCustomer, updateCustomer} from "../reducers/CustomerReducer.ts";
import {AppDispatch} from "../store/store.tsx";
import {Customers} from "../models/Customers.ts";
import {useDispatch, useSelector} from "react-redux";
import {Trash2} from "react-feather";

function Customer() {
    const dispatch = useDispatch<AppDispatch>();
    const customers = useSelector((state) => state.customer);

    useEffect(() => {
        if (customers.length === 0) {
            dispatch(getCustomer());
        }
    }, [dispatch, customers.length]);

    useEffect(() => {
        if (customers.length > 0) {
            const maxId = Math.max(...customers.map((customer) => Number(customer.CustomerId)));
            setId(String(maxId + 1));
        } else {
            setId("1");
        }
    }, [customers]);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    function handleAdd() {
        if (!id || !name || !email || !address || !mobile) {
            alert("All fields are required!");
            return;
        }
        const newCustomer = new Customers(id, name, email, address, mobile);
        dispatch(saveCustomer(newCustomer));
        resetForm();
    }

    const handleEdit = (customer) => {
        setId(customer.CustomerId);
        setName(customer.Name);
        setEmail(customer.Email);
        setAddress(customer.Address);
        setMobile(customer.Mobile);
        setIsEditing(true);
    };

    const handleUpdate = () => {
        if (!id || !name || !email || !address || !mobile) {
            alert("All fields are required!");
            return;
        }
        const updatedCustomer = new Customers(id, name, email, address, mobile);
        dispatch(updateCustomer(updatedCustomer));
        resetForm();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            dispatch(deleteCustomer(id));
        }
    };

    const resetForm = () => {
        setId("");
        setName("");
        setEmail("");
        setAddress("");
        setMobile("");
        setIsEditing(false);
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-300">
            <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow-xl mt-4">
                {[
                    {label: "Customer ID", value: id, setter: setId, type: "text"},
                    {label: "Name", value: name, setter: setName, type: "text"},
                    {label: "Email", value: email, setter: setEmail, type: "email"},
                    {
                        label: "Address",
                        value: address,
                        setter: setAddress,
                        type: "text",
                        autoComplete: "street-address"
                    },
                    {label: "Mobile", value: mobile, setter: setMobile, type: "tel", pattern: "[0-9]{10}"}
                ].map((field, index) => (
                    <div key={index} className="flex flex-col">
                        <label className="text-black font-bold text-sm mb-1">{field.label}</label>
                        <input
                            type={field.type}
                            value={field.value}
                            onChange={(e) => field.setter(e.target.value)}
                            className="p-2 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
                            autoComplete={field.autoComplete || "off"}
                            pattern={field.pattern || undefined}
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
                        {["ID", "Name", "Email", "Address", "Mobile", "Actions"].map((heading, index) => (
                            <th key={index} className="px-6 py-3">{heading}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.CustomerId}
                            className="bg-blue-100 border-b border-blue-300 hover:bg-blue-200 cursor-pointer"
                            onClick={() => handleEdit(customer)}
                        >
                            <td className="px-6 py-2">{customer.CustomerId}</td>
                            <td className="px-6 py-2">{customer.Name}</td>
                            <td className="px-6 py-2">{customer.Email}</td>
                            <td className="px-6 py-2">{customer.Address}</td>
                            <td className="px-6 py-2">{customer.Mobile}</td>
                            <td className="px-6 py-2 text-center">
                                <button
                                    onClick={() => handleDelete(customer.CustomerId)}
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

export default Customer;