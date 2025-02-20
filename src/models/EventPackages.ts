export class EventPackages {
    PackageId: string;
    Name: string;
    Description: string;
    Price: number;
    ImageBase64: string;

    constructor(PackageId: string, Name: string, Description: string, Price: number, ImageBase64: string) {
        this.PackageId = PackageId;
        this.Name = Name;
        this.Description = Description;
        this.Price = Price;
        this.ImageBase64 = ImageBase64;
    }
}
