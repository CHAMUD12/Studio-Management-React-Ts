import React, { useEffect, useState } from "react";
import { deleteInstructor, getInstructor, saveInstructor, updateInstructor } from "../reducers/InstructorReducer";
import { AppDispatch } from "../store/store";
import { Instructors } from "../models/Instructors";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "react-feather";
import { getCustomer } from "../reducers/CustomerReducer";

function Instructor() {
    const dispatch = useDispatch<AppDispatch>();
    const instructors = useSelector((state) => state.instructor);
    const customers = useSelector((state) => state.customer);

    useEffect(() => {
        if (customers.length === 0) {
            dispatch(getCustomer());
        }
        if (instructors.length === 0) {
            dispatch(getInstructor());
        }
    }, [dispatch, customers.length, instructors.length]);

    useEffect(() => {
        if (instructors.length > 0) {
            const maxId = Math.max(...instructors.map((instructor) => Number(instructor.InstructorId)));
            setId(String(maxId + 1));
        } else {
            setId("1");
        }
    }, [instructors]);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [customerId, setCustomerId] = useState(0);
    const [isEditing, setIsEditing] = useState(false);

    function handleAdd() {
        if (!id || !name || !address || !email || !mobile || !customerId) {
            alert("All fields are required!");
            return;
        }
        const newInstructor = new Instructors(id, name, address, email, mobile, customerId);
        dispatch(saveInstructor(newInstructor));
        resetForm();
    }

    const handleEdit = (instructor) => {
        setId(instructor.InstructorId);
        setName(instructor.Name);
        setAddress(instructor.Address);
        setEmail(instructor.Email);
        setMobile(instructor.Mobile);
        setCustomerId(instructor.CustomerId);
        setIsEditing(true);
    };

    const handleUpdate = () => {
        if (!id || !name || !address || !email || !mobile || !customerId) {
            alert("All fields are required!");
            return;
        }
        const updatedInstructor = new Instructors(id, name, address, email, mobile, customerId);
        dispatch(updateInstructor(updatedInstructor));
        resetForm();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this instructor?")) {
            dispatch(deleteInstructor(id));
        }
    };

    const resetForm = () => {
        setId("");
        setName("");
        setAddress("");
        setEmail("");
        setMobile("");
        setCustomerId(0);
        setIsEditing(false);
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-300">
            <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow-xl mt-4">
                {[
                    {label: "Instructors ID", value: id, setter: setId, type: "text"},
                    { label: "Name", value: name, setter: setName, type: "text" },
                    { label: "Address", value: address, setter: setAddress, type: "text", autoComplete: "street-address" },
                    { label: "Email", value: email, setter: setEmail, type: "email" },
                    { label: "Mobile", value: mobile, setter: setMobile, type: "tel", pattern: "[0-9]{10}" }
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
                <div className="flex flex-col">
                    <label className="text-black font-bold text-sm mb-1">Customer ID</label>
                    <select
                        value={customerId}
                        onChange={(e) => setCustomerId(Number(e.target.value))}
                        className="p-2 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
                    >
                        <option value={0}>Select Customer</option>
                        {customers.map((customer) => (
                            <option key={customer.CustomerId} value={customer.CustomerId}>
                                {customer.CustomerId}
                            </option>
                        ))}
                    </select>
                </div>
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
                        {["ID", "Name", "Address", "Email", "Mobile", "Customer ID", "Actions"].map((heading, index) => (
                            <th key={index} className="px-6 py-3">{heading}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {instructors.map((instructor) => (
                        <tr key={instructor.InstructorId}
                            className="bg-blue-100 border-b border-blue-300 hover:bg-blue-200 cursor-pointer"
                            onClick={() => handleEdit(instructor)}
                        >
                            <td className="px-6 py-2">{instructor.InstructorId}</td>
                            <td className="px-6 py-2">{instructor.Name}</td>
                            <td className="px-6 py-2">{instructor.Address}</td>
                            <td className="px-6 py-2">{instructor.Email}</td>
                            <td className="px-6 py-2">{instructor.Mobile}</td>
                            <td className="px-6 py-2">{instructor.CustomerId}</td>
                            <td className="px-6 py-2 text-center">
                                <button
                                    onClick={() => handleDelete(instructor.InstructorId)}
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

export default Instructor;