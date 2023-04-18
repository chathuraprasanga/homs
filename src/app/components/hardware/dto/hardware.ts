export class HardwareDTO {
  hardwareID;
  hardwareName;
  hardwareAddress;
  hardwareTel;
  hardwareEmail;
  hardwareStatus;

  constructor(hardware?:any){
    hardware = hardware || {};
    this.hardwareID  = hardware.hardwareID || null;
    this.hardwareName  = hardware.hardwareName || '';
    this.hardwareAddress  = hardware.hardwareAddress || '';
    this.hardwareTel  = hardware.hardwareTel || '';
    this.hardwareEmail  = hardware.hardwareEmail || '';
    this.hardwareStatus  = hardware.hardwareStatus || '';
  }
}
