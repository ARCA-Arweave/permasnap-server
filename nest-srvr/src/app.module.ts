import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletProvider } from './wallet.provider';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WalletProvider],
})
export class AppModule {}
