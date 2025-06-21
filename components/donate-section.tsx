/* eslint-disable @next/next/no-img-element */
import { Star } from "lucide-react";
import React from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { baseUrl } from "@/lib/metadata";

interface Hero7Props {
  heading?: string;
  description?: string;
  button?: {
    text: string;
    url: string;
  };
  reviews?: {
    count: number;
    rating?: number;
    avatars: {
      src: string;
      alt: string;
    }[];
  };
}

const Donate = ({
  heading = "Counting on Your contribution",
  description = "Each donation made to (COSTrAD) has a significant effect that extends well beyond our walls. Your contribution will make the difference as we raise effective leaders for tomorrow. Thank you for your support.",
  button = {
    text: "Discover all components",
    url: "https://www.shadcnblocks.com",
  },
}: Hero7Props) => {
  return (
    <div className="space-y-3">
      <section className="py-8">
        <div className="container sm:text-left">
          <div className="flex flex-col max-w-3xl md:px-8 space-y-3">
            <h1 className="text-3xl  lg:text-5xl">{heading}</h1>
            <p className="text-left text-current lg:text-lg">{description}</p>
          </div>
        </div>
      </section>

      <section className="max-w-[85rem] mx-auto sm:px-6 lg:px-8">
        {/* Grid */}

        <div className="border-gray-500/20 gap-4 grid md:border md:gap-8 md:items-center md:p-8 rounded-3xl xl:gap-20">
          <div className="sm:p-4 md:p-8 space-y-5">
            <h1 className="block text-2xl text-current sm:text-3xl lg:text-5xl lg:leading-tight ">
              <span className="">COSTrAD</span> Giving Guide
            </h1>

            <p className="mt-3 text-current  max-w-5xl">
              We present several payment options, including Discover,
              MasterCard, American Express, Paypal, and Visa. Our customer
              service team is available to take your call between 9 a.m. and 5
              p.m. UTC, and we would be happy to assist you with any questions
              or concerns.
            </p>

            {/* Buttons */}
            <div className="py-5  w-full  ">
              <div className="cursor-pointer" data-hs-overlay="#donate">
                <img
                  src="/images/all-cards.webp"
                  alt="Donate with Paypal or Credit Card"
                  className="w-auto rounded-md"
                />
              </div>
            </div>
          </div>
          {/* End Col */}

          <div
            className="min-h-[35vh] bg-center bg-cover bg-no-repeat relative rounded-xl md:min-h-[75vh]"
            style={{
              backgroundImage: "url('/images/donate2.webp')",
            }}
          >
            <div className="md:absolute bottom-0 left-0 right-0 md:max-w-4xl text-center mx-auto p-6 md:left-auto md:text-left md:mx-0">
              {/* Card */}
              <div className="px-5 py-4 inline-block bg-white rounded-lg md:p-7 dark:bg-gray-800 space-y-3 text-[13px]">
                <div className=" md:block">
                  <h3 className="text-lg font-bold text-current sm:text-2xl dark:text-gray-200">
                    Bank Account Details
                  </h3>
                  <p className="mt-2 text-current dark:text-gray-200">
                    <span className="font-bold">Foundation:</span>{" "}
                    <span className="text-firefly-500">
                      LOGOS-RHEMA FOUNDATION [COSTrAD]
                    </span>
                    <br />
                    <span className="font-bold">Benefactor:</span>{" "}
                    <span className="text-firefly-500">
                      COLLEGE OF SUSTAINABLE TRANSFORMATION AND DEVELOPMENT
                    </span>
                    <br />
                    <span className="font-bold">USD Dollar Account:</span>{" "}
                    <span className="text-firefly-500">344 100 014 7133</span>
                    <br />
                    <span className="font-bold">Cedi Account:</span>{" "}
                    <span className="text-firefly-500">1441000147127</span>
                    <br />
                    <span className="font-bold">Bank Name:</span>{" "}
                    <span className="text-firefly-500">ECOBANK</span>
                    <br />
                    <span className="font-bold">Branch:</span>{" "}
                    <span className="text-firefly-500">SILVER STAR TOWERS</span>
                    <br />
                    <span className="font-bold">Address:</span>{" "}
                    <span className="text-firefly-500">
                      ECOBANK - SILVER STAR BRANCH,
                      <br />
                      SOUTH LIBERATION LINK,
                      <br />
                      GROUND FLOOR, SILVER STAR TOWER,
                      <br />
                      AIRPORT, ACCRA, GREATER ACCRA REGION, GHANA
                    </span>
                    <br />
                    <span className="font-bold">Branch Code:</span>{" "}
                    <span className="text-firefly-500">130105</span>
                    <br />
                    <span className="font-bold">SWIFT Code:</span>{" "}
                    <span className="text-firefly-500">ECOCGHAC</span>
                    <br />
                  </p>
                </div>
              </div>
              {/* End Card */}
            </div>
          </div>
        </div>
        {/* End Grid */}
      </section>

      <section className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="border-gray-500/20 gap-4 grid md:border md:gap-8 md:items-center md:p-2 rounded-3xl">
          {/* Gradients */}
          <div aria-hidden="true" className="flex absolute left-0 -z-[1]">
            <div className="bg-purple-200 opacity-20 blur-3xl w-auto h-[300px] dark:bg-purple-900 dark:opacity-20"></div>
          </div>

          {/* Grid */}
          <div className="md:grid md:grid-cols-8 md:gap-8 md:items-center place-items-center">
            <div className="hidden md:block md:col-span-3">
              <img
                className="aspect-video h-96 rounded-2xl"
                src="/images/cheque_.webp"
                alt="Image Description"
              />
            </div>
            {/* End Col */}

            <div className="md:col-span-5 h-auto ">
              {/* Blockquote */}
              <blockquote className="space-y-3">
                <div className="space-y-2">
                  <svg
                    className="w-16 h-16 text-gray-800 dark:text-white"
                    viewBox="0 -9 58 58"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <g clipPath="url(#clip0_1503_2376)">
                        <g clipPath="url(#clip1_1503_2376)">
                          <path
                            d="M3.5614 0.5H54.4386C56.1256 0.5 57.5 1.87958 57.5 3.58974V36.4103C57.5 38.1204 56.1256 39.5 54.4386 39.5H3.5614C1.87437 39.5 0.5 38.1204 0.5 36.4103V3.58974C0.5 1.87958 1.87437 0.5 3.5614 0.5Z"
                            stroke="#F3F3F3"
                          />
                          <path
                            d="M49.5 8.5H8.5V31.5H49.5V8.5Z"
                            fill="#D9DDE1"
                          />
                          <path d="M46 16H36V19H46V16Z" fill="white" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M32 16H12V17H32V16ZM24 27H12V28H24V27ZM12 24H20V25H12V24ZM28 19H12V20H28V19Z"
                            fill="#001018"
                          />
                          <path d="M50 8H8V12H50V8Z" fill="white" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M36.7051 24.5019C36.7041 24.5028 36.7032 24.5037 36.7022 24.5047C36.6753 24.5317 36.6403 24.5774 36.6049 24.6407C36.5702 24.7027 36.5419 24.7697 36.523 24.8304C36.5137 24.8603 36.5076 24.8859 36.5039 24.9061C36.5021 24.9161 36.5011 24.9239 36.5006 24.9296C36.5 24.9348 36.5 24.9374 36.5 24.9374V24.9373C36.5 25.2135 36.2761 25.4373 36 25.4373C35.7239 25.4373 35.5 25.2135 35.5 24.9373C35.5 24.6778 35.6043 24.3812 35.7321 24.1527C35.7998 24.0316 35.8869 23.9061 35.9941 23.7986C36.0979 23.6945 36.2475 23.5803 36.4425 23.5316C37.1017 23.3668 37.5808 23.8553 37.8258 24.176C38.0855 24.516 38.2812 24.9256 38.3881 25.1494C38.3944 25.1625 38.4003 25.1749 38.406 25.1867C38.4856 25.3527 38.5367 25.5599 38.5756 25.7292C38.5901 25.7925 38.6036 25.8534 38.6167 25.913C38.6434 26.0343 38.6689 26.15 38.7001 26.2688C38.7458 26.4431 38.7924 26.5761 38.8422 26.6679C38.8718 26.7225 38.8925 26.7438 38.8995 26.7501C38.9607 26.7725 38.9804 26.7621 38.9881 26.7581C38.9886 26.7578 38.989 26.7576 38.9894 26.7574C39.0157 26.7445 39.0705 26.7027 39.138 26.5943C39.2755 26.3734 39.3637 26.0409 39.3935 25.8055C39.3982 25.7687 39.3956 25.7 39.3777 25.5681C39.3742 25.5425 39.37 25.5131 39.3653 25.4812C39.3505 25.3794 39.3319 25.2516 39.3237 25.1368C39.3129 24.9843 39.3117 24.7717 39.3933 24.5653C39.4865 24.3293 39.6705 24.1447 39.9364 24.0516C40.6483 23.8025 41.1902 24.2474 41.5063 24.5797C41.6474 24.7281 41.7816 24.8944 41.8957 25.036C41.9167 25.0621 41.9371 25.0873 41.9567 25.1115C42.0952 25.2821 42.1935 25.3942 42.2743 25.46C42.3875 25.5523 42.4453 25.5537 42.4639 25.5535C42.4964 25.553 42.5564 25.5401 42.6687 25.4724C42.7553 25.4202 42.8349 25.3607 42.9359 25.2852C42.9765 25.2549 43.0206 25.2219 43.07 25.1858C43.2227 25.0742 43.4204 24.938 43.6501 24.8519C43.9092 24.7548 44.3436 24.6412 44.7726 24.6191C44.9875 24.608 45.2274 24.6182 45.4531 24.6814C45.6803 24.7449 45.9306 24.8736 46.0985 25.1255C46.2517 25.3552 46.1896 25.6657 45.9598 25.8189C45.7305 25.9717 45.4208 25.9102 45.2674 25.6815C45.2671 25.6811 45.2668 25.6806 45.2664 25.6802C45.2669 25.6808 45.2673 25.6813 45.2676 25.6817C45.2675 25.6817 45.2674 25.6816 45.2674 25.6815C45.2627 25.6771 45.2421 25.6607 45.1837 25.6444C45.0998 25.6209 44.9782 25.6098 44.8242 25.6177C44.5153 25.6337 44.1823 25.7203 44.0012 25.7882C43.9076 25.8233 43.8026 25.889 43.6601 25.9932C43.6322 26.0135 43.6014 26.0366 43.5685 26.0612C43.4559 26.1455 43.318 26.2487 43.1848 26.3289C43.0035 26.4381 42.7642 26.5493 42.4783 26.5534C42.1786 26.5577 41.899 26.4441 41.6426 26.2353C41.47 26.0946 41.3108 25.9025 41.1803 25.7417C41.1566 25.7126 41.1335 25.6839 41.1108 25.6558C40.9962 25.5139 40.8921 25.385 40.7817 25.2689C40.5452 25.0203 40.4135 24.9721 40.3188 24.9831C40.3196 24.9516 40.3226 24.9368 40.3233 24.9332C40.3236 24.9322 40.3236 24.9321 40.3233 24.9328C40.32 24.9412 40.3108 24.9588 40.2928 24.9761C40.2802 24.9882 40.2699 24.9937 40.2667 24.9953C40.2661 24.9957 40.2657 24.9958 40.2657 24.9959C40.2657 24.9959 40.266 24.9957 40.2668 24.9955C40.283 24.9898 40.3002 24.9853 40.3188 24.9831C40.3183 25.0034 40.3187 25.0305 40.3212 25.066C40.3265 25.1411 40.337 25.213 40.35 25.3023C40.3558 25.3421 40.3621 25.3854 40.3687 25.4339C40.3866 25.5665 40.4084 25.7515 40.3856 25.9312C40.3459 26.2441 40.2292 26.7336 39.9869 27.1228C39.8644 27.3196 39.6856 27.5298 39.4295 27.6554C39.154 27.7904 38.8423 27.8009 38.529 27.6791C38.2435 27.5681 38.0698 27.341 37.9634 27.145C37.8556 26.9465 37.7849 26.7212 37.7328 26.5226C37.6966 26.3843 37.6637 26.2352 37.6348 26.1044C37.6228 26.0501 37.6115 25.999 37.601 25.9531C37.5598 25.7736 37.5291 25.6709 37.5043 25.619C37.5009 25.612 37.4975 25.605 37.4941 25.5978C37.3822 25.3643 37.2259 25.038 37.0311 24.783C36.8523 24.549 36.7465 24.5078 36.7051 24.5019Z"
                            fill="#001018"
                          />
                          <path
                            d="M49.5 8.5H8.5V31.5H49.5V8.5Z"
                            stroke="#EFF1F3"
                          />
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_1503_2376">
                          <rect width="58" height="40" fill="white" />
                        </clipPath>
                        <clipPath id="clip1_1503_2376">
                          <rect width="58" height="40" fill="white" />
                        </clipPath>
                      </defs>
                    </g>
                  </svg>
                  <div className="bg-gradient-to-r from-gray-200 to-white/0 h-0.5 mt-3 dark:from-gray-700 dark:to-slate-900/0">
                    <div className="bg-gray-400 w-16 h-0.5" />
                  </div>

                  <div className="py-5">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
                      {" "}
                      <span className="pt-2">
                        Donate Via Mail or Bank Deposit
                      </span>
                    </h1>

                    <p className="text-md text-gray-800 md:text-lg md:leading-normal tracking-tight dark:text-gray-200">
                      For your donations via cheque, mail to "
                      <span className="  text-gray-900 dark:text-gray-50 text-gradient__teal">
                        P.O Box CT 4467 Cantonments, Accra; Greater Accra
                        Region, Ghana
                      </span>
                      " , with "College of Sustainable Transformation And
                      Development" as beneficianry. Thank you in advance.
                    </p>
                  </div>
                </div>
                {/* End Icon Block */}

                <footer className="flex gap-x-16 items-center justify-start ">
                  <div className="flex items-center">
                    <div className="md:ml-0">
                      <span className="text-md font-medium text-gray-800 dark:text-white">
                        Mail To:
                      </span>
                      <p className="text-sm">
                        <span className="  prominent-titles-2">
                          P.O Box CT 4467 <br />
                          Cantonments, Accra, Ghana.
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="md:ml-0">
                      <span className="text-md font-medium text-gray-800 dark:text-white">
                        Payee:
                      </span>
                      <p className="text-sm">
                        <span className="  prominent-titles-2">
                          College of Sustainable Transformation
                          <br />
                          And Development.
                        </span>
                      </p>
                    </div>
                  </div>
                </footer>
              </blockquote>
              {/* End Blockquote */}
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
      </section>
    </div>
  );
};

export default Donate;
