import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function SinePlot({ data }) {
    const svgRef = useRef();

    useEffect(() => {
        if (!data) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        const width = 600,
            height = 300,
            margin = 40;

        const x = d3
            .scaleLinear()
            .domain([0, 1])
            .range([margin, width - margin]);
        const y = d3
            .scaleLinear()
            .domain([-1, 1])
            .range([height - margin, margin]);

        const line = d3
            .line()
            .x((d) => x(d.x))
            .y((d) => y(d.y));
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        svg.append("g")
            .attr("transform", `translate(0,${height - margin})`)
            .call(d3.axisBottom(x));
        svg.append("g")
            .attr("transform", `translate(${margin},0)`)
            .call(d3.axisLeft(y));
    }, [data]);

    return <svg ref={svgRef} width={600} height={300}></svg>;
}
