export default class Booking {
    BookingId!: number;
    EventDate!: Date;
    CustomerId!: number;
    BookingDetails!: BookingDetails[];
}

export class BookingDetails {
    PackageId!: number;
    Price!: number;
    Advance!: number;
    get TotalPrice(): number {
        return this.Price - this.Advance;
    }
}
