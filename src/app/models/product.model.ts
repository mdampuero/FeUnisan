export class Product {
    public name!: string;
    public code!: string;
    public description!: string;
    public price!: number;
    public subtotal: number;
    public quantity = 0;
    constructor(fields?: any) {
        this.name=fields.name;
        this.code=fields.code;
        this.description=fields.description;
        this.price=fields.price;
        this.subtotal=fields.subtotal;
        this.subtotal = this.price * this.quantity;
    }
}
