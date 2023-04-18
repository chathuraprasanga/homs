import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../../services/product/product.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products: any = [];

  productSearchForm : any =[];

  showFilter:boolean = false;

  constructor(private productService : ProductService,
              private router :Router,
              private formBuilder : FormBuilder
  ){}

  ngOnInit(): void {
    this.productService.onProductsChange.subscribe((products) =>{
      // console.log("hardwares",hardwares);
      this.products = products;
    });

    this.productSearchForm = this.formBuilder.group({
      productCode:[''],
      productStatus:['']
    });
  }

  //get hardware btn
  // getHardwares() {
  //   this.hardwareService.getHardwares();
  // }

  addEditProduct(product:any){
    // console.log("hardware",hardware);

    if (product!=null) {
      sessionStorage.setItem("productID",product.productID);
    }else {
      sessionStorage.removeItem("productID");
    }



    this.router.navigate(['/admin/products/add-edit'])

  }

  deleteProduct(productID){
    if (confirm("Are you sure to delete record?"))
    // console.log(productID);
    this.productService.deleteProduct(productID);

  }

  onSearch(){
    let data = this.productSearchForm.getRawValue();

    this.productService.getProducts(data);
    // console.log(data)
  }

  onClear(){
    this.productSearchForm.setValue({
      productCode:'',
      productStatus:''

    });

    this.onSearch();

  }

  showHideFilter(){
    this.showFilter = !this.showFilter
  }

}

