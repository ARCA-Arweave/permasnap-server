import { Test, TestingModule } from '@nestjs/testing';
import { WalletProvider } from './wallet.provider';

describe('Wallet', () => {
  let provider: WalletProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletProvider],
    }).compile();

    provider = module.get<WalletProvider>(WalletProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
