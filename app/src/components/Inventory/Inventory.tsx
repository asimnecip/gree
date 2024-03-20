import React, { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

interface INFTMetadata {
  name: string;
  symbol: string;
  imageUrl: string;
}

const Inventory: React.FC = () => {
  const [nfts, setNfts] = useState<INFTMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNFTs = async () => {
    setIsLoading(true);
    const connection = new Connection('https://api.devnet.solana.com');
    const walletAddress = new PublicKey('BGRPxYe1cyLJz4vS8kNCUPfwJpaRgHVX3JAZ6JbXSr2x'); // Replace with the wallet address

    try {
      const ownedTokensResponse = await connection.getParsedTokenAccountsByOwner(
        walletAddress, {
        programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
      });

      console.log(ownedTokensResponse);
      const mintAddresses = ownedTokensResponse.value.map(
        (accountInfo) => accountInfo.account.data.parsed.info.mint
      );

      const metadataPromises = mintAddresses.map(async (mint) => {

        const encodedMetadata:any = await connection.getAccountInfo(new PublicKey(mint));
        console.log("hey");
        const metadataBuffer = Buffer.from(encodedMetadata.data[0], 'base64');

        const metadata = Metadata.deserialize(metadataBuffer);
        console.log(encodedMetadata);

        // return {
        //   name: externalMetadata.name,
        //   symbol: externalMetadata.symbol,
        //   imageUrl: externalMetadata.image,
        // };
      });

      const nftMetadata = await Promise.all(metadataPromises);
    //   setNfts(nftMetadata);
    } catch (error) {
      console.error('Failed to fetch NFTs:', error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <button onClick={fetchNFTs} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Fetch NFTs'}
      </button>
      <ul>
        {nfts.map((nft, index) => (
          <li key={index}>
            <strong>{nft.name} ({nft.symbol})</strong>
            <div>
              <img src={nft.imageUrl} alt={nft.name} style={{ width: '100px', height: '100px' }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
