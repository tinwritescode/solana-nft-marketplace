import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import { airdrop } from "./utils/solana";
import { promises } from "fs";
import { env } from "./env";

(async function main() {
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

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

  await airdrop(connection, keypair.publicKey);

  // check balance
  const balance = await connection.getBalance(keypair.publicKey);

  console.log("Balance:", balance);
})();
