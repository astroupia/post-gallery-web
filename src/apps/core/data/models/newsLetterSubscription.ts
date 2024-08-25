import Model from "@/lib/models/model";


export default class NewsLetterSubscription implements Model<string>{

    email: string;

    constructor(email: string){
        this.email = email;
    }

    getPK(): string | null {
        return this.email;
    }

    setPK(pk: string): void {
        Error("Not Allowed");
    }

}