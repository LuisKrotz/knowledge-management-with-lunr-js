import { Routes, Route } from 'react-router-dom'

import Search from '../components/pages/Search'
import NotFound from '../components/pages/NotFound'

import GDPR from '../components/legal/GDPR'
import PrivacyPolicy from '../components/legal/PrivacyPolicy'
import TermsOfUse from '../components/legal/TermsOfUse'

import { LANG_ROUTES } from '../app/lang.config'
import { useEffect } from 'react'

const CreateRoutes = () => {
    const portuguese = LANG_ROUTES.BR
    const english = LANG_ROUTES.EN
    const spanish = LANG_ROUTES.ES

    const portugueseMain = [portuguese.main[0], portuguese.main[1]]
    const englishMain = [english.main[0], english.main[1]]
    const spanishMain = [spanish.main[0], spanish.main[1]]

    const path = window.location.pathname.toLowerCase()
    let lang: any = localStorage.getItem('currentLanguage')

    if (path === '/') {
        const origin = window.location.origin

        if (!lang) {
            lang = navigator.language

            switch (lang) {
                case lang.indexOf('pt') > -1:
                    lang = 'br'
                    break
                case lang.indexOf('es') > -1:
                    lang = 'es'
                    break
                default:
                    lang = 'en'
                    break
            }

            localStorage.setItem('currentLanguage', lang)
            window.location.replace(`${origin}/${lang}`)
        } else window.location.replace(`${origin}/${lang}`)
    } else if (path.indexOf('/br') > -1)
        localStorage.setItem('currentLanguage', 'br')
    else if (path.indexOf('/es') > -1)
        localStorage.setItem('currentLanguage', 'es')
    else if (path.indexOf('/en') > -1)
        localStorage.setItem('currentLanguage', 'en')

    useEffect(() => {
        document.documentElement.lang = lang === 'br' ? 'pt-BR' : lang
    }, [])

    return (
        <Routes>
            <Route
                path={portugueseMain[0]}
                element={<Search data-title={portugueseMain[1]} />}
            />
            <Route
                path={portugueseMain[0] + portuguese.gdpr[0]}
                element={
                    <GDPR
                        data-title={`${portuguese.gdpr[1]} | ${portugueseMain[1]}`}
                    />
                }
            />
            <Route
                path={portugueseMain[0] + portuguese.privacyPolicy[0]}
                element={
                    <PrivacyPolicy
                        data-title={`${portuguese.privacyPolicy[1]} | ${portugueseMain[1]}`}
                    />
                }
            />
            <Route
                path={portugueseMain[0] + portuguese.termsOfUse[0]}
                element={
                    <TermsOfUse
                        data-title={`${portuguese.termsOfUse[1]} | ${portugueseMain[1]}`}
                    />
                }
            />
            <Route
                path={englishMain[0]}
                element={<Search data-title={englishMain[1]} />}
            />
            <Route
                path={englishMain[0] + english.gdpr[0]}
                element={
                    <GDPR
                        data-title={`${english.gdpr[1]} | ${englishMain[1]}`}
                    />
                }
            />
            <Route
                path={englishMain[0] + english.privacyPolicy[0]}
                element={
                    <PrivacyPolicy
                        data-title={`${english.privacyPolicy[1]} | ${englishMain[1]}`}
                    />
                }
            />
            <Route
                path={englishMain[0] + english.termsOfUse[0]}
                element={
                    <TermsOfUse
                        data-title={`${english.termsOfUse[1]} | ${englishMain[1]}`}
                    />
                }
            />

            <Route
                path={spanishMain[0]}
                element={<Search data-title={spanishMain[1]} />}
            />
            <Route
                path={spanishMain[0] + spanish.gdpr[0]}
                element={
                    <GDPR
                        data-title={`${spanish.gdpr[1]} | ${spanishMain[1]}`}
                    />
                }
            />
            <Route
                path={spanishMain[0] + spanish.privacyPolicy[0]}
                element={
                    <PrivacyPolicy
                        data-title={`${spanish.privacyPolicy[1]} | ${spanishMain[1]}`}
                    />
                }
            />
            <Route
                path={spanishMain[0] + spanish.termsOfUse[0]}
                element={
                    <TermsOfUse
                        data-title={`${spanish.termsOfUse[1]} | ${spanishMain[1]}`}
                    />
                }
            />

            <Route
                path={portugueseMain[0] + portuguese.notFound[0]}
                element={
                    <NotFound
                        data-title={`${portuguese.notFound[1]} | ${portugueseMain[1]}`}
                    />
                }
            />
            <Route
                path={`${portugueseMain[0]}/*`}
                element={
                    <NotFound
                        data-title={`${portuguese.notFound[1]} | ${portugueseMain[1]}`}
                    />
                }
            />

            <Route
                path={englishMain[0] + english.notFound[0]}
                element={
                    <NotFound
                        data-title={`${english.notFound[1]} | ${englishMain[1]}`}
                    />
                }
            />
            <Route
                path={`${englishMain[0]}/*`}
                element={
                    <NotFound
                        data-title={`${english.notFound[1]} | ${englishMain[1]}`}
                    />
                }
            />

            <Route
                path={spanishMain[0] + spanish.notFound[0]}
                element={
                    <NotFound
                        data-title={`${spanish.notFound[1]} | ${spanishMain[1]}`}
                    />
                }
            />
            <Route
                path={`${spanishMain[0]}/*`}
                element={
                    <NotFound
                        data-title={`${spanish.notFound[1]} | ${spanishMain[1]}`}
                    />
                }
            />

            <Route
                path="*"
                element={<NotFound data-title="404" />}
            />
        </Routes>
    )
}

export default CreateRoutes
