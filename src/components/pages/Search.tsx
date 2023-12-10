import firebaseConfig from '../../app/firebaseConfig'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { child, get, getDatabase, ref } from 'firebase/database'

import React, { useState, useEffect, ReactNode } from 'react'
import lunr from 'lunr'

// Define the interface for the document type
interface Document {
  [x: string]: ReactNode
  id: string
  question: string
  answer: string
}

// Define a component that uses lunr to search the documents
const Search: React.FC = () => {
  // Initialize the state variables
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Document[]>([])
  const [index, setIndex] = useState<lunr.Index | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showMoreResults, setShowMoreResults] = useState(false)
  const [displayedResults, setDisplayedResults] = useState(1)

  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const analytics = getAnalytics(firebase)
  const dbRef = ref(getDatabase())

  const getDocuments = (): Promise<Document[]> => {


    return get(child(dbRef, `data/${localStorage.getItem('currentLanguage')}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const entries: Document[] = []

          data.forEach((entry, index) => {
            entries.push({
              id: index,
              question: entry.question,
              answer: entry.answer
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
          this.field('question')
          this.field('answer')

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
    const query = event.target.value
    setQuery(query)

    const escapedQuery = query.replace(/[:+-~]/g, '\\$&')

    // Search the index with the escaped query
    if (index) {
      //  lunr does not support using both fuzzy search and field-based search in the same query.
      // This is because lunr expects either a field name or a term after the colon (:), not an edit distance modifier (~).
      // To prevent any errors, we set a minimum of X chats to enable the search with the fuzzy option enabled
      // To use a fuzzy search option by add a ~ symbol after the query term
      // This will allow for some errors in spelling or typing
      // You can also adjust the number of errors allowed by adding a number after the ~ symbol
      // For example, query~2 will allow for up to two errors
      const results = escapedQuery.length > 2 ? index.search(`${escapedQuery}~2`).map(({ ref, score }) => {
        // Convert both ref and id to numbers before comparing them
        const document = documents.find((doc) => Number(doc.id) === Number(ref))
        return {
          ...document,
          confidence: score
        }
      }) as Document[] : []

      // Set the results state
      setResults(results)
      setShowMoreResults(false)
      setDisplayedResults(1)
    }
  }

  // Handle the show more results event
  const handleShowMoreResults = () => {
    setDisplayedResults(displayedResults + 3)
    if (displayedResults + 3 >= results.length) {
      setShowMoreResults(false)
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
          results.length > 0 ? (
            <>
              {results.slice(0, displayedResults).map((result, index) => (
                <li key={index}>
                  <h2>{result.question}</h2>
                  <p>{result.answer}</p>
                  <p>Confidence Level: {Number(result.confidence).toFixed(2)}</p>
                </li>
              ))}
              {results.length > displayedResults && (
                <button onClick={handleShowMoreResults}>Show More Results</button>
              )}
            </>
          ) : (
            query.length > 1 && <li>No results found</li>
          )
        )}
      </ul>
    </div>
  )
}

// Use React.memo to wrap the component and avoid re-rendering if the props do not change
export default React.memo(Search)
