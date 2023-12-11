import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { LANG_ROUTES, LANG_SELECTOR } from '../app/lang.config'

function Navbar() {
    const navigate = useNavigate()
    const about = ['', '']

    const main = ['', '']
    let selector

    const [lang, setLang] = useState<any>(
        localStorage.getItem('currentLanguage')
    )


    const updateLang = () => {
        const _lang = lang.toLowerCase()

        if (_lang.indexOf('br') > -1) {
            main[0] = LANG_ROUTES.BR.main[0]
            main[1] = LANG_ROUTES.BR.main[1]

            about[0] = main[0] + LANG_ROUTES.BR.about[0]
            about[1] = LANG_ROUTES.BR.about[1]

            selector = LANG_SELECTOR.BR

            return
        }

        if (_lang.indexOf('es') > -1) {
            main[0] = LANG_ROUTES.ES.main[0]
            main[1] = LANG_ROUTES.ES.main[1]

            about[0] = main[0] + LANG_ROUTES.ES.about[0]
            about[1] = LANG_ROUTES.ES.about[1]

            selector = LANG_SELECTOR.ES

            return
        }

        main[0] = LANG_ROUTES.EN.main[0]
        main[1] = LANG_ROUTES.EN.main[1]

        about[0] = main[0] + LANG_ROUTES.EN.about[0]
        about[1] = LANG_ROUTES.EN.about[1]

        selector = LANG_SELECTOR.EN
    }

    updateLang()

    useEffect(() => {
        document.documentElement.lang = lang

        updateLang()
    }, [localStorage.getItem('currentLanguage')])


    const handleChange = (value: string) => {
        if (value !== '') {
            setLang(value === 'br' ? 'pt-BR' : value)
            localStorage.setItem('currentLanguage', value)
            navigate(`/${value}`, { replace: true })
        }
    }

    return (
        <div className="navbar">
            <h1 className="navbar__title">
                {main[1]}
            </h1>

            <div className="navbar__right">
                <select
                    lang={lang}
                    className="navbar__language"
                    defaultValue={lang}
                    aria-label={LANG_SELECTOR[localStorage.getItem('currentLanguage').toUpperCase()].a11yDescription}
                    onChange={(event) => handleChange(event.target.value)}
                >
                    <option value="br">{selector.BR}</option>
                    <option value="en">{selector.EN}</option>
                    <option value="es">{selector.ES}</option>
                </select>
            </div>
        </div>
    )
}

export default Navbar
