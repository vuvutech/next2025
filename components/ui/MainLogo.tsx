"use client";
import { oswald } from "@/config/fonts";
import Image from "next/image";
import Link from "next/link";

type MainLogoProps = {
  textColor?: string; // Accepts a tailwind class for text color
  logoSize?: string; // Accepts a tailwind class for logo size
  hideText?: boolean; // Accepts a boolean to hide text
};

const MainLogo = ({
  hideText = false,
  textColor = " ",
  logoSize = " w-12 h-12  md:w-20 md:h-20 ",
}: MainLogoProps) => {
  return (
    <div className="flex h-auto  items-center space-x-1 sm:space-x-3 cursor-pointer ">
      <Link href="/" className="!opacity-100">
        <div className={`relative rounded-full overflow-hidden ${logoSize}`}>
          <Image
            src="/images/costrad.png"
            alt="COSTrAD"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {!hideText && (
        <Link href={"/"}>
          {/* <Divider orientation='vertical' className='bg-gray-300' /> */}
          <div
            className={`${oswald.className} ${textColor} uppercase leading-[10px] text-[10px] md:text-sm 
              pl-1 sm:pl-3 border-left 
                    border-dotted border-l-foreground/20  border-l-1  border-style-dotted           
                        sm:leading-[1.2rem] font-light `}
          >
            College of Sustainable Transformation
            <br />
            And Development -{" "}
            <span className="normal-case font-medium">(COSTrAD)</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default MainLogo;
