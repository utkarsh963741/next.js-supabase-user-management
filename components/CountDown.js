import React from 'react'
import { useState, useEffect } from 'react'

function CountDown() {
    const [time, setTime] = useState([])
    const [deadline, setDeadline] = useState(new Date("Aug 22, 2021 15:37:25").getTime())

    useEffect(() => {
        setInterval(function() {
            var now = new Date().getTime();
            var distance = deadline - now;
                
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
            setTime([days, hours , minutes ,seconds])
                
            if (distance < 0) {
                clearInterval(x);
                 setTime("EXPIRED");
            }
            }, 1000)
      }, [])

    return (
        <>
        <div className="flex flex-col text-center w-full mb-10">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">book your kit before its too late</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white-900">QtPi Robotics Kit Pre-Order</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">to pre-order sign up with your email and after authentication join the waitlist by making a payment of as low as ₹ 500 or pay the full amount of ₹ 6,000 for confirmed preorder. Incase you don't make it in the final list your payment will be refunded in full.</p>
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'20px'}}>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:'0 20px'}}>
                <span style={{fontSize:'30px'}}>{time[0]}</span>
                <h6>DAYS</h6>
            </div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:'0 20px'}}>
                <span style={{fontSize:'30px'}}>{time[1]}</span>
                <h6>HOURS</h6>
            </div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:'0 20px'}}>
                <span style={{fontSize:'30px'}}>{time[2]}</span>
                <h6>MINUTES</h6>
            </div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center', margin:'0 20px'}}>
                <span style={{fontSize:'30px'}}>{time[3]}</span>
                <h6>SECONDS</h6>
            </div>
        </div>
        </>
    )
}

export default CountDown
