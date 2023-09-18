
import firebaseConfig from './app/firebaseConfig'
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

// Define a component that uses lunr to search the documents
const SearchComponent: React.FC = () => {
  // Initialize the state variables
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Document[]>([])
  const [index, setIndex] = useState<lunr.Index | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)

  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig)
  const analytics = getAnalytics(firebase)
  const dbRef = ref(getDatabase())

  const getDocuments = (): Promise<Document[]> => {
    return get(child(dbRef, 'documents/en-us'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const entries: Document[] = []

          data.forEach((entry, index) => {
            entries.push({
              id: index,
              title: entry.title,
              body: entry.body
            })
          })

          return Object.values(entries)

        } else {
          console.log('No data available')

          return []
        }
      })
      .catch((error) => {
        console.error(error)
        return []
      })
  }

  // Create the lunr index when the component mounts
  useEffect(() => {
    // Define an async function to fetch and index the documents
    const fetchAndIndex = async () => {
      // Wait for the promise to resolve and assign it to documents
      const docs: Document[] = await getDocuments()

      // Update the documents state
      setDocuments(docs)

      setIndex(
        lunr(function () {
          this.ref('id')
          this.field('title')
          this.field('body')

          docs.forEach((doc) => {
            this.add(doc)
          })
        })
      )

      // Set the loading state to false
      setLoading(false)
    }

    // Call the async function
    fetchAndIndex()
  }, [])

  // Handle the query change event
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Get the query value
    const query = event.target.value

    // Set the query state
    setQuery(query)

    console.log(query, results, documents)

    // Search the index with the query
    if (index) {
      const results = index.search(query).map(({ ref }) => {
        // Convert both ref and id to numbers before comparing them
        return documents.find((doc) => Number(doc.id) === Number(ref))
      }) as Document[]


      console.log(results)

      // Set the results state
      setResults(results)
    }
  }

  // Render the component
  return (
    <div>
      <h1>Search Component</h1>
      <input type='text' value={query} onChange={handleChange} />
      <ul>
        {loading ? (
          <li>Loading...</li>
        ) : (
          results.map((doc) => (
            <li key={doc.id}>
              <h2>{doc.title}</h2>
              <p>{doc.body}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default SearchComponent
