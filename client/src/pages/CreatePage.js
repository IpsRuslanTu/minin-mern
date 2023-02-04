import React from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useNavigate} from 'react-router-dom'

export const CreatePage = () => {
  const auth = React.useContext(AuthContext)
  const navigate = useNavigate()
  const {request} = useHttp()

  const [link, setLink] = React.useState('')

  const pressHandler = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          {from: link},
          {Authorization: `Bearer ${auth.token}`}
        )

        navigate(`/detail/${data.link._id}`)
      } catch (e) {console.log(e)}
    }
  }

  return (
    <div className='row'>
      <div className='col s8 offset-s2'>
        <div className='input-field'>
          <input
            placeholder='Вставьте ссылку'
            id='link'
            type='text'
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyDown={pressHandler}
          />
        </div>
      </div>
    </div>
  )
}