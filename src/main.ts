import { NestFactory } from '@nestjs/core';
import { AppModule } from './server/app.module';
import { setupSwagger } from './server/swagger';

const PORT: number = 11002;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  await app.listen(PORT);
  console.info(`app started at ${PORT}`);
  process?.send?.('ready');
}
void bootstrap();
