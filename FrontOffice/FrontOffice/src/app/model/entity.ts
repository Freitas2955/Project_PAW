import { SafeUrl } from "@angular/platform-browser";

export class Entity{
    _id?: String;
    name?: String;
    description?: String;
    address?: String;
    city?: String;
    postCode?: String;
    email?: String;
    password?: String;
    phone?: Number;
    approved?: Boolean;
    imageUrl?: SafeUrl;
}