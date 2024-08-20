import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { BankAccountService } from '../services/bank-account.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  accountDetails: any = null;
  accountNumber: string; 
  cardNo: number = 0;
  pin: number = 0;
  cvv: number = 0;
  expiryDate: string = '';
  withdrawamount: number = 0;
  depositamount: number = 0;
  errorMessage: string = '';

  constructor(
    private bankAccountService: BankAccountService, 
    private customerService: CustomerService,
    private router: Router,
    private matdialog : MatDialog
  ) {
    this.accountNumber = sessionStorage.getItem('accountNumber')!;
  }

  ngOnInit(): void {
    // this.loadAccountDetails();
  }

  loadAccountDetails(): void {
    this.bankAccountService.GetAccount(this.accountNumber).subscribe(
      response => this.accountDetails = response.result,
      (error: HttpErrorResponse) => this.handleError(error, 'Error loading account details')
    );
  }

  deposit(): void {
    this.customerService.depositamount(this.cardNo, this.pin, this.cvv, this.expiryDate, this.accountNumber, this.depositamount).subscribe(
      () => {
        this.loadAccountDetails();
        this.errorMessage = ''; // Clear error message on success
      },
      (error: HttpErrorResponse) => this.handleError(error, 'Error depositing amount')
    );
  }

  withdraw(): void {
    this.customerService.withdrawamount(this.cardNo, this.pin, this.cvv, this.expiryDate, this.accountNumber, this.withdrawamount).subscribe(
      () => {
        this.loadAccountDetails();
        this.errorMessage = ''; // Clear error message on success
      },
      (error: HttpErrorResponse) => this.handleError(error, 'Error withdrawing amount')
    );
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  private handleError(error: HttpErrorResponse, contextMessage: string): void {
    const errorMessage = error.error instanceof ErrorEvent ?
      `${contextMessage}: ${error.error.message}` :
      `${contextMessage}: Please Check your Card Details ${error.error.message}`;

    this.matdialog.open(ErrorDialogComponent, {
      data: {
        title: 'Operation Failed',
        message: errorMessage
      }
    });

    console.error(`${contextMessage}:`, error);
  }
}
