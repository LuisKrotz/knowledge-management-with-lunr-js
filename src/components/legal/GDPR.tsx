import LANG_GDPR from '../../lang/lang.gdpr'
import Divider from './sub-components/Divider'

function GDPR() {
const gdpr = LANG_GDPR[localStorage.currentLanguage.toUpperCase()]

    return (
        <div  className="app__main__sub-container">
            <h1>{gdpr.title}</h1>
            <Divider />
            {gdpr.sections.map((section, index) => {
                return (
                    <div key={index}>
                        <h2>{section.title}</h2>
                        {section.paragraphs.map((paragraph, index) => {
                            return <p key={index}>{paragraph.text}</p>
                        })}
                        <br />
                    </div>
                )
            })}
        </div>
    )
}

export default GDPR