export class RentalItems {
    RentalItemId: string;
    Name: string;
    Quantity: number;
    Price: number;

    constructor(RentalItemId: string, Name: string, Quantity: number, Price: number) {
        this.RentalItemId = RentalItemId;
        this.Name = Name;
        this.Quantity = Quantity;
        this.Price = Price;
    }
}