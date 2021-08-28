import {
  MiddlewareConsumer,
  Module,
  NestModule
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViewModule } from './modules/view/view.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { ConnectionType } from './enums/common';
import { getDbOptions } from './utils/db';
import { MemberModule } from './modules/member/member.module';
import { AuthModule } from './modules/auth/auth.module';
import { PHASE } from './env';

console.log(`[${PHASE}] reloaded`);

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }),
    TypeOrmModule.forRoot(
      getDbOptions(
        ConnectionType.Default
      )),
    // services
    AuthModule,
    MemberModule,

    // client
    ViewModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        helmet({
          hsts: false,
          contentSecurityPolicy: false
        }),
        compression({
          level: 6,
          threshold: '1kb'
        }),
        cookieParser(),
        morgan('tiny')
      )
      .forRoutes('*');
  }
}
