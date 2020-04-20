import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const options = new DocumentBuilder()
		.setTitle('Permasnap API Docs')
		.setDescription('Get some photos on the permaweb, yo')
		.setVersion('0.1')
		.build()
	const document = SwaggerModule.createDocument(app, options)
	SwaggerModule.setup('api', app, document)
	app.useGlobalPipes(new ValidationPipe())
	
	app.enableCors();

	await app.listen(3000)
}
bootstrap()
