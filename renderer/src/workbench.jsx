import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css"; // reuse main app styles
import SinePlot from "./components/SinePlot";

function Workbench() {
    const [freq, setFreq] = useState(1);
    const [checkboxValue, setCheckboxValue] = useState(false);
    const [selectedOption, setSelectedOption] = useState("option1");
    const [textValue, setTextValue] = useState("");

    const sampleData = {
        x: Array.from({ length: 100 }, (_, i) => (i / 100) * 2 * Math.PI),
        y: Array.from({ length: 100 }, (_, i) =>
            Math.sin((i / 100) * 2 * Math.PI * freq)
        ),
    };

    return (
        <div className="workbench-container">
            <h1>🧪 TraceLab Workbench</h1>
            <p>
                Use this area to test components, colors, and interactions
                without the full app.
            </p>

            <div className="widget-demo">
                <h2>Sine Plot</h2>
                <SinePlot data={sampleData} />
                <label>
                    Frequency:
                    <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={freq}
                        onChange={(e) => setFreq(Number(e.target.value))}
                    />
                </label>
            </div>

            <div className="widget-demo">
                <h2>Buttons</h2>
                <button className="dark-button">Primary Button</button>
                <button className="dark-button secondary">
                    Secondary Button
                </button>
            </div>

            <div className="widget-demo">
                <h2>Text Input</h2>
                <input
                    type="text"
                    placeholder="Type something..."
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    className="dark-input"
                />
            </div>

            <div className="widget-demo">
                <h2>Checkbox</h2>
                <label className="dark-checkbox">
                    <input
                        type="checkbox"
                        checked={checkboxValue}
                        onChange={(e) => setCheckboxValue(e.target.checked)}
                    />
                    Check me
                </label>
            </div>

            <div className="widget-demo">
                <h2>Dropdown / Combobox</h2>
                <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="dark-select"
                >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </select>
            </div>

            <div className="widget-demo">
                <h2>Radio Buttons</h2>
                <label>
                    <input
                        type="radio"
                        name="radioGroup"
                        value="a"
                        checked={selectedOption === "option1"}
                        onChange={() => setSelectedOption("option1")}
                    />
                    Choice A
                </label>
                <label>
                    <input
                        type="radio"
                        name="radioGroup"
                        value="b"
                        checked={selectedOption === "option2"}
                        onChange={() => setSelectedOption("option2")}
                    />
                    Choice B
                </label>
            </div>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Workbench />);
