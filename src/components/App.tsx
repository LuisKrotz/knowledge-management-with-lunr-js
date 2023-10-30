import Navbar from '../components/Navbar'
import CreateRoutes from '../routes/CreateRoutes'
import Footer from '../components/Footer'

import '../sass/app.scss'

function App() {
    return (
        <div className="app">
            <Navbar />

            <div className='app__main'>
                <CreateRoutes />
            </div>

            <Footer />
        </div>
    )
}

export default App
