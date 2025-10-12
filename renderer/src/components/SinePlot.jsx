import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function SinePlot({ data }) {
    const ref = useRef();

    useEffect(() => {
        if (!data.x.length) return;
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();

        const width = 400,
            height = 200,
            margin = 30;
        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(data.x)])
            .range([margin, width - margin]);
        const yScale = d3
            .scaleLinear()
            .domain([-1, 1])
            .range([height - margin, margin]);

        const line = d3
            .line()
            .x((d, i) => xScale(data.x[i]))
            .y((d) => yScale(d));

        svg.append("path")
            .datum(data.y)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);
    }, [data]);

    return <svg ref={ref} width={400} height={200}></svg>;
}
