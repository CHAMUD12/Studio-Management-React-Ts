import React, { useEffect, useState } from "react";
import { deleteEventPackage, getEventPackages, saveEventPackage, updateEventPackage } from "../reducers/EventPackageReducer";
import { AppDispatch } from "../store/store";
import { EventPackages } from "../models/EventPackages";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "react-feather";

function EventPackage() {
    const dispatch = useDispatch<AppDispatch>();
    const eventPackages = useSelector((state) => state.eventPackage);

    useEffect(() => {
        if (eventPackages.length === 0) {
            dispatch(getEventPackages());
        }
    }, [dispatch, eventPackages.length]);

    useEffect(() => {
        if (eventPackages.length > 0) {
            const maxId = Math.max(...eventPackages.map((pkg) => Number(pkg.PackageId)));
            setId(String(maxId + 1));
        } else {
            setId("1");
        }
    }, [eventPackages]);

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [imageBase64, setImageBase64] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    function handleAdd() {
        if (!id || !name || !description || price <= 0 || !imageBase64) {
            alert("All fields are required, and price must be greater than 0!");
            return;
        }
        const newEventPackage = new EventPackages(id, name, description, price.toString(), imageBase64);
        dispatch(saveEventPackage(newEventPackage));
        resetForm();
    }

    const handleEdit = (pkg) => {
        setId(pkg.PackageId);
        setName(pkg.Name);
        setDescription(pkg.Description);
        setPrice(pkg.Price);
        setImageBase64(pkg.ImageBase64);
        setIsEditing(true);
    };

    const handleUpdate = () => {
        if (!id || !name || !description || price <= 0 || !imageBase64) {
            alert("All fields are required, and price must be greater than 0!");
            return;
        }
        const updatedEventPackage = new EventPackages(id, name, description, price.toString(), imageBase64);
        dispatch(updateEventPackage(updatedEventPackage));
        resetForm();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this event package?")) {
            dispatch(deleteEventPackage(id));
        }
    };

    const resetForm = () => {


        setId("");
        setName("");
        setDescription("");
        setPrice(0);
        setImageBase64("");

        setFileName(""); // Clear the file name

        setIsEditing(false);

    };

    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setImageBase64(reader.result as string);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }



    const [fileName, setFileName] = useState("");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name); // Set the file name
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-300">
            <div className="grid grid-cols-3 gap-4 bg-white p-6 rounded-xl shadow-xl mt-4">
                {[
                    { label: "Package ID", value: id, setter: setId, type: "text" },
                    { label: "Name", value: name, setter: setName, type: "text" },
                    { label: "Description", value: description, setter: setDescription, type: "text" },
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


                {/*<div className="flex flex-col">*/}
                {/*    <label className="text-black font-bold text-sm mb-1">Image</label>*/}
                {/*    <input*/}
                {/*        type="file"*/}
                {/*        accept="image/*"*/}
                {/*        onChange={handleImageUpload}*/}
                {/*        className="p-2 bg-gray-200 rounded-lg shadow-sm focus:outline-none"*/}
                {/*    />*/}
                {/*</div>*/}


                {/*// In the JSX, display the file name*/}
                <div className="flex flex-col">
                    <label className="text-black font-bold text-sm mb-1">Image</label>
                    <input
                        type="file"
                        accept="image/*"

                        ref={fileInputRef} // Connect the ref here


                        onChange={handleImageUpload}
                        className="p-2 bg-gray-200 rounded-lg shadow-sm focus:outline-none"
                    />
                    {fileName && <span className="text-sm mt-1">{fileName}</span>} {/* Display file name */}
                    {imageBase64 && (
                        <div className="mt-2">
                            <img
                                src={imageBase64}
                                alt="Event Package Preview"
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                        </div>
                    )}
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
                        {["ID", "Name", "Description", "Price", "Image", "Actions"].map((heading, index) => (
                            <th key={index} className="px-6 py-3">{heading}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {eventPackages.map((pkg) => (
                        <tr key={pkg.PackageId}
                            className="bg-blue-100 border-b border-blue-300 hover:bg-blue-200 cursor-pointer"
                            onClick={() => handleEdit(pkg)}
                        >
                            <td className="px-6 py-2">{pkg.PackageId}</td>
                            <td className="px-6 py-2">{pkg.Name}</td>
                            <td className="px-6 py-2">{pkg.Description}</td>
                            <td className="px-6 py-2">{pkg.Price}</td>
                            <td className="px-6 py-2">
                                <img src={pkg.ImageBase64} alt="Event Package" className="w-16 h-16 object-cover rounded-lg"/>
                            </td>
                            <td className="px-6 py-2 text-center">
                                <button
                                    onClick={() => handleDelete(pkg.PackageId)}
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

export default EventPackage;