const Reset=async()=>{
    const token = localStorage.getItem('token');
    const response = await fetch("http://localhost:5000/api/v1/game/reset", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
    });
    data = await response.json();
}
export default Reset;