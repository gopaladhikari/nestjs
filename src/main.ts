import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MyLoggerService } from "./my-logger/my-logger.service";

const allowedOrigins = ["http://localhost:3000"];

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
	});
	app.useLogger(app.get(MyLoggerService));
	app.setGlobalPrefix("api");
	app.enableCors({
		origin: (origin, cb) => {
			if (!origin || allowedOrigins.includes(origin)) cb(null, true);
			else cb(new Error("Not allowed by CORS"));
		},
		optionsSuccessStatus: 200,
	});
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
