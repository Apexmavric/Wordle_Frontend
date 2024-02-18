export default async function randomwordapi (){
    const resp = await fetch('https://random-word-api.herokuapp.com/word?length=5');
    const data = await resp.json();
    return data;
}