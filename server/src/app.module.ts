import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AppService } from './app.service'
import { ArweaveProvider } from './providers/arweave.provider'
import { Connection } from 'typeorm'
import { WalletProvider } from './providers/wallet.provider'

const db_options: TypeOrmModuleOptions = {
	name: 'default',
	type: 'sqlite',
	database: 'database.sqlite',
	entities: [],
	synchronize: true,
	autoLoadEntities: true
}
@Module({
	imports: [TypeOrmModule.forRoot(db_options)],
	controllers: [AppController],
	providers: [AppService, ArweaveProvider, WalletProvider]
})
export class AppModule {
	constructor(private readonly connection: Connection) {}
}
