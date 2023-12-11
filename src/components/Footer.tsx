import { LANG_ROUTES, LANG_FOOTER } from '../app/lang.config'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = (globalLang) => {
    const [lang, setLang] = useState<any>('en')
    const [storedLang, setStoredLang] = useState<any>('EN')

    const [gitUrl, setGitUrl] = useState('')

    useEffect(() => {
        fetch('/.git/config')
            .then((response) => response.text())
            .then((text) => {
                const match = text.match(/url = (.+)/)
                if (match) {
                    setGitUrl(match[1])
                }
            })
        initLang()
    }, [])

    useEffect(() => {
        initLang()
    }, [globalLang])

    const initLang = () => {
        setStoredLang(globalLang.globalLang.toUpperCase())
        setLang(globalLang.globalLang)
    }

    return (
        <footer className='footer'>
            <nav className='footer__links'>
                <Link to={'/' + lang + LANG_ROUTES[storedLang]?.termsOfUse[0]} className='footer__links__item'>{LANG_ROUTES[storedLang]?.termsOfUse[1]}</Link>
                <Link to={'/' + lang + LANG_ROUTES[storedLang]?.privacyPolicy[0]} className='footer__links__item'>{LANG_ROUTES[storedLang]?.privacyPolicy[1]}</Link>
                <Link to={'/' + lang + LANG_ROUTES[storedLang]?.gdpr[0]} className='footer__links__item'>{LANG_ROUTES[storedLang]?.gdpr[1]}</Link>
                <a className='footer__links__item' href={gitUrl.replace('git@github.com:', 'https://github.com/').replace('.git', '')}>Github</a>
            </nav>
            <p className='footer__copy'>
                &copy; {new Date().getFullYear()} Luis Krötz. {LANG_FOOTER[storedLang]?.allRightsReserved}

            </p>
        </footer>
    )
}

export default Footer