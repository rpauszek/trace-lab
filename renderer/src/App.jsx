import React, { useState, useEffect } from "react";

export default function App() {
    const [freq, setFreq] = useState(1);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Generate sine wave
        const points = 100;
        const sineData = Array.from({ length: points }, (_, i) => {
            const x = (i / points) * 2 * Math.PI;
            return { x, y: Math.sin(x * freq) };
        });
        setData(sineData);
    }, [freq]);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Sine Wave</h1>
            <input
                type="number"
                value={freq}
                min="0.1"
                step="0.1"
                onChange={(e) => setFreq(Number(e.target.value))}
            />
            <svg width="400" height="200" style={{ border: "1px solid black" }}>
                {data.map((point, idx) => (
                    <circle
                        key={idx}
                        cx={(point.x * 400) / (2 * Math.PI)}
                        cy={100 - point.y * 80}
                        r={2}
                        fill="blue"
                    />
                ))}
            </svg>
        </div>
    );
}
