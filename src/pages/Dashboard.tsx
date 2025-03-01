import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { getBookings } from "../reducers/BookingReducer";
import { Trash2 } from "react-feather";
import { BookingDetails } from "../models/Booking.ts";

export default function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const { bookings, status, error } = useSelector((state: any) => state.booking);

    useEffect(() => {
        dispatch(getBookings());
    }, [dispatch]);

    const calculateTotal = (details: BookingDetails[]) => {
        return details.reduce((sum, item) => sum + (item.Price - item.Advance), 0);
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen">
            <h1 className="text-3xl font-bold text-blue-800 mb-8">Studio C - All Bookings</h1>

            {status === 'loading' && (
                <div className="text-center text-blue-600">Loading bookings...</div>
            )}

            {error && (
                <div className="text-red-500 p-4 bg-white rounded-xl shadow-xl mb-4">
                    Error: {error}
                </div>
            )}

            <div className="space-y-6">
                {bookings.map((booking: any) => (
                    <div key={booking.BookingId} className="bg-white p-6 rounded-xl shadow-xl">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-blue-800">
                                    Customer ID: {booking.CustomerId}
                                </h2>
                                <p className="text-gray-600">
                                    Event Date: {new Date(booking.EventDate).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-blue-800">
                                    Total: LKR {calculateTotal(booking.BookingDetails).toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Booking ID: #{booking.BookingId}
                                </p>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="text-sm font-semibold text-blue-800 mb-2">Packages:</h3>
                            <div className="space-y-3">
                                {booking.BookingDetails.map((detail: BookingDetails, index: number) => (
                                    <div key={index} className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
                                        <div className="flex-1">
                      <span className="font-medium text-blue-800">
    Package ID: {detail.PackageId}
</span>

                                            <div className="grid grid-cols-3 gap-4 mt-2">
                                                <span>Price: LKR {detail.Price}</span>
                                                <span>Advance: LKR {detail.Advance}</span>
                                                <span>Total: LKR {(detail.Price - detail.Advance).toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <button className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {bookings.length === 0 && status === 'succeeded' && (
                <div className="text-center text-gray-500 p-8 bg-white rounded-xl shadow-xl">
                    No bookings found
                </div>
            )}
        </div>
    );
}
