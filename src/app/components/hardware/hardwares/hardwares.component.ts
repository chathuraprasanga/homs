import {Component, OnInit} from '@angular/core';
import {HardwareService} from "../../../services/hardware/hardware.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-hardwares',
  templateUrl: './hardwares.component.html',
  styleUrls: ['./hardwares.component.css']
})
export class HardwaresComponent implements OnInit{

  hardwares: any = [];

  hardwareSearchForm: FormGroup;

  showFilter:boolean = false;

  constructor(private hardwareService : HardwareService,
              private router :Router,
              private formBuilder :FormBuilder

  ){}

  ngOnInit(): void {
    this.hardwareService.onHardwaresChange.subscribe((hardwares) =>{
      // console.log("hardwares",hardwares);
      this.hardwares = hardwares;
    });

    this.hardwareSearchForm = this.formBuilder.group({
      hardwareName:[''],
      hardwareAddress:[''],
      hardwareTel:[''],
      hardwareStatus:['']
    });
  }

  //get hardware btn
  // getHardwares() {
  //   this.hardwareService.getHardwares();
  // }

  addEditHardware(hardware:any){
    // console.log("hardware",hardware);

    if (hardware!=null) {
      sessionStorage.setItem("hardwareID",hardware.hardwareID);
    }else {
      sessionStorage.removeItem("hardwareID");
    }



    this.router.navigate(['/admin/hardwares/add-edit'])

  }

  deleteHardware(hardwareID){
    // console.log(orderID);
    if (confirm("Are you sure to delete record?"))
    this.hardwareService.deletehardware(hardwareID);

  }

  onSearch(){
    let data = this.hardwareSearchForm.getRawValue();

    this.hardwareService.getHardwares(data);
    // console.log(data)
  }

  onClear(){
    this.hardwareSearchForm.setValue({
      hardwareName:'',
      hardwareAddress:'',
      hardwareTel:'',
      hardwareStatus:''

    });

    this.onSearch();

  }

  showHideFilter(){
    this.showFilter = !this.showFilter
  }

}
