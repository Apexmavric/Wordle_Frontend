const Reset=async()=>{
    const token = localStorage.getItem('token');
    const response = await fetch(process.env.REACT_APP_BACKEND_URL +"/api/v1/game/reset", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    });
    const data = await response.json();
    return data;
}
export default Reset;