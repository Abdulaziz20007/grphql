import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { HttpExceptionFilter } from "./filter/http-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get<number>("PORT") ?? 3030;
  await app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
  });
}
bootstrap();
