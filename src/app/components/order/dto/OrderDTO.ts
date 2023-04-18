export class OrderDTO {
  orderID;
  invoiceNumber;
  orderDate;
  hardwareID
  hardwareName;
  productID;
  productCode;
  productName;
  productPrice;
  orderQuantity;
  orderAmount;
  paymentMethod;
  paymentStatus;

  constructor(order?:any){
    order = order || {};
    this.orderID  = order.orderID || null;
    this.invoiceNumber  = order.invoiceNumber || '';
    this.orderDate  = order.orderDate || '';
    this.hardwareID  = order.hardwareID || '';
    this.hardwareName  = order.hardwareName || '';
    this.productCode  = order.productCode || '';
    this.productID  = order.productID || '';
    this.productName  = order.productName || '';
    this.productPrice = order.productPrice || '';
    this.orderQuantity  = order.orderQuantity || '';
    this.orderAmount  = order.orderAmount || '';
    this.paymentMethod  = order.paymentMethod || '';
    this.paymentStatus  = order.paymentStatus || '';
  }
}
