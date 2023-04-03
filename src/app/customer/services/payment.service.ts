import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart, PaymentResponse, PaymentResultResponse, PaypalToken } from 'src/app/models/model';
import { convertVNDToUSD } from 'src/app/shared/utils/MoneyUtils';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) { }

  createToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('AaB1UDWcH5cCEVqZiwms5FX4kzAhUpBvi9NFTF3WLAEa-UpodwzS945RW2TfsMcdP10cmjPW71Nz1XWP:EIoQsyiL1FQUa01om6p5-SmLzJouOFTdVyk2j6mAOs-Ju72odIcgohMH5Ca256md80ij6ijLmyw-QA4G')
    });
    const data = 'grant_type=client_credentials';
    return this.httpClient.post<PaypalToken>('https://api.sandbox.paypal.com/v1/oauth2/token', data, { headers });
  }

  createPayment(access_token: string, token_type: string, cart: Cart) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${token_type} ${access_token}`
    });

    const totalPrice = cart.items.reduce((total, item) => {
      return total + item.price;
    }, 0);

    const data = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      transactions: [{
        amount: {
          total: convertVNDToUSD(totalPrice + (totalPrice * 10 / 100)),
          currency: 'USD'
        }
      }],
      redirect_urls: {
        return_url: 'http://localhost:4200/checkout/payment/status',
        cancel_url: 'http://localhost:4200/checkout/payment/status'
      }
    };
    return this.httpClient.post<PaymentResponse>('https://api.sandbox.paypal.com/v1/payments/payment', data, { headers });
  }

  getPaymentStatus(access_token: string, payment_id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`
    });
    return this.httpClient.get<PaymentResultResponse>('https://api.sandbox.paypal.com/v1/payments/payment/' + payment_id, { headers });
  }
}
