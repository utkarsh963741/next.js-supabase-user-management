import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [status, setStatus] = useState(null)
  const [phone, setPhone] = useState(null)
  const [bid_amount, setBid_amount] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('leaderboard')
        .select(`username, phone, bid_amount, status`)
        .eq('id', user.id)
        .single()

      console.log('data : ',data)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setPhone(data.phone)
        setBid_amount(data.bid_amount)
        setStatus(data.status)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, phone, bid_amount }) {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      var status = bid_amount<6000?'waitlist':'confirmed'

      const updates = {
        id: user.id,
        username,
        phone,
        bid_amount,
        status,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('leaderboard').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
      <>
        <div className="form-widget dashed-border">    
            <div>
                <label style={{color:'white'}} htmlFor="email">Email</label>
                <input id="email" type="text" value={session.user.email} disabled />
            </div>
          <div className='flex'>
            <div style={{width:'48%', marginRight:'2%'}}>
              <label style={{color:'white'}} htmlFor="username">Name</label>
              <input
              id="username"
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div style={{width:'48%', marginLeft:'2%'}}>
              <label style={{color:'white'}} htmlFor="phone">Phone</label>
              <input
              id="phone"
              type="tel"
              value={phone || ''}
              onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div style={{position:'relative'}}>
              <label style={{color:'white'}} htmlFor="bid_amount">Bid Amount (0-6,000)</label>
              <span style={{position:'absolute', right:'0', top:'0'}}>₹ {bid_amount}</span>
              <input 
                type="range" 
                id="bid_amount" 
                name="bid_amount" 
                value={bid_amount || 0} 
                min="0" max="6000" step="500"
                onChange={(e) => setBid_amount(e.target.value)}/>
                
          </div>

          <div className='flex'>
            <div style={{width:'48%', marginRight:'2%'}}>
              <button
              className="button block primary"
              onClick={() => updateProfile({ username, phone, bid_amount })}
              disabled={loading}
              >
              {loading ? 'Loading ...' : 'Update'}
              </button>
            </div>

            <div style={{width:'48%', marginLeft:'2%'}}>
                <button className="button block" onClick={() => supabase.auth.signOut()}>
                  Sign Out
                </button>
            </div>
          </div>
        </div>
    </>
  )
}
