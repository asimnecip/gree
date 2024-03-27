import React, { useState } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { Metaplex } from '@metaplex-foundation/js'

const connection = new Connection(clusterApiUrl("devnet"));
const mx = Metaplex.make(connection);

const Inventory: React.FC = () => {
  const [address, setAddress] = useState<string>(
    "3ijFZcJKmp1EnDbbuaumWYvEFbztx9NRupwTXTchK9bP"
  );
  const [nft, setNft] = useState<any>(null);

  const fetchNft = async () => {
    const asset = await mx.nfts().findByMint({ mintAddress: new PublicKey(address) });

    setNft(asset);
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">NFT Mint Address</h1>
        <div className="nftForm">
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <button onClick={fetchNft}>Fetch</button>
        </div>
        {nft && (
          <div className="nftPreview">
            <h1>{nft.name}</h1>
            <img
              src={nft.json.image}
              alt="The downloaded illustration of the provided NFT address."
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
