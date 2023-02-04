import React from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
  const auth = React.useContext(AuthContext)
  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()

  const [form, setForm] = React.useState({email: '', password: ''})

  React.useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  React.useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = e => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {
      console.log(e)
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Сократи ссылку</h1>
        <div className='card blue-grey darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Авторизация</span>
            <div>
              <div className='input-field'>
                <input
                  placeholder='Email'
                  id='email' name='email'
                  type='text'
                  className='validate'
                  value={form.email}
                  onChange={changeHandler}
                />
              </div>
              <div className='input-field'>
                <input
                  placeholder='Password'
                  id='password'
                  name='password'
                  type='password'
                  className='validate'
                  value={form.password}
                  onChange={changeHandler}
                />
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button className='btn yellow darken-4' style={{marginRight: 10}} disabled={loading} onClick={loginHandler}>
              Войти
            </button>
            <button className='btn grey lighten-1 black-text' onClick={registerHandler} disabled={loading}>
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}