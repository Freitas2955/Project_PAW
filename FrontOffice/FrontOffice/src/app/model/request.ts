export class Request {
  _id?:String;
  donatorName?: String;
  donationId?: String;
  address?: String;
  postCode?: String;
  done?: Boolean;
  city?: String;
  entityName?: String;
  updated_at:Date=new Date();
}
