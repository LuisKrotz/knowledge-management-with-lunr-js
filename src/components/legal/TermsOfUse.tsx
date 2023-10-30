function TermsOfUse() {
    const termsOfUse = {
        title: 'Terms of Use',
        paragraphs: [
            {
                text:
                    'Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern our relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.',
                type: 'p'
            },
            {
                text:
                    'The term \'us\' or \'we\' refers to the owner of the website. The term \'you\' refers to the user or viewer of our website.',
                type: 'p'
            },
            {
                text: 'The use of this website is subject to the following terms of use:',
                type: 'p'
            },
            {
                text:
                    'All information provided on this website is for demonstration and educational purposes only. None of the data shown on this website is real. All information is open source and licensed under the terms of the MIT License.',
                type: 'li'
            },
            {
                text:
                    'If you use any of the information provided on this website, please make sure to quote the author and reference Lunr.js as the search engine used to power this website.',
                type: 'li'
            },
            {
                text:
                    'The content of the pages of this website is for your general information and use only. It is subject to change without notice.',
                type: 'li'
            },
            {
                text:
                    'Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.',
                type: 'li'
            },
            {
                text:
                    'Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.',
                type: 'li'
            },
            {
                text:
                    'This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.',
                type: 'li'
            },
            {
                text:
                    'All trademarks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.',
                type: 'li'
            },
            {
                text:
                    'Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.',
                type: 'li'
            },
            {
                text:
                    'From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).',
                type: 'li'
            },
            {
                text:
                    'Your use of this website and any dispute arising out of such use of the website is subject to the laws of Brazil.',
                type: 'li'
            },
            {
                text:
                    'If you have any questions about these terms of use, please contact us.',
                type: 'p'
            }
        ]
    }

    return (
        <div>
            <h1>{termsOfUse.title}</h1>
            {termsOfUse.paragraphs.map((paragraph, index) => {
                if (paragraph.type === 'p') {
                    return <p key={index}>{paragraph.text}</p>
                } else if (paragraph.type === 'li') {
                    return <li key={index}>{paragraph.text}</li>
                }
            })}
        </div>
    )
}

export default TermsOfUse