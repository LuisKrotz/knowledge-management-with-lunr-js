import LANG_TERMS_OF_USE from '../../lang/lang.terms-of-use'
import Divider from './sub-components/Divider'

function TermsOfUse() {
    const termsOfUse = LANG_TERMS_OF_USE[localStorage.currentLanguage.toUpperCase()]

    return (
        <div className="app__main__sub-container">
            <h1>{termsOfUse.title}</h1>
            <Divider />
            {termsOfUse.paragraphs.map((paragraph, index) => {
                if (paragraph.type === 'p') {
                    return <div key={index}><p>{paragraph.text}</p><br /></div>
                } else if (paragraph.type === 'li') {
                    return <div key={index}><p>&emsp;- {paragraph.text}</p><br /></div>
                }
               
            })}
        </div>
    )
}

export default TermsOfUse