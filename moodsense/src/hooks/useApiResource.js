import { useEffect, useState } from 'react'

export const useApiResource = (loader, fallbackData = null) => {
  const [data, setData] = useState(fallbackData)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    loader()
      .then((response) => {
        if (isMounted) setData(response)
      })
      .catch((apiError) => {
        if (isMounted) setError(apiError.message)
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [loader])

  return { data, error, isLoading }
}
