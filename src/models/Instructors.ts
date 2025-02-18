export class Instructors {
    InstructorId: number;
    Name: string;
    Address: string;
    Email: string;
    Mobile: string;
    CustomerId: number;

    constructor(InstructorId: number, Name: string, Address: string, Email: string, Mobile: string, CustomerId: number) {
        this.InstructorId = InstructorId;
        this.Name = Name;
        this.Address = Address;
        this.Email = Email;
        this.Mobile = Mobile;
        this.CustomerId = CustomerId;
    }
}
