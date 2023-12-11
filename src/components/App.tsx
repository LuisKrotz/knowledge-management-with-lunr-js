import Navbar from '../components/Navbar'
import CreateRoutes from '../routes/CreateRoutes'
import Footer from '../components/Footer'

import '../sass/app.scss'
import { useState } from 'react'

function App() {
    const [globalLang, setGlobalLang] = useState<any>(
        localStorage.getItem('currentLanguage')
    )

    const getLang = (lang) => {
        setGlobalLang(lang)
    }

    return (
        <div className="app">
            <Navbar getLang={getLang} />

            <div className='app__main'>
                <CreateRoutes />
            </div>

            <Footer globalLang={globalLang} />
        </div>
    )
}

export default App
