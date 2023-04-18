import {Component, OnDestroy, OnInit} from '@angular/core';
import {HardwareAddEditService} from "../../../services/hardware/hardware-add-edit.service";
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HardwareDTO} from "../dto/hardware";
import * as _ from 'underscore';
import {Location} from "@angular/common";

@Component({
  selector: 'app-hardware-add-edit',
  templateUrl: './hardware-add-edit.component.html',
  styleUrls: ['./hardware-add-edit.component.css']
})
export class HardwareAddEditComponent implements OnInit, OnDestroy{

  hardwareForm : FormGroup;
  hardware = new HardwareDTO();
  pageType: string;

  onHardwareChangeSub = new Subscription();

  constructor(
    private hardwareAddEditService : HardwareAddEditService,
    private formBuilder : FormBuilder,
    private location : Location

  ){}

  ngOnInit(): void {
    this.onHardwareChangeSub = this.hardwareAddEditService.hardware
      .subscribe((hardware) => {
        if (!_.isEmpty(hardware)){
          console.log(hardware);
          this.hardware = new HardwareDTO(hardware);
          this.pageType ='edit';
        }else {
          this.hardware = new HardwareDTO();
          this.pageType = 'new';
        }
      // console.log("hardware" , this.hardware)
        this.hardwareForm = this.createForm();
    })
  }

  ngOnDestroy(): void {
    this.onHardwareChangeSub.unsubscribe();
  }

  createForm(){
    return this.formBuilder.group({
      hardwareID: [this.hardware.hardwareID],
      hardwareName: [this.hardware.hardwareName,[Validators.required]],
      hardwareAddress : [this.hardware.hardwareAddress,[Validators.required]],
      hardwareTel : [this.hardware.hardwareTel,[Validators.required]],
      hardwareEmail : [this.hardware.hardwareEmail,[Validators.required]],
      hardwareStatus : [this.hardware.hardwareStatus,[Validators.required]]
    })
  }

  isValid(){
    return this.hardwareForm.valid;
  }

  isDirty(){
    return this.hardwareForm.dirty;
  }

  goBack(){
    // console.log("click")
    // this.router.navigate(['admin/orders']) //using router link
    this.location.back();
  }

  saveHardware(){
    let hardware = this.hardwareForm.getRawValue();
    console.log("get data", hardware);
    this.hardwareAddEditService.saveHardware(hardware);
    if (hardware){
      alert("Data Saved");
      this.location.back()
    }

  }

}
