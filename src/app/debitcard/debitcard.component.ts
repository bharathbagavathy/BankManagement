import { Component, OnInit } from '@angular/core';
import { DebitCardService } from '../services/debit-card.service';
import { ApiResponse, DebitCard } from '../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debit-card-management',
  templateUrl: './debitcard.component.html',
  styleUrl: './debitcard.component.css'
})
export class DebitCardManagementComponent implements OnInit {
  debitCards: DebitCard[] = [];

  constructor(private debitCardService: DebitCardService, private router:Router) { }

  ngOnInit(): void {
    this.loadDebitCards();
  }

  loadDebitCards(): void {
    this.debitCardService.getAllCards().subscribe(
      (response: ApiResponse<DebitCard[]>) => {
        if (response.isSuccess) {
          this.debitCards = response.result || [];
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
        console.log('Card deleted successfully');
        this.loadDebitCards();  // Reload the list after deletion
      },
      error => {
        console.error('Error deleting card', error);
      }
    );
  }
  gotoHome(){
    this.router.navigate(['/manager-dashboard']);
  }
}
