import React from 'react'
import {AuthContext} from '../context/AuthContext'
import {useHttp} from '../hooks/http.hook'
import Loader from '../components/Loader'
import LinksList from '../components/LinksList'

export const LinksPage = () => {
  const [links, setLinks] = React.useState()
  const {token} = React.useContext(AuthContext)
  const {request, loading} = useHttp()

  const fetchLinks = React.useCallback(async () => {
    try {
      const fetched = await request('/api/link', 'GET', null,
        {Authorization : `Bearer ${token}`})

      setLinks(fetched)
    } catch (e) {
      console.log(e)
    }
  }, [token, request])

  React.useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <LinksList links={links} />}
    </>
  )
}