import { $, component$, useSignal } from "@builder.io/qwik";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { createWalletClient, http, toHex, verifyMessage } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { keccak256 } from "viem";
import { mainnet } from "viem/chains";
import ConnectButton from "~/components/login/ConnectButton";
import { useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const message = useSignal<any>({});
  const isValid = useSignal<boolean>(false);
  const nav = useNavigate();
  const navs = new Map([
    ["0xCD02AD1d9F03F98FA28A8c79E4057F5511F029e5", "/aleph"],
  ]);

  const handleChip = $(async () => {
    const account = privateKeyToAccount(generatePrivateKey());
    const msg = "hello world";

    const walletClient = createWalletClient({
      chain: mainnet,
      transport: http(),
    });

    const signature = await walletClient.signMessage({
      account,
      message: msg,
    });

    const valid = await verifyMessage({
      address: account.address,
      message: msg,
      signature,
    });
    isValid.value = valid;

    const hash = keccak256(toHex(msg)).substring(2);

    const command = {
      name: "sign",
      keyNo: 1,
      digest: hash,
    };

    try {
      const res = await execHaloCmdWeb(command);
      const address = res.etherAddress;
      if (navs.has(address)) {
        await nav(navs.get(address));
      } else {
        message.value = "Invalid chip";
      }
    } catch (e) {
      // display error
      message.value = e;
    }
  });

  return (
    <div class="mx-auto flex w-full max-w-[480px] flex-col items-center px-8 pb-9 pt-4">
      <div class="flex w-full items-stretch justify-between gap-5 self-stretch">
        <img
          width={38}
          height={44}
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a826550793928fdcdf0ff2388cc4f6151f1000e218622cd673dd5c46bb2b10c?apiKey=4c2e8d6af6a74bb7ac672d1ce608c5b2&"
          class="aspect-[1.15] w-[38px] shrink-0 self-start fill-stone-950 object-contain object-center"
        />
      </div>
      <div class="mt-24 flex w-[108px] max-w-full items-stretch justify-center gap-5 pr-1.5">
        <img
          width={108}
          height={133}
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6224a3c1f14baae5bd17c0adc3733e3d1339af628c7565611931c783f39a0ed?apiKey=4c2e8d6af6a74bb7ac672d1ce608c5b2&"
          class="aspect-[0.81] w-full flex-1 shrink-0 object-contain object-center"
        />
        <img
          width={108}
          height={133}
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f254b080259c46724bdb9c9ce5a3c8da494d17a37ec3eea9ae0d5842f83b01a8?apiKey=4c2e8d6af6a74bb7ac672d1ce608c5b2&"
          class="aspect-square w-full flex-1 shrink-0 object-contain object-center"
        />
      </div>
      <div class="mt-10 justify-center self-stretch text-center text-7xl font-light leading-[63px] text-stone-950">
        Scan NFC to claim the badge
      </div>
      <button
        class="mt-12 flex items-center justify-between gap-5 rounded-[67px] border-[1.5px] border-solid  p-4 text-stone-950"
        onClick$={handleChip}
      >
        CLICK HERE
      </button>
      <div class="mt-28 w-[246px] justify-center text-center text-xl leading-6 text-stone-950">
        Tap your phone near the NFC tag and follow the instructions show on
        screen to claim the badge.
      </div>
      <ConnectButton />
    </div>
  );
});
