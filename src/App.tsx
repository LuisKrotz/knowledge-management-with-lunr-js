// Import React and lunr

// DB
// https://firebase.google.com/docs/database/web/read-and-write
import firebaseConfig from './app/firebaseConfig.ts'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { child, get, getDatabase, ref } from 'firebase/database'

import React, { useState, useEffect } from 'react'
import lunr from 'lunr'

// Define the interface for the document type
interface Document {
    id: string
    title: string
    body: string
}

// Define some sample documents
const documents: Document[] = [
    {
        id: '1',
        title: 'Hello World',
        body: 'This is a simple document that says hello to the world.'
    },
    {
        id: '2',
        title: 'Goodbye World',
        body: 'This is another document that says goodbye to the world.'
    }
]

// Define a component that uses lunr to search the documents
const SearchComponent: React.FC = () => {
    // Initialize the state variables
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<Document[]>([])
    const [index, setIndex] = useState<lunr.Index | null>(null)

    // Initialize Firebase
    const app  = initializeApp(firebaseConfig)
    const analytics = getAnalytics(app )
    const dbRef = ref(getDatabase())

    const getDocuments = () => {
        get(child(dbRef, 'documents'))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val()

                    console.log('available data', data)
                } else {
                    console.log('No data available')
                }
            })
            .catch((error) => console.error(error))
    }

    // Create the lunr index when the component mounts
    useEffect(() => {
        getDocuments()

        setIndex(
            lunr(function () {
                this.ref('id')
                this.field('title')
                this.field('body')

                documents.forEach((doc) => {
                    this.add(doc)
                })
            })
        )
    }, [])

    // Handle the query change event
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Get the query value
        const query = event.target.value

        // Set the query state
        setQuery(query)

        // Search the index with the query
        if (index) {
            const results = index.search(query).map(({ ref }) => {
                return documents.find((doc) => doc.id === ref)
            }) as Document[]

            // Set the results state
            setResults(results)
        }
    }

    // Render the component
    return (
        <div>
            <h1>Search Component</h1>
            <input type="text" value={query} onChange={handleChange} />
            <ul>
                {results.map((doc) => (
                    <li key={doc.id}>
                        <h2>{doc.title}</h2>
                        <p>{doc.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchComponent
