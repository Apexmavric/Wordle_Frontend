import React from "react";

export default function Block({ name, isgreen, id }) {
    const style = {
        backgroundColor: isgreen === 1 ? "rgb(154,210,50)" : isgreen === 2 ? "rgb(178, 190, 181)" : isgreen === 3 ? "rgb(255,255,0, 0.6)" : "rgb(21,20,20)",
    };
    return (
        <div id={`Block${id}`} key={`IBlock${id}`} className="block" style={style}>
            {name}
        </div>
    );
}

// 255, 87, 51 