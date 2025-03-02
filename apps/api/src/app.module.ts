import { Module } from '@nestjs/common';
import { MenuModule } from './menu/menu.module';
import { CheckoutModule } from './checkout/checkout.module';
import { CoreModule } from './core/core.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaService } from './core/prisma.service';

/**
 * Main application module that imports all other modules
 */
@Module({
  imports: [
    CoreModule,
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
      },
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
