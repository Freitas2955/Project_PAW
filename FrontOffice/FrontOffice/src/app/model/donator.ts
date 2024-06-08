import { SafeUrl } from "@angular/platform-browser";

export class Donator {
  _id?:String;
  name: String="";
  phone: Number=0;
  email?: String;
  address?: String;
  postCode?: String;
  city: String="";
  password?: String;
  points?: Number;
  imageUrl?: SafeUrl;
}
