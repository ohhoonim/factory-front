import { createI18n } from 'vue-i18n'
import ko from './langs/ko'
import en from './langs/en'
const messages = {
    ko,
    en,
}
const i18n = createI18n({
    legacy: false, // you must set `false`, to use Composition API
    locale: 'ko', // set locale
    fallbackLocale: 'en', // set fallback locale
    messages,
})

export default i18n;

