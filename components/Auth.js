import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Auth() {
  const [option, setOption] = useState(true)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (email, password) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signIn({ 
        email: email,
        password: password, 
      })
      if (error) throw error
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      
      setLoading(false)
    }
  }

  const handleSignUp = async (email, password) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signUp({ 
        email: email,
        password: password, })
      if (error) throw error
      alert('Check your email for the Confirmation Mail!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='dashed-border'>
      <div className="row flex flex-center" >
          <button style={{margin: '10px', width:"200px", background:option?'cornflowerblue':''}} className="button block" onClick={() => setOption(true)}>
                SignUp
          </button>
          <button style={{margin : '10px', width:"200px", background:option?'':'cornflowerblue'}}  className="button block" onClick={() => setOption(false)}>
                Login
          </button>
      </div>
    <div className="row flex flex-center">

      <div style={{display:option?'block':'none'}} className="col-6 form-widget">
        <p className="description" style={{marginBottom : '10px', textAlign:'center'}}>Sign Up </p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{marginBottom : '10px'}}
          />
          <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{marginBottom : '10px'}}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleSignUp(email, password)
            }}
            className="button block primary"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Sign Up'}</span>
          </button>
        </div>
      </div>
      
      <div style={{display:option?'none':'block'}} className="col-6 form-widget">
        <p className="description" style={{marginBottom : '10px', textAlign:'center'}}>Login</p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{marginBottom : '10px'}}
          />
          <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{marginBottom : '10px'}}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email, password)
            }}
            className="button block primary"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Log In'}</span>
          </button>
        </div>
      </div>
    
    </div>
    </div>
  )
}