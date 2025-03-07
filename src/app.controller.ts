import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import Stripe from 'stripe';

@Controller()
export class AppController {
  // stripe = require('stripe')('sk_test_BQokikJOvBiI2HlWgH4olfQ2');

  constructor(private readonly appService: AppService) {}

  @Get('/buy') // этот эндпоинт отработает по нажатию на кнопку КУПИТЬ
  async buyProduct(@Query('productId') productId) {
    // МНЕ нужно будет извлечь информацию о продукте из  базы данных
    //  название продукта, его цену, описание и др я из базы возму и подставлю в код снизу

    const stripe = new Stripe(
      'sk_test_51Qz6l3FREjmkwjeCXax2LKeul3LjFSfNBa8RdaC0cGe7kWrJWYU13TtJAsSnaYEyWCi8xvWEVbvAyoLEZ5JHyCpc00HXs1rT3T',
      {
        apiVersion: '2025-02-24.acacia', //это значение предложено было по дефолту
        // чтобы избежать проблем с совместимостью при изменениях в API
      },
    );

    const session = await stripe.checkout.sessions.create({
      success_url: 'https://localhost:3000/success', //это урл фронта моего
      // URL, на который пользователь будет перенаправлен после успешной оплаты
      //тоесть тут может быть написано что товар забронирован на 1 час и для
      // оплаты перейдите к себе на почту где будет ссылка для оплаты
      //ВНИМАНИЕ я останусь на тойже странице но придет обьект и у обьекта внутри будет
      // этот урл и надо его из обьекта достать и перейти по нему
      // это для безопастности - этот урл на бэкенде
      cancel_url: 'https://localhost:3000/error', //это урл фронта моего
      //URL, на который пользователь будет перенаправлен, если он отменит оплату.
      line_items: [
        // тут массив товаров
        {
          price_data: {
            product_data: {
              //в этом блоке описывается за что мы платим
              name: 'ЛЫЖНЫЙ КОСТЮМ без лыж(с лыжами стоил 475 дол США)',
              description:
                'Лыжный костюм. Подкладка отстегивается и летом можно ходить в нес в походы и на рыбалку. Есть скрытый кармашек для 0.2 водочки',
            },
            unit_amount: 55, //сколько денег плачу, ценник в центах -  не менее 50 центов
            currency: 'USD',
          },
          quantity: 1,
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
    console.log(' console.log');
    return this.appService.getHello();
  }

  @Get('pay')
  getPay(): string {
    console.log('get pay');
    return 'OK';
  }

  @Post('pay')
  postPay(): string {
    console.log('post pay');
    return 'OK';
  }

  @Get('ngrok')
  ngrok() {
    console.log('8888888888888888');
    console.log('8888888888888888');
    console.log('8888888888888888');
    console.log('8888888888888888');
    console.log('8888888888888888');
    return {
      status: '200',
    };
  }

  @Post('hook')
  hook(@Body() data) {
    console.log('STRIPEHOOKSTRIPEHOOKSTRIPEHOOK');
    console.log('STRIPEHOOK', JSON.stringify(data));
    console.log('STRIPEHOOKSTRIPEHOOKSTRIPEHOOK');

    return {
      status: '200-----------STRIPEHOOK',
    };
  }
}
