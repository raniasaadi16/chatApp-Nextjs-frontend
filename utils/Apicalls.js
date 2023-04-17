// const url = 'https://chat-app-rania.herokuapp.com/api'
// const url = 'http://localhost:5000/api'
const url = 'https://chat-app-backend.raniadev.com/api'
// const url = "https://chat-app-nextjs-backend.vercel.app/api"
//const url = "https://chat-app-nextjs-backend.vercel.app/api"
export const checkAuthToken = async (token) => {
    try{
        const res = await fetch(`${url}/users/isLoggedin/${token}`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true
            },
        })
        const data = await res.json()
        if(!res.ok){
            throw data  
        }
        return data   
    }catch(err){
        return console.log(err)
    }
}
export const checkAuth = async (req) => {
    try{
        const res = await fetch(`${url}/users/isLoggedin`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Credentials': true,
                "Access-Control-Allow-Origin": "https://chat-app.raniadev.com",
                Cookie: req.headers.cookie
            },
            credentials:'include',
        })
        const data = await res.json()
        if(!res.ok){
            throw data 
        }
        return data   
    }catch(err){
        return console.log(err)
    }
}
export const checkAuthTest = async () => {
    try{
        const res = await fetch(`${url}/users/isLoggedin`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
            },
        })
        const data = await res.json()
        if(!res.ok){
            throw data 
        }
        return data   
    }catch(err){
        return console.log(err)
    }
}
export const logout = async () =>{
    try{
        const res = await fetch(`${url}/users/logout`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
            },
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        return data
    }catch(err){
        console.log(err)
        return err
    }
}

export const loginRequest = async ({email, password}) => {
    try{
        const res = await fetch(`${url}/users/login`,{
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "https://chat-app.raniadev.com",
                'Access-Control-Allow-Credentials': true
            },
            credentials: "include",
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        } 
        return data.data       
    }catch(err){
        return err.message
    }
}

export const register = async ({firstName, lastName, email, password, passwordConfirm}) => {
    try{
        const res = await fetch(`${url}/users/signup`,{
            method: 'POST',
            body: JSON.stringify({firstName, lastName, email, password, passwordConfirm}),
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "https://chat-app.raniadev.com"
            },
            credentials: "include",
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        } 
        return data.data       
    }catch(err){
        return err.message
    }
}

export const GLogin = async (response) => {
    try{
        const res = await fetch(`${url}/users/login/g`,{
            method: 'POST',
            body: JSON.stringify({tokenId: response.tokenId}),
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "https://chat-app.raniadev.com"
            },
            credentials: "include",
        })    
       const data = await res.json()
        if(!res.ok){
            throw data
        } 
        return data.data   
      }catch(err){
          return err.message
      }
}

export const FbLogin = async ({accessToken, userID}) => {
    try{
        const res = await fetch(`${url}/users/login/fb`,{
            method: 'POST',
            body: JSON.stringify({accessToken, userID}),
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "https://chat-app.raniadev.com"
            },
            credentials: "include",
        })    
       const data = await res.json()
        if(!res.ok){
            throw data
        } 
        return data.data   
      }catch(err){
          return err.message
      }
}


export const getAllRooms = async (req) => {
    try{
        const res = await fetch(`${url}/rooms`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: req.headers.cookie
            }
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        return data.data.rooms
    }catch(err){
        //console.log(err)
        return err
    }
}

export const getRoom = async (req, roomId) => {
    try{
        const res = await fetch(`${url}/rooms/${roomId}`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: req.headers.cookie
            }
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        return data.data.room
    }catch(err){
        //console.log(err)
        return err
    }
}

export const joinRoom = async (roomId) => {
    try{
        const res = await fetch(`${url}/rooms/${roomId}`, {
            method: 'PATCH',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
            }
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        return data.data
    }catch(err){
        //console.log(err)
        return err
    }
}

export const getMessages = async (req, roomId) => {
    try{
        const res = await fetch(`${url}/rooms/${roomId}/messages`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: req.headers.cookie
            }
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        return data.data.messages
    }catch(err){
        //console.log(err)
        return err
    }
}

export const sendMessage = async (message, roomId) => {
    try{
        const res = await fetch(`${url}/rooms/${roomId}/messages`,{
            method: 'POST',
            body: JSON.stringify(message),
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "https://chat-app.raniadev.com"
            },
            credentials: "include",
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        } 
        return data.data       
    }catch(err){
        return err.message
    }
}

export const createRoom = async (roomData) => {
    try{
        const res = await fetch(`${url}/rooms`,{
            method: 'POST',
            body: JSON.stringify(roomData),
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "https://chat-app.raniadev.com"
            },
            credentials: "include",
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        } 
        return data.data       
    }catch(err){
        return err.message
    }
}

export const leaveRoom = async (chatId) => {
    try{
        const res = await fetch(`${url}/rooms/${chatId}/leave`,{
            method: 'PATCH',
            headers:{
                'Access-Control-Allow-Credentials': true,
            },
            credentials: "include",
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        } 
        return data.data       
    }catch(err){
        return err.message
    }
}

export const signUp = async (userData) => {
    try{
        const res = await fetch(`${url}/users/signup`,{
            method: 'POST',
            body: JSON.stringify(userData),
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "https://chat-app.raniadev.com"
            },
            credentials: "include",
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        } 
        return data.data       
    }catch(err){
        return err.message
    }
}

export const getMe = async (req) => {
    try{
        const res = await fetch(`${url}/users/getMe`, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: req.headers.cookie
            }
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        }
        return data.data.messages
    }catch(err){
        //console.log(err)
        return err
    }
}

export const updateMe = async (userData) => {
    try{
        const res = await fetch(`${url}/users/updateMe`,{
            method: 'POST',
            body: userData,
            headers:{
                "Access-Control-Allow-Origin": "https://chat-app.raniadev.com"
            },
            credentials: "include",
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        } 
        return data.data       
    }catch(err){
        return err.message
    }
}

export const updatePassword = async (userData) => {
    try{
        const res = await fetch(`${url}/users/updatePassword`,{
            method: 'POST',
            body: JSON.stringify(userData),
            headers:{
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "https://chat-app.raniadev.com"
            },
            credentials: "include",
        })
        const data = await res.json()
        if(!res.ok){
            throw data
        } 
        return data.data       
    }catch(err){
        return err.message
    }
}

