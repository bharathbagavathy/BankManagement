import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { DebitCardManagementComponent } from './debitcard/debitcard.component';


const routes: Routes = [
   //{ path: 'manager-dashboard', component: BankAccountComponent },
   { path: 'manager-dashboard', component: ManagerDashboardComponent, canActivate: [AuthGuard, AuthGuard] },
   { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard, AuthGuard] }, 
   { path: 'debit-card-management', component: DebitCardManagementComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/customer-dashboard  ', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
