import LANG_PRIVACY_POLICY from '../../lang/lang.privacy-policy'
import Divider from './sub-components/Divider'

function PrivacyPolicy() {
    const privacyPolicy = LANG_PRIVACY_POLICY[localStorage.currentLanguage.toUpperCase()]

    return (
         <div className="app__main__sub-container">
            <h1>{privacyPolicy.title}</h1>
            <Divider />
            {privacyPolicy.paragraphs.map((paragraph, index) => {
                if (paragraph.type === 'p') {
                    return <p key={index}>{paragraph.text}</p>
                } else if (paragraph.type === 'h2') {
                    return <div key={index}><br /><h2 >{paragraph.text}</h2><br /></div>
                }
            })}
        </div>
    )
}

export default PrivacyPolicy