import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { server$, useNavigate } from "@builder.io/qwik-city";
import { AddressContext } from "../layout";
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import ConnectButton from "~/components/login/ConnectButton";

const mintNft = server$(async function* (accountId: string | null) {
  const fs = await import("fs/promises");
  const contractAbi = (await fs.readFile("./dist/hunters.json")).toString();
  const seed = this.env.get("MINTER_SEED");
  const contractAddress = this.env.get("PUBLIC_CONTRACT");
  const azeroUrl = this.env.get("PUBLIC_AZERO_URL");

  if (accountId && seed && contractAddress && azeroUrl) {
    const provider = new WsProvider(azeroUrl);
    const alephZero = await ApiPromise.create({ provider });

    const keyring = new Keyring({ type: "sr25519" });
    const account = keyring.addFromUri(seed);

    const contract = new ContractPromise(
      alephZero,
      contractAbi,
      contractAddress,
    );

    let resolveInBlock: () => void;
    let resolveFinalized: () => void;

    const inBlockPromise = new Promise<void>((resolve) => {
      resolveInBlock = resolve;
    });
    const finalizedPromise = new Promise<void>((resolve) => {
      resolveFinalized = resolve;
    });

    await contract.tx
      .mint_next({ storageDepositLimit: null, gasLimit: -1 }, accountId)
      .signAndSend(account, (result) => {
        if (result.status.isInBlock) {
          console.log("Transaction is in a block");
          resolveInBlock();
        } else if (result.status.isFinalized) {
          console.log("Transaction is finalized");
          resolveFinalized();
        }
      })
      .catch((error) => {
        // This is where you could call reject if there was an error during signAndSend
        console.error("Transaction failed:", error);
      });

    await inBlockPromise;
    yield "Transaction is in a block";

    await finalizedPromise;
    yield "Transaction is finalized";
  }
});

export default component$(() => {
  const nav = useNavigate();
  const address = useContext(AddressContext);
  const msg = useSignal("");

  return (
    <div class="mx-auto flex w-full max-w-[480px] flex-col items-stretch px-8 pb-12 pt-4">
      <h1 class="mt-32 text-center text-7xl font-light leading-[63px] text-stone-950">
        Success!
      </h1>

      <h2 class="mt-9 text-center text-4xl leading-9 text-stone-950">
        Aleph Zero badge may been claimed.
      </h2>

      <button
        class="mt-9 rounded-[67px] border-8 border-solid border-gray-950 text-center text-4xl leading-9 text-stone-950"
        onClick$={async () => {
          msg.value = `Minting NFT for ${address.value}`;
          const response = await mintNft(address.value);
          for await (const m of response) {
            console.log(m);
            msg.value = m;
          }
        }}
      >
        CLAIM
      </button>

      <span>{`message: ${msg.value}`}</span>

      <figure class="mt-20 flex w-[173px] max-w-full flex-col items-center justify-center self-center rounded-full p-6">
        <img
          width={200}
          height={200}
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5537c74fddfe65c39483be3d83869ad02a2cf958144bff5fefb43139651c26a?apiKey=4c2e8d6af6a74bb7ac672d1ce608c5b2&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5537c74fddfe65c39483be3d83869ad02a2cf958144bff5fefb43139651c26a?apiKey=4c2e8d6af6a74bb7ac672d1ce608c5b2&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5537c74fddfe65c39483be3d83869ad02a2cf958144bff5fefb43139651c26a?apiKey=4c2e8d6af6a74bb7ac672d1ce608c5b2&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5537c74fddfe65c39483be3d83869ad02a2cf958144bff5fefb43139651c26a?apiKey=4c2e8d6af6a74bb7ac672d1ce608c5b2&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5537c74fddfe65c39483be3d83869ad02a2cf958144bff5fefb43139651c26a?apiKey=4c2e8d6af6a74bb7ac672d1ce608c5b2&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5537c74fddfe65c39483be3d83869ad02a2cf958144bff5fefb43139651c26a?apiKey=4c2e8d6af6a74bb7ac672d1ce608c5b2&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5537c74fddfe65c39483be3d83869ad02a2cf958144bff5fefb43139651c26a?apiKey=4c2e8d6af6a74bb7ac672d1ce608c5b2&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d5537c74fddfe65c39483be3d83869ad02a2cf958144bff5fefb43139651c26a?apiKey=4c2e8d6af6a74bb7ac672d1ce608c5b2&"
          class="aspect-square w-full object-contain object-center"
        />
      </figure>

      <button
        class="mt-4 flex flex-col items-stretch justify-center whitespace-nowrap rounded-[67px] border-[1.5px] border-solid border-stone-950 px-11 py-9 text-center text-xl text-black"
        onClick$={$(async () => await nav("/badges"))}
      >
        <span>Go to your badges collection</span>
      </button>
      <ConnectButton />
    </div>
  );
});
