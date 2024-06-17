const StandingsText = () => {
    const pos = JSON.parse(localStorage.getItem('pos'));
    const text = pos === 1 ? 'st' : pos === 2 ? 'nd' : pos === 3 ? 'rd' : 'th'; 
    return (
        <div className="standings-text" dangerouslySetInnerHTML={{ __html: `You have secured ${pos}<sup>${text}</sup> position` }} />
    );
}

export default StandingsText;
