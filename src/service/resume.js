// Resume PDFs live in public/, served as static files at /cv/<filename>.
// Add a locale key once a translated resume exists; it falls back to English.
const resuméByLocale = {
  en: 'resume-en.pdf'
}

export default {
  getResume(locale = 'en') {
    return `${import.meta.env.BASE_URL}${resuméByLocale[locale] ?? resuméByLocale.en}`
  }
}
