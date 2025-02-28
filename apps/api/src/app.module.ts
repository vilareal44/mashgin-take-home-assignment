import { Module } from '@nestjs/common';
import { SharedModule } from './shared/shared.module';
import { PrismaService } from './shared/prisma.service';
import { MenuModule } from './menu/menu.module';
import { CheckoutModule } from './checkout/checkout.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    SharedModule,
    MenuModule,
    CheckoutModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'assets'),
      serveRoot: '/assets',
      serveStaticOptions: {
        index: false,
        fallthrough: true,
        extensions: ['jpg'],
        cacheControl: true, // cache assets for improve performance on the browser
        maxAge: 3600000, // 1 hour in milliseconds
      }
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
