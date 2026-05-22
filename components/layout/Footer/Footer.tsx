import Link from "next/link";
import logo from "../../../public/assets/images/logo.svg";
import Image from "next/image";

function Footer() {
  return (
    <footer className="w-full bg-[#ececec]">
      <div className="mx-auto px-5 py-12 md:px-8 lg:px-11 xl:py-[168px] xl:px-[181px]">
        <div className="grid grid-cols-1 gap-8 mtd:grid-cols-2 ">
          <div className="">
            <h3 className="font-interMedium text-[10px] text-black/60 mb-4 uppercase">
              info
            </h3>
            <ul className="space-y-2 text-[12px]">
              <li>
                <Link
                  href="/pricing"
                  className="font-interMedium text-sm text-black/60 hover:opacity-60 transition-opacity uppercase"
                >
                  pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-interMedium text-sm text-black/60 hover:opacity-60 transition-opacity uppercase"
                >
                  about
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="font-interMedium text-sm text-black/60 hover:opacity-60 transition-opacity uppercase"
                >
                  contacts
                </Link>
              </li>
            </ul>

            <h3 className="font-interMedium text-[10px] text-black/60 mb-4 mt-10 uppercase">
              languages
            </h3>
            <ul className="space-y-2 text-[12px]">
              <li>
                <button className="font-interMedium text-sm text-black/60 hover:opacity-60 transition-opacity uppercase">
                  eng
                </button>
              </li>
              <li>
                <button className="font-interMedium text-sm text-black/60 hover:opacity-60 transition-opacity uppercase">
                  esp
                </button>
              </li>
              <li>
                <button className="font-interMedium text-sm text-black/60 hover:opacity-60 transition-opacity uppercase">
                  sve
                </button>
              </li>
            </ul>
          </div>

          <div className="min-w-[345px]">
            <h3 className="mb-8 font-interMedium text-[10px] uppercase tracking-[0.12em] text-black/40">
              Technologies
            </h3>

            <div className="flex items-start gap-6">
              <div className="flex flex-col relative">
                <div className="absolute left-[17%] -translate-x-1/2 -translate-y-[-10%]">
                  <Image src={logo} alt="logo" width={47} height={47} />
                </div>
                <h2 className="font-interMedium text-[80px] leading-[85%] tracking-[-0.06em] text-black font-black opacity-10">
                  VR
                </h2>

                <h2 className="font-interMedium text-[80px] leading-[85%] tracking-[-0.06em] font-black text-black">
                  XIV
                  <br />
                  QR
                </h2>
              </div>

              <div className="flex items-center pt-[72px]">
                <span className="font-interMedium text-[12px] leading-[130%] tracking-[-0.02em] text-black/40">
                  Near-field communication
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-around ">
        <div className="flex gap-4 max-w-[827px]  mb-10">
          <p className="font-interMedium text-xs text-black">
            © 2024 - copyright
          </p>
          <Link
            href="/privacy"
            className="font-interMedium text-xs text-black hover:opacity-60 transition-opacity px-auto mt-2 md:mt-0"
          >
            privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
