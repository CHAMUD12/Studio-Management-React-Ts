export default class Rental {
    RentalId?: number;
    CustomerId!: number;
    RentedAt!: Date;
    ReturnBy!: Date;
    RentingDetails!: RentingDetails[];
    TotalAmount!: number;
}

export class RentingDetails {
    RentalItemId!: number;
    Price!: number;
    Quantity?: number;
}
