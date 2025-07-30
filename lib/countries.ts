/* eslint-disable @typescript-eslint/no-unused-vars */
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

export function getCountryCode(countryName: string): string | undefined {
  return countries.getAlpha2Code(countryName, "en");
}

export function countryCodeToFlagEmoji(code: string): string {
  if (!code) return "";
  return code
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}
