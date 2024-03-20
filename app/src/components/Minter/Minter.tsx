import React, { useEffect, useState } from 'react';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

interface NFT {
    // Define the structure of your NFT data here
    // Example:
    name: string;
    symbol: string;
    uri: string;
    // Add more fields as needed
}

export const Minter: React.FC = () => {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

   

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading NFTs: {error.message}</div>;
    }

    return (
        <div>
            <h2>NFTs Owned:</h2>
            {nfts.map((nft, index) => (
                <div key={index}>
                    NFT Name: {nft.name} {/* Render additional NFT details as needed */}
                </div>
            ))}
        </div>
    );
};
