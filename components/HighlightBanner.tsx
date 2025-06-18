// components/HighlightBanner.tsx
import React from "react";

interface HighlightBannerProps {
  text: React.ReactNode;
  highlightText: string;
  icon: React.ReactNode;
}

const HighlightBanner: React.FC<HighlightBannerProps> = ({ text, highlightText, icon }) => {
  return (
    <section className="relative z-20 overflow-hidden p-4 pt-20 pb-8 md:pt-[120px] md:pb-[70px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-[60px] max-w-[920px] text-center md:mb-16 space-y-3">
              <div>
                <div className="mx-auto space-y-3">
                  <div className="overflow-hidden relative bg-firefly-50 dark:bg-firefly-900 dark:text-firefly-50 inline-block m-2 p-1 rounded-full bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500">
                    <div className="w-auto text-black px-4 py-2 font-semibold rounded-full bg-white dark:bg-slate-900 flex justify-center items-center gap-2 dark:text-white text-xs md:text-md">
                      {highlightText}
                      {icon}
                    </div>
                  </div>
                  <div className="text-lg text-body-color sm:text-xl leading-normal px-4">
                    {text}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightBanner;
