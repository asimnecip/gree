import React, { useEffect, useState } from 'react';
// Assuming these imports are correct based on your setup
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
// import { Metaplex, keypairIdentity } from '@metaplex-foundation/js';
import { clusterApiUrl } from '@solana/web3.js';

interface NFT {
    // Define the structure of your NFT data here
    // Example:
    name: string;
    symbol:string;
    uri:string;
    // Add more fields as needed
}

export const Minter: React.FC = () => {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
                const keypair = Keypair.generate();
                
                // const metaplex = new Metaplex(connection);
                // metaplex.use(keypairIdentity(keypair));
                
                // const owner = new PublicKey("BGRPxYe1cyLJz4vS8kNCUPfwJpaRgHVX3JAZ6JbXSr2x");
                // const allNFTs = await metaplex.nfts().findAllByOwner({ owner }) as NFT[]; // Cast to NFT[] based on expected structure

                // setNfts(allNFTs);
                setIsLoading(false);
            } catch (error) {
                console.error("Failed to fetch NFTs:", error);
                setError(error as Error); // Cast error to Error type
                setIsLoading(false);
            }
        };

        fetchNFTs();
    }, []); // Empty dependency array ensures this runs once on mount

    // You can render your component based on the state (isLoading, nfts, error)
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading NFTs.</div>;
    }

    return (
        <div>
            <h2>NFTs Owned:</h2>
            {nfts.map((nft, index) => (
                // Render each NFT details here.
                // Ensure you have a unique key for each item when rendering a list.
                <div key={index}> {/* Customize this part based on the structure of your NFTs */}
                    NFT Name: {nft.name} {/* Example, adjust based on actual NFT structure */}
                </div>
            ))}
        </div>
    );
};
