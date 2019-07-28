export class User{
    // Model for a User
    _id: string;
    fname: String;
    lname: String;
    phone: Number;
    email: String;
    password: String;
    createdDate: Date;
    modifiedDate: Date;
    constructor(fname: String,lname: String, password: String, phone: Number, email: String){
        this.fname=fname;
        this.lname=lname;
        this.phone=phone;
        this.email=email;
        this.password=password;
        this.createdDate=new Date();
        this.modifiedDate=new Date();
    }
}
