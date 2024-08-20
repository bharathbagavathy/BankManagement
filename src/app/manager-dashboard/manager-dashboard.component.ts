import { Component, OnInit } from '@angular/core';
import { BankAccountService } from '../services/bank-account.service';
import { ApiResponse, DebitCard } from '../models/models';
import { Router } from '@angular/router';
import { DebitCardService } from '../services/debit-card.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {
  bankAccounts: any[] = [];
  selectedAccount: any = null;
  debitCards: DebitCard[] = [];
  alertMessage: string | null = null;
  alertType: string = 'success';
  updatesuccessMessage: string | null = null;
  createSuccessMessage: string | null = null;
  createCardSuccessMessage: string | null = null;
  searchAccountNumber: string = '';
  debitCardMap: { [accountNumber: string]: DebitCard } = {}; 

  constructor(private bankAccountService: BankAccountService, private router: Router, private debitCardService: DebitCardService) {}

  ngOnInit(): void {
    this.loadBankAccounts();
    this.loadDebitCards();
  }

  

  loadBankAccounts(): void {
    this.bankAccountService.GetAccounts().subscribe(
      (response: ApiResponse<any[]>) => {
        this.bankAccounts = Array.isArray(response.result) ? response.result : [];
      },
      (error) => console.error('Error loading bank accounts', error)
    );
  }
  
  showAlert(message: string, type: string = 'success') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000); // Automatically hide after 3 seconds
  }

  closeAlert() {
    this.alertMessage = null;
  }


  loadBankAccount(accountNumber : string): void {
    if (this.searchAccountNumber) {
      this.bankAccountService.GetAccount(this.searchAccountNumber).subscribe(
        (response: ApiResponse<any>) => {
          if (response.isSuccess) {
            this.bankAccounts = [response.result];
          } else {
            alert('Account not found:');
          }
        },
        (error) => console.error('Error searching account', error)
      );
    } else {
      this.loadBankAccounts(); // Load all accounts if no search term is entered
    }
  }
  createBankAccount(accountData: any): void {
    
    this.bankAccountService.CreateAccount(accountData).subscribe(
      () => {
        
        this.createSuccessMessage='Account Created Successfully',
        this.loadBankAccounts()
      },
      (error) => console.error('Error creating account', error)
    );
  }

  createCard(accountNumber: number): void {
    this.debitCardService.createCard(accountNumber).subscribe(
      (response: ApiResponse<DebitCard>) => {
        if (response.isSuccess ) {
          this.showAlert('Debit card created successfully!', 'success');
          this.loadDebitCards();
        } else {
          this.showAlert('Failed to create debit card.', 'danger');
        }
      },
      (error) => console.error('Error creating debit card', error)
    );
  }
  hasDebitCard(accountNumber: string): boolean {
    return !!this.debitCardMap[accountNumber.toString()];
  }

  loadDebitCards(): void {
    this.debitCardService.getAllCards().subscribe(
      (response: ApiResponse<DebitCard[]>) => {
        if (response.isSuccess) {
          this.debitCards = response.result || [];
          this.debitCardMap = this.debitCards.reduce((map, card) => {
            map[card.accountNo.toString()] = card;
            return map;
          }, {}as { [key: string]: DebitCard });
        } else {
          console.error('Failed to load debit cards:', response.errors);
        }
      },
      (error) => console.error('Error loading debit cards', error)
    );
  }

  deleteCard(accNo: number) {
    this.debitCardService.deleteCard(accNo).subscribe(
      response => {
       this.showAlert('Card Deleted Successfully', 'success');
        this.loadDebitCards();  // Reload the list after deletion
      },
      error => {
        this.showAlert('Failed to delete debit card.', 'danger');
      }
    );
  }

  updateBankAccount(accountData: any): void {
    if (!this.selectedAccount) {
      console.error('No account selected for update');
      return;
    }
    this.bankAccountService.UpdateAccount(this.selectedAccount.accountNo, accountData).subscribe(
      () => {
        this.updatesuccessMessage='Account Updated Successfully';
        this.loadBankAccounts();
      },
      (error) => console.error('Error updating account', error)
    );
  }

  deleteBankAccount(accountNo: string): void {
    if (confirm("Are you sure you want to delete this account?")) {
      this.bankAccountService.DeleteAccount(accountNo).subscribe(
        () => this.loadBankAccounts(),
        (error) => console.error('Error deleting account', error)
      );
    }
  }

  selectAccount(account: any): void {
    this.selectedAccount = account;
  }

  gotoDebitCard():void{
    this.router.navigate(['/debit-card-management']);
  }

  logoutManager() : void{
    this.router.navigate(['/login']);
  }
}
