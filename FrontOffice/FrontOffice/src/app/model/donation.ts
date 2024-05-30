export class Donation{
  _id?:String;
  entityId?:String;
  entityName?: String;
  donatorId?:String;
  donatorName?:String;
  camisolas?:Number;
  casacos?:Number;
  calcas?:Number;
  sapatos?:Number;
  acessorios?:Number;
  interior?:Number;
  dinheiro?:Number;
  approved?:Boolean;
  points?:Number;
  updated_at:Date=new Date();
}