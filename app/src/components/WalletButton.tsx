import '@particle-network/connect-react-ui/dist/index.css';
import { ConnectButton } from '@particle-network/connect-react-ui'; // @particle-network/connectkit to use Auth Core

// Standard ConnectButton utilization
export const App = () => {
  return <ConnectButton />;
};

// Custom ConnectButton utilization 
export const WalletButton = () => {
  return (
      <ConnectButton.Custom>
        {({ account, chain, openAccountModal, openConnectModal, openChainModal, accountLoading }) => {
          return (
            <div>
              <button onClick={openConnectModal} disabled={!!account}>
                Open Connect
              </button>
              <br />
              <br />
              <button onClick={openAccountModal} disabled={!account}>
                Open Account
              </button>
              <br />
              <br />  
              <button onClick={openChainModal} disabled={!account}>
                Open Switch Network
              </button>
              <div>
                <h3>account</h3>
                <p>{account}</p>
              </div>
            </div>
          );
        }}
      </ConnectButton.Custom>
  );
};