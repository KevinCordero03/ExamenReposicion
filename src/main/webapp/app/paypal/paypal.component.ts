import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

declare var paypal: any;
@Component({
  selector: 'jhi-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
})
export class PaypalComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef | undefined;

  product = {
    price: 777.77,
    description: 'Ticket',
  };

  paidFor = false;
  constructor() {}

  ngOnInit(): void {
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price,
                },
              },
            ],
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();
          this.paidFor = true;
        },
        onError: (err: any) => {
          console.log(err);
        },
      })
      .render(this.paypalElement?.nativeElement);
    console.log(paypal);
  }
}
