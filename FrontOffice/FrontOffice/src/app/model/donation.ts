export class Donation{
  _id?:String;
  entityId?:String|null;
  entityName: String="";
  donatorId?:String|null;
  donatorName:String="";
  camisolas:number=0;
  casacos:number=0;
  calcas:number=0;
  sapatos:number=0;
  acessorios:number=0;
  interior:number=0;
  dinheiro:number=0;
  approved:Boolean=false;
  points?:Number;
  updated_at:Date=new Date();
}