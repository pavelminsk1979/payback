import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import Stripe from 'stripe';

@Controller()
export class AppController {
  // stripe = require('stripe')('sk_test_BQokikJOvBiI2HlWgH4olfQ2');

  constructor(private readonly appService: AppService) {}

  @Get('/buy')
  async buyProduct(@Query('productId') productId) {
    const stripe = new Stripe(
      'sk_test_51Qz6l3FREjmkwjeCXax2LKeul3LjFSfNBa8RdaC0cGe7kWrJWYU13TtJAsSnaYEyWCi8xvWEVbvAyoLEZ5JHyCpc00HXs1rT3T',
      {
        apiVersion: '2025-02-24.acacia', //это значение предложено было по дефолту
      },
    );

    const session = await stripe.checkout.sessions.create({
      success_url: 'https://localhost:3000/success', //это урл фронта моего
      cancel_url: 'https://localhost:3000/error', //это урл фронта моего
      line_items: [
        {
          //price: 'price_1MotwRLkdIwHu7ixYcPLm5uZ', // айдишка цены которая хранится в stripe
          price_data: {
            product_data: {
              //в этом блоке описывается за что мы платим
              name: 'product1',
              description: 'Best product1',
            },
            unit_amount: 1 * 100, //сколько денег плачу, ценник в центах
            currency: 'USD',
          },
          quantity: 2,
        },
      ],
      mode: 'payment',
    });
    console.log(session);
    return session;
  }

  @Get('success')
  success(): string {
    return 'Success! You bought the product!';
  }

  @Get('error')
  error(): string {
    return 'Error!';
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
