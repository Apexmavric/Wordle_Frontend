const Verify = async(data, time, row)=>{
    try{
        
        const token = localStorage.getItem('token');
        const resp = await fetch('http://localhost:5000/api/v1/game/verify', {
         method: "POST",
         headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify(
             {
                 word: data,
                 time: time,
                 row:row
             }
         )
     });
     const respdata = await resp.json();
     return respdata;
    }
    catch(err)
    {
        console.log(err);
    }
}

export default Verify;