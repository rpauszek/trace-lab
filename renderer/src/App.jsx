import React, { useState, useEffect } from "react";
import "./styles.css";
import SinePlot from "./components/SinePlot";

export default function App() {
    const [freq, setFreq] = useState(1);
    const [data, setData] = useState({ x: [], y: [] });

    useEffect(() => {
        const points = 100;
        const x = Array.from(
            { length: points },
            (_, i) => (i / points) * 2 * Math.PI
        );
        const y = x.map((xi) => Math.sin(xi * freq));
        setData({ x, y });
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
            <SinePlot data={data} />
        </div>
    );
}
