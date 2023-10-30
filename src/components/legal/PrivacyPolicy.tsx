function PrivacyPolicy() {
    const privacyPolicy = {
        title: 'Privacy Policy',
        paragraphs: [
            {
                text:
                    'This privacy policy sets out how we use and protect any information that you give us when you use this website. We are committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement.',
                type: 'p'
            },
            {
                text:
                    'We may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.',
                type: 'p'
            },
            {
                text: 'What we collect',
                type: 'h2'
            },
            {
                text:
                    'We do not collect any personal information from our users. We only use Firebase\'s database analytics to track the usage of our website.',
                type: 'p'
            },
            {
                text: 'What we do with the information we gather',
                type: 'h2'
            },
            {
                text:
                    'We use Firebase\'s database analytics to track the usage of our website. This helps us analyze data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.',
                type: 'p'
            },
            {
                text: 'Security',
                type: 'h2'
            },
            {
                text:
                    'We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.',
                type: 'p'
            },
            {
                text: 'How we use cookies',
                type: 'h2'
            },
            {
                text:
                    'A cookie is a small file which asks permission to be placed on your computer\'s hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.',
                type: 'p'
            },
            {
                text:
                    'We use traffic log cookies to identify which pages are being used. This helps us analyze data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.',
                type: 'p'
            },
            {
                text:
                    'Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.',
                type: 'p'
            },
            {
                text:
                    'You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.',
                type: 'p'
            },
            {
                text: 'Links to other websites',
                type: 'h2'
            },
            {
                text:
                    'Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites and such sites are not governed by this privacy statement. You should exercise caution and look at the privacy statement applicable to the website in question.',
                type: 'p'
            },
            {
                text: 'Controlling your personal information',
                type: 'h2'
            },
            {
                text:
                    'We do not collect any personal information from our users.',
                type: 'p'
            }
        ]
    }

    return (
        <div>
            <h1>{privacyPolicy.title}</h1>
            {privacyPolicy.paragraphs.map((paragraph, index) => {
                if (paragraph.type === 'p') {
                    return <p key={index}>{paragraph.text}</p>
                } else if (paragraph.type === 'h2') {
                    return <h2 key={index}>{paragraph.text}</h2>
                }
            })}
        </div>
    )
}

export default PrivacyPolicy