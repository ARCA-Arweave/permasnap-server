import { Test, TestingModule } from '@nestjs/testing';
import { ArweaveProvider } from './arweave.provider';

describe('Wallet', () => {
  let provider: ArweaveProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArweaveProvider],
    }).compile();

    provider = module.get<ArweaveProvider>(ArweaveProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
