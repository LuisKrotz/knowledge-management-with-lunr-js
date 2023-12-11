import firebaseConfig from '../../app/firebaseConfig'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { child, get, getDatabase, ref } from 'firebase/database'
import { LANG_SEARCH } from '../../app/lang.config'

import React, { useState, useEffect, ReactNode, useRef } from 'react'
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
  const maxResults = 100
  // Initialize the state variables
  const [query, setQuery] = useState('')
  const [resultHistory, setResultHistory] = useState<Document[]>([])
  const [index, setIndex] = useState<lunr.Index | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [displayedResults, setDisplayedResults] = useState(maxResults)
  const [lang, setLang] = useState<any>(
    localStorage.getItem('currentLanguage').toUpperCase()
  )

  const ulRef = useRef<HTMLUListElement>(null)

  // Initialize Firebase
  const firebase = initializeApp(firebaseConfig)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const analytics = getAnalytics(firebase)
  const dbRef = ref(getDatabase())

  const getDocuments = (): Promise<Document[]> => {
    setLang(localStorage.getItem('currentLanguage').toUpperCase())

    let langCode = 'en-us'
    switch (lang.toLowerCase()) {
      case 'br':
        langCode = 'pt-BR'
        break
      case 'es':
        langCode = 'es'
        break
    }

    return get(child(dbRef, `data/${langCode}`))
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

  // Scroll to the bottom of the ul element
  useEffect(() => {
    if (ulRef.current) {
      ulRef.current.scrollTop = ulRef.current.scrollHeight
    }
  }, [resultHistory])

  // Re-render the component once the lang changes
  useEffect(() => {
    setLang(localStorage.getItem('currentLanguage').toUpperCase())
  }, [localStorage.getItem('currentLanguage')])

  // Handle the query change event
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const inputValue = event.currentTarget.querySelector('input').value

    if (query === inputValue || !inputValue) return

    setQuery(inputValue)
    const escapedQuery = inputValue.replace(/[:+-~]/g, '\\$&')
    // Search the index with the escaped query
    if (index) {
      // lunr does not support using both fuzzy search and field-based search in the same query.
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
      if (results.length > 0) setResultHistory((prevResultHistory) => [...prevResultHistory, results[0]])

      setDisplayedResults(maxResults)
    }
  }

  const clearQuery = () => {
    setQuery('')
    setResultHistory([])
    setDisplayedResults(0)
  }

  const handleClear = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    clearQuery()
  }

  // Render the component
  return (
    <div className='search'>
      <form className='search__form' onSubmit={handleSubmit} onReset={handleClear}>
        <div className='search__form__searchbox'>
          <input type='text' />
          <button type='submit'>
            <span className='hdn'>{LANG_SEARCH[lang]?.submit}</span>{'>'}</button>
        </div>
        <div className='search__form__clear'>
          <button type="reset">{LANG_SEARCH[lang]?.reset}</button>
        </div>
      </form>
      <ul className='search__answers' ref={ulRef}>
        {loading ? (
          <li>{LANG_SEARCH[lang]?.loading}</li>
        ) : (
          resultHistory.length > 0 ? (
            <>
              {resultHistory.slice(0, displayedResults).map((result, index) => (
                <li key={index}>
                  <p><small>{LANG_SEARCH[lang]?.searchingFor} {result?.question}</small></p>
                  <p>{result?.answer}</p>
                  <p><small>Confidence Level: {Number(result?.confidence).toFixed(2)}</small></p>
                  <br />
                </li>
              ))}
              {query.length > 1 && resultHistory.length === 0 && <li>{LANG_SEARCH[lang]?.noResults}</li>}
            </>
          ) : (
            query.length > 1 && <li>{LANG_SEARCH[lang]?.noResults}</li>
          )
        )}
      </ul>
    </div>
  )
}

// Use React.memo to wrap the component and avoid re-rendering if the props do not change
export default React.memo(Search)
