import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enMessages from '../locales/en.json'
import viMessages from '../locales/vi.json'

export const locales = {
    en: 'English',
    vi: 'Tiếng Việt'
}

export const resources = {
    en: {
        common: enMessages
    },
    vi: {
        common: viMessages
    }
}

export const defaultNS = 'common'

i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    fallbackLng: 'vi',
    ns: ['common'],
    defaultNS,
    interpolation: {
        escapeValue: false
    }
})
