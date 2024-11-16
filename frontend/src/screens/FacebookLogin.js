import React from 'react'

const FacebookLogin = () => {
    
    const handleLogin = () => {
        window.location.href = `http://localhost:5000/api/auth/facebook/callback`;      
        localStorage.setItem("userEmail", handleLogin.email)
      localStorage.setItem("token", handleLogin.token)
    };

  return (
    <div>
        <button onClick={handleLogin} 
        style={{margin: "5px -4px", padding: "8px 30px", backgroundColor: "blue" }}>Login with Facebook</button>
    </div>
  )
}

export default FacebookLogin