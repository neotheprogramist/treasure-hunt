import { component$ } from "@builder.io/qwik";
import ConnectButton from "~/components/login/ConnectButton";

export default component$(() => {
  return (
    <div class="py-20">
      <div class="m-auto flex max-w-[371px] flex-col items-center px-5">
        <img
          width={38}
          height={44}
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/de162911c13bdb440531771ef9c66ff55aa8c993adf5735c7d0a8ccf64b60605?apiKey=4c2e8d6af6a74bb7ac672d1ce608c5b2&"
          class="aspect-[1.15] w-[38px] fill-black object-contain object-center"
          alt="Logo"
        />
        <header class="mt-10 justify-center text-center text-7xl font-light leading-[56px] text-black">
          Let the <br /> hunt begin
        </header>
        <section class="my-12 w-[246px] justify-center text-center text-2xl leading-7 text-black">
          Claim badges and unlock a Mystery Box!
        </section>
        <ConnectButton />
      </div>
    </div>
  );
});
