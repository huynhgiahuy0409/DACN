import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-check-payment-status',
  templateUrl: './check-payment-status.component.html',
  styleUrls: ['./check-payment-status.component.scss']
})
export class CheckPaymentStatusComponent implements OnInit {
  headerComponent!: HTMLElement;
  payment_id!: string;

  constructor(private paymentService: PaymentService) { }

  isPaid = true;

  ngOnInit(): void {
    const access_token = localStorage.getItem('payment_token') || '';
    this.payment_id = localStorage.getItem('payment_id') || '';
    this.paymentService.getPaymentStatus(access_token, this.payment_id).subscribe((res) => {
      if (res.payer.status !== "VERIFIED") {
        this.isPaid = false;
      }
    });
    this.headerComponent = document.getElementsByClassName('header-container').item(0) as HTMLElement;
    this.headerComponent.style.display = "none";
  }
  ngOnDestroy(): void {
    this.headerComponent.style.display = "flex";
  }
}
