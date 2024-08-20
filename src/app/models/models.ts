export interface ApiResponse<T> {
    statusCode: number;
    isSuccess: boolean;
    errors: any[];
    result: T;
  }
  export interface DebitCard {
    cardNo: number;
    accountNo: number;
    cvv: number;
    pin: number;
    expiryDate: Date;
  }
  
  export interface DebitCardCreateDTO {
    accountNo: number;
  }