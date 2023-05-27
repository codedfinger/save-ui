import React from 'react'
import { useHistory } from 'react-router-dom'
import "./Question.css"




const OnboardMessage = () => {
  const history = useHistory();
  return (
    <div className='question-contanier'>
        <section  className='question-subcontanier'>
            <header className='logo-header'>
            <img src='/green.png' alt='logo' className='logo1-btn'/>
             <p>Become a Consultant with us.</p>
            </header>

        <div className='onboard-message'>
        <h4 style={{padding:"50px"}}>Congrats. You have successfully signed up as a consultant with us. You will be hearing from us soon.</h4>
        <button style={{width:"240px"}} className='question2-btn' onClick={()=> history.push("/consultants")}>Go back to Home page</button>
        </div>
            
      </section>
</div>
  )
}

export default OnboardMessage