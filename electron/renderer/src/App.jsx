import React, { useState, useEffect } from "react";
import axios from "axios";
import SinePlot from "./components/SinePlot";

export default function App() {
    const [freq, setFreq] = useState(1);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:5000/sine?freq=${freq}`)
            .then((res) => setData(res.data));
    }, [freq]);

    return (
        <div style={{ textAlign: "center" }}>
            <h2>Sine Wave Demo</h2>
            Frequency:{" "}
            <input
                type="number"
                step="0.1"
                value={freq}
                onChange={(e) => setFreq(parseFloat(e.target.value))}
            />
            <SinePlot data={data} />
        </div>
    );
}
