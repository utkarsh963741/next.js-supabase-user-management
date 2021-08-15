import React from 'react'
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import styles from '../styles/Table.module.css'

function Table() {
    const [data, setData] = useState([])

    useEffect(()=>{
        setInterval(getData, 6000)
    },[])

    async function getData() {
    try {

        let { data, error, status } = await supabase
        .from('leaderboard')
        .select(`username, phone, bid_amount, status`)
        .order('status')
        .order('bid_amount', {ascending : false})

        console.log('data : ',data)
        setData(data)

        if (error && status !== 406) {
        throw error
        }

    } catch (error) {
        alert(error.message)
    }
    
    }

    function renderTableData() {
        return data.map((item, index) => {
           const { username, phone, bid_amount, status } = item //destructuring
           return (
              <tr key={index}>
                    <td>{index+1}</td>
                    <td>{username}</td>
                    <td>{phone}</td>
                    <td>₹ {bid_amount}</td>
                    <td style={{color:status=='confirmed'?'#04AA6D':'yellow'}}>{status}</td>
              </tr>
           )
        })
     }


    return (
        <div style={{width:'100%'}}> 
            <button style={{position:'absolute', top:'0px', right:'10%'}} onClick={() => getData()}>
                  Refresh
            </button>
            <table id={styles.leaderboard}>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Bid</th>
                    <th>Status</th>   
                </tr>
                {renderTableData()}
                </table>
        </div>
    )
}

export default Table
