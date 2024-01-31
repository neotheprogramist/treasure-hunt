import {
  component$,
  $,
  useSignal,
  useVisibleTask$,
  useContext,
} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { getAdapter } from "~/misc/adapter";
import { AddressContext } from "~/routes/layout";

export default component$(() => {
  const address = useContext(AddressContext);
  const connecting = useSignal(false);
  const nav = useNavigate();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const init = async () => {
      const adapter = await getAdapter();
      // Eager connect
      console.log("Eager connect");
      if (await adapter.canEagerConnect()) {
        try {
          await adapter.connect();
          const publicKey = await adapter.accounts.get();
          if (publicKey.length > 0) {
            address.value = publicKey[0].address;
            await nav("/badges");
          }
        } catch (error) {
          await adapter.disconnect().catch(() => {});
          console.log(error);
        }
      }
    };
    init();
    // Try eagerly connect
  });

  const connectNightly = $(async () => {
    const adapter = await getAdapter();
    try {
      await adapter.connect();
      const publicKey = await adapter.accounts.get();
      if (publicKey.length > 0) {
        address.value = publicKey[0].address;
      }
    } catch (error) {
      await adapter.disconnect().catch(() => {});
      console.log(error);
    }
  });
  const disconnectNightly = $(async () => {
    try {
      const adapter = await getAdapter();
      await adapter.disconnect();
      address.value = null;
    } catch (error) {
      console.log(error);
    }
  });

  const handleButtonClick = $(async () => {
    if (connecting.value) return;
    if (address.value) {
      connecting.value = true;
      await disconnectNightly();
      await nav("/");
      connecting.value = false;
    } else {
      connecting.value = true;
      await connectNightly();
      await nav("/badges");
      connecting.value = false;
    }
  });

  return (
    <button
      class="flex items-center justify-between gap-5 rounded-[67px] border-[1.5px] border-solid  p-4 text-stone-950"
      onClick$={handleButtonClick}
    >
      <img
        width={37}
        height={44}
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/319aa0e0a50e355f61c2b263c1fdf49f516fc8a23413f800c8b4b3b4944c0d88?apiKey=4c2e8d6af6a74bb7ac672d1ce608c5b2&"
        class="my-auto aspect-[0.84] w-[37px] shrink-0 self-stretch object-contain object-center text-neutral-700"
        alt="Nightly Wallet Logo"
      />
      <div class="my-auto justify-center text-center text-xl leading-6 text-stone-950">
        {!address.value ? "Log in with" : "Log out"} <br /> Nightly Wallet
      </div>
      <div class="flex aspect-square h-[51px] w-[51px] flex-col items-center justify-center self-stretch rounded-[57px]  px-4 text-stone-950">
        <img
          width={64}
          height={64}
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f667d5cf2e606765e698a6b0052fb6b8d499d403cb1e80ed1f9d7437584a024?apiKey=4c2e8d6af6a74bb7ac672d1ce608c5b2&"
          class="aspect-square w-full fill-stone-950 object-contain object-center"
          alt="Mystery Box"
        />
      </div>
    </button>
  );
});
