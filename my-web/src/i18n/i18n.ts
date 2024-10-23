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

i18n.use(initReactI18next).init({
    resources,
    lng: 'vi',
    fallbackLng: 'vi',
    ns: ['common', 'permission'], // Thêm namespace `permission` ở đây
    defaultNS: 'common', // Ngôn ngữ mặc định
    interpolation: {
        escapeValue: false // React đã xử lý thoát ký tự
    }
})

export default i18n
