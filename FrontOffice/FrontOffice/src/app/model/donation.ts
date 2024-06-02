export class Donation{
  _id?:String;
  entityId?:String;
  entityName?: String;
  donatorId?:string|null;
  donatorName?:String;
  camisolas:number=0;
  casacos:number=0;
  calcas:number=0;
  sapatos:number=0;
  acessorios:number=0;
  interior:number=0;
  dinheiro:number=0;
  approved?:Boolean;
  points?:Number;
  updated_at:Date=new Date();
}