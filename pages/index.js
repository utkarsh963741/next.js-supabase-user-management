import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import Auth from '../components/Auth'
import Account from '../components/Account'
import Table from '../components/Table'
import CountDown from '../components/CountDown'
// import Testimonial from '../components/Testimonial'

export default function Home() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 20px 0', display:'flex', flexDirection:'column', alignItems:'center' }}>
      <CountDown/>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
      <Table/>
      {/* <Testimonial/> */}
    </div>
  )
}