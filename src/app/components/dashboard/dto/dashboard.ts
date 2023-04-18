export class DashboardDTO {
  cashRevenue;
  chequeRevenue;
  creditRevenue;
  hardwareCount;
  orderCount;
  productCount;
  totalRevenue;

  constructor(dashboardValue?:any){
    dashboardValue = dashboardValue || {};
    this.cashRevenue  = dashboardValue.cashRevenue || '';
    this.chequeRevenue  = dashboardValue.chequeRevenue || '';
    this.creditRevenue  = dashboardValue.creditRevenue || '';
    this.hardwareCount  = dashboardValue.hardwareCount || '';
    this.orderCount  = dashboardValue.orderCount || '';
    this.productCount  = dashboardValue.productCount || '';
    this.totalRevenue  = dashboardValue.totalRevenue || '';
  }
}
