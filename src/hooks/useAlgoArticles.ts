/* eslint-disable react-hooks/exhaustive-deps */
import { SearchIndex } from "algoliasearch";
import { useState, useRef } from "react"

type Maybe<T> = T |undefined

export interface IArticle {
  author_name: string;
  categories: string[];
  objectID: string;
  title: string;
}
interface IUseAlgoArticles {
  index: SearchIndex
}

const useAlgoArticles = <T>({ index }: IUseAlgoArticles) => {

  const [data, setData] = useState<Maybe<T>>(undefined)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Maybe<Error>>(undefined)
  const lastPromise = useRef<any>()

  const fetchData = async (queryString: string) => {
    setLoading(true)
    setError(undefined)
    try {

      // send request
      const createIndexSearchPromise = queryString === "" ? new Promise<{ hits: undefined }>((resolve, reject) => {
        resolve({ hits: undefined })
      }) : index.search<T>(queryString, {
          attributesToRetrieve: ['title', 'categories', 'author_name'],
          hitsPerPage: 50,
      })
      
      // save last promise
      lastPromise.current = createIndexSearchPromise 

      const { hits } = await createIndexSearchPromise

      // To avoid race condition, only setDate if response is come from last promise
      if (lastPromise.current === createIndexSearchPromise) {
        setData(hits as any)
      }
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