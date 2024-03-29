import { useState } from "react";
import { SpecialButton } from "./SpecialButton";
import { HashRouter } from "react-router-dom";

export default function ProductCardHome({
  img = true,
  h = 60,
  p = true,
  showButton = true,
  applyPadding = true,
}) {
  const med = window.matchMedia("(min-width: 800px)");
  const [media, setMedia] = useState(med.matches);

  med.addEventListener("change", () => {
    setMedia(med.matches);
  });

  return (
    <div className="py-12 flex flex-rowmax-h-lg bg-[url('https://r4.wallpaperflare.com/wallpaper/275/469/224/germany-watzmann-sky-mountain-wallpaper-29a068dd511aad3b0677384f8041b69d.jpg')]">
      {/* da controllare il padding */}
      <div
        className={`${applyPadding ? "py-20" : "py-10"} ${
          media ? "pl-10" : ""
        }  max-h-30`}
      >
        <h1 className="font-bold text-s tablet:font-bold text-3xl pb-6 text-white ">
          Elevate Your Spirits on a Distilled
          <br /> Well-being Odyssey
        </h1>
        {media && p && (
          <p className="text-s tablet:text-l pb-6 text-white">
            Welcome to Loki, the ultimate destination for enthusiasts of
            exquisite spirits. In this haven of taste, we invite you to explore
            our diverse collection of alcoholic beverages, where well-being is
            distilled into every drop.
            <br /> From enveloping whiskies to distilled spirits, our exclusive
            selection promises a journey through a spectrum of flavors.
          </p>
        )}
        {showButton && <SpecialButton content="Shop now" />}
      </div>
      {media && img && (
        <img
          src="https://pngimg.com/d/whisky_PNG85.png"
          className="w-[30%] m-auto opacity-80 rotate z-999"
        />
      )}
    </div>
  );
}
