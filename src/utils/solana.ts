import { promises } from "fs";
import {
  LAMPORTS_PER_SOL,
  Connection,
  PublicKey,
  Keypair,
} from "@solana/web3.js";
import { env } from "../env";

export const airdrop = async (connection: Connection, publicKey: PublicKey) => {
  const airdropSignature = await connection.requestAirdrop(
    publicKey,
    LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(airdropSignature);
};

export const loadKeypair = async (path: string) => {
  const keypair = await promises
    .readFile(env.KEY_PAIR_PATH, {
      encoding: "utf-8",
    })
    .then((data) => {
      const secret = new Uint8Array(
        Object.values(JSON.parse(data)._keypair.secretKey)
      );

      return Keypair.fromSecretKey(secret);
    });

  return keypair;
};
