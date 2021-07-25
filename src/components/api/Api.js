import axios from 'axios';


export const getAvailableBlood = (state, type) =>{
    let URL ="http://localhost:8080/getAvailableBlood";
    let x =[];
    const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            state: state,
            type: type
        })
    };
        axios.post(URL,{
            state: state,
            type: type
        })
        .then((res) =>{ 
            
            return res.data.results;
           
        })
        .catch(err=>{
            console.log(err)
        });
        
}