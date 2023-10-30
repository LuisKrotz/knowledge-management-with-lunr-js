import { LANG_ROUTES } from '../app/lang.config'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    const [lang, setLang] = useState<any>(LANG_ROUTES.EN)

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
    }, [location])

    const initLang = () => {
        const storedLanguage = localStorage.getItem('currentLanguage')

        if (storedLanguage !== null) {
            const storedLanguageUppercase = storedLanguage.toUpperCase()

            setLang(
                (LANG_ROUTES as { [key: string]: any })[
                storedLanguageUppercase
                ] as string
            )
        }
    }


    return (
        <footer className='footer'>
            <nav className='footer__links'>
                <Link to="/terms-of-use" className='footer__links__item'>Terms of Use</Link>
                <Link to="/privacy-policy" className='footer__links__item'>Privacy Policy</Link>
                <Link to="/gdpr" className='footer__links__item'>GDPR and LGPD</Link>
                <a className='footer__links__item' href={gitUrl.replace('git@github.com:', 'https://github.com/').replace('.git', '')}>Github <span className='hdn'>{lang.main[1]}</span></a>
            </nav>
            <p className='footer__copy'>
                &copy; {new Date().getFullYear()} Luis Krötz. All rights reserved.

            </p>
        </footer>
    )
}

export default Footer