import z from "zod";
import dotenv from "dotenv";

dotenv.config();
const envSchema = z.object({
  KEY_PAIR_PATH: z.string().default("./config/keypair.json"),
});

export type Env = z.infer<typeof envSchema>;
export const env = envSchema.parse(process.env);
