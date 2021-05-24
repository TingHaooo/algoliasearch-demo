/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext } from "react"
import { algoContext } from "../App"

type Maybe<T> = T |undefined

export interface IArticle {
  author_name: string;
  categories: string[];
  objectID: string;
  title: string;
}

const useAlgoArticles = <T>() => {

  const { index } = useContext(algoContext)
  const [data, setData] = useState<Maybe<T>>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Maybe<Error>>(undefined)

  const fetchData = async (queryString: string) => {
    if (queryString === "") {
      setData(undefined)
      return 
    }
    setLoading(true)
    setError(undefined)
    try {
      const { hits } = await index.search<T>(queryString, {
        attributesToRetrieve: ['title', 'categories', 'author_name'],
        hitsPerPage: 50,
      })
      setData(hits as any)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  return {
    data,
    loading,
    error,
    refetch: fetchData
  }
}

export default useAlgoArticles