export class ProductDTO {
  productID;
  productCode;
  productName;
  productSize;
  productPrice;
  productStatus;

  constructor(product?:any){
    product = product || {};
    this.productID  = product.productID || null;
    this.productCode  = product.productCode || '';
    this.productName  = product.productName || '';
    this.productSize  = product.productSize || '';
    this.productPrice  = product.productPrice || '';
    this.productStatus  = product.productStatus || '';
  }
}
