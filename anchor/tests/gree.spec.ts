import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Gree } from "../target/types/gree";

import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import {
	findMasterEditionPda,
	findMetadataPda,
	mplTokenMetadata,
	MPL_TOKEN_METADATA_PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { publicKey } from "@metaplex-foundation/umi";

import {
	TOKEN_PROGRAM_ID,
	ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";

describe("gree", async () => {
	// Configured the client to use the devnet cluster.
	const provider = anchor.AnchorProvider.env();
	anchor.setProvider(provider);
	const program = anchor.workspace
		.Gree as Program<Gree>;

	const signer = provider.wallet;

	const umi = createUmi("https://api.devnet.solana.com")
		.use(walletAdapterIdentity(signer))
		.use(mplTokenMetadata());

	const mint = anchor.web3.Keypair.generate();

	// Derive the associated token address account for the mint
	const associatedTokenAccount = await getAssociatedTokenAddress(
		mint.publicKey,
		signer.publicKey
	);

	// derive the metadata account
	const metadataAccount = findMetadataPda(umi, {
		mint: publicKey(mint.publicKey),
	})[0];

	//derive the master edition pda
	const masterEditionAccount = findMasterEditionPda(umi, {
		mint: publicKey(mint.publicKey),
	})[0];

	const metadata = {
		name: "GLC-20240317",
		symbol: "GRLC",
		uri: "ipfs://bafkreidsv7qyevjbnsncrn7peogr6rp6bfclz3exx2vkunsd5egx7bd5wq",
	};

	it("mints nft!", async () => {
		const tx = await program.methods
			.initNft(
				metadata.name, 
				metadata.symbol, 
				metadata.uri,
			)
			.accounts({
				signer: provider.publicKey,
				mint: mint.publicKey,
				associatedTokenAccount,
				metadataAccount,
				masterEditionAccount,
				tokenProgram: TOKEN_PROGRAM_ID,
				associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
				tokenMetadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
				systemProgram: anchor.web3.SystemProgram.programId,
				rent: anchor.web3.SYSVAR_RENT_PUBKEY,
			})
			.signers([mint])
			.rpc();

		console.log(
			`mint nft tx: https://explorer.solana.com/tx/${tx}?cluster=devnet`
		);
		console.log(
			`minted nft: https://explorer.solana.com/address/${mint.publicKey}?cluster=devnet`
		);
	});
});