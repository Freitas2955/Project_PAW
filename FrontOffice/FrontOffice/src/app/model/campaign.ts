import { SafeUrl } from "@angular/platform-browser";

export class Campaign{
    _id?:String;
    name?: String;
    description?: String;
    cost?: Number;
    partnerId?: String;
    partnerName?: String;
    imageUrl?: SafeUrl;
}