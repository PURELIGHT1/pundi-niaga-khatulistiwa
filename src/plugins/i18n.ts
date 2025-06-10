import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  legacy: false,
  messages: {},
  numberFormats: {
    id: {
      currency: {
        style: "currency",
        currency: "IDR",
        currencyDisplay: "symbol",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      decimal: {
        style: "decimal",
      },
    },
  },
});

export default i18n;
