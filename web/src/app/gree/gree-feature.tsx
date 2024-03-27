import { useWallet } from '@solana/wallet-adapter-react';
import { ExplorerLink } from '../cluster/cluster-ui';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { useGreeProgram } from './gree-data-access';
import { GreeCreate, GreeProgram } from './gree-ui';

export default function GreeFeature() {
  const { publicKey } = useWallet();
  const { programId } = useGreeProgram();

  return publicKey ? (
    <div>
      <AppHero
        title="Gree"
        subtitle={'Run the program by clicking the "Run program" button.'}
      >
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <GreeCreate />
      </AppHero>
      <GreeProgram />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton className="btn btn-primary" />
        </div>
      </div>
    </div>
  );
}
