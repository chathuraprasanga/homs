export class UserDTO {
  userID;
  userName;
  userPassword;
  userRole;
  userStatus;

  constructor(user?:any){
    user = user || {};
    this.userID  = user.userID || null;
    this.userName  = user.userName || '';
    this.userPassword  = user.userPassword || '';
    this.userRole = user.userRole || '';
    this.userStatus  = user.userStatus || '';
  }
}
