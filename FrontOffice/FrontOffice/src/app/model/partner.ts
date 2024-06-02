import { SafeUrl } from "@angular/platform-browser";

export class Partner {
  _id?:String;
  name?: String;
  phone?: Number;
  address?: String;
  postCode?: String;
  city?: String;
  description?: String;
  email?: String;
  password?: String;
  approved?: Boolean;
  imageUrl?: SafeUrl;
}
