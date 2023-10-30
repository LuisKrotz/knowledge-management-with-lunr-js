function GDPR() {
    const gdpr = {
        title: 'GDPR and LGPD',
        sections: [
            {
                title: 'GDPR',
                paragraphs: [
                    {
                        text:
                            'The GDPR is a regulation in EU law on data protection and privacy for all individuals within the European Union (EU) and the European Economic Area (EEA). It came into effect on May 25, 2018.',
                        type: 'p'
                    },
                    {
                        text:
                            'We are committed to complying with the GDPR. We do not collect any personal information from our users. We only use Firebase\'s database analytics to track the usage of our website. If you have any questions about our GDPR compliance, please contact us.',
                        type: 'p'
                    }
                ]
            },
            {
                title: 'LGPD',
                paragraphs: [
                    {
                        text:
                            'The LGPD is a law in Brazil that regulates the processing of personal data of individuals in Brazil. It came into effect on September 18, 2020.',
                        type: 'p'
                    },
                    {
                        text:
                            'We are committed to complying with the LGPD. We do not collect any personal information from our users. We only use Firebase\'s database analytics to track the usage of our website. If you have any questions about our LGPD compliance, please contact us.',
                        type: 'p'
                    }
                ]
            }
        ]
    }

    return (
        <>
            <h1>{gdpr.title}</h1>
            {gdpr.sections.map((section, index) => {
                return (
                    <div key={index}>
                        <h2>{section.title}</h2>
                        {section.paragraphs.map((paragraph, index) => {
                            return <p key={index}>{paragraph.text}</p>
                        })}
                    </div>
                )
            })}
        </>
    )
}

export default GDPR