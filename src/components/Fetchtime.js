const Fetchtime = async()=>{
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:5000/api/v1/player/time", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data.time;
}

export default Fetchtime;