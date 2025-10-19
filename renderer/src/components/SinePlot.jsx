import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function SinePlot({ data }) {
    const ref = useRef();

    useEffect(() => {
        if (!data.x.length) return;

        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();

        const width = 600,
            height = 400,
            margin = 30;

        const xScale = d3
            .scaleLinear()
            .domain([0, d3.max(data.x)])
            .range([margin, width - margin]);

        const yScale = d3
            .scaleLinear()
            .domain([-1, 1])
            .range([height - margin, margin]);

        // Gridlines
        const xAxisGrid = d3.axisBottom(xScale).tickSize(-height + 2 * margin).tickFormat("");
        const yAxisGrid = d3.axisLeft(yScale).tickSize(-width + 2 * margin).tickFormat("");

        svg.append("g")
            .attr("class", "plot-grid")
            .attr("transform", `translate(0, ${height - margin})`)
            .call(xAxisGrid);

        svg.append("g")
            .attr("class", "plot-grid")
            .attr("transform", `translate(${margin}, 0)`)
            .call(yAxisGrid);

        // Axes
        const xAxis = d3.axisBottom(xScale).ticks(5);
        const yAxis = d3.axisLeft(yScale).ticks(5);

        svg.append("g")
            .attr("class", "plot-axis")
            .attr("transform", `translate(0, ${height - margin})`)
            .call(xAxis);

        svg.append("g")
            .attr("class", "plot-axis")
            .attr("transform", `translate(${margin}, 0)`)
            .call(yAxis);

        // Line
        const line = d3
            .line()
            .x((d, i) => xScale(data.x[i]))
            .y((d) => yScale(d));

        svg.append("path")
            .datum(data.y)
            .attr("class", "plot-line")
            .attr("d", line);

        // // Circles
        // svg.selectAll("circle")
        //     .data(data.y)
        //     .join("circle")
        //     .attr("class", "plot-circle")
        //     .attr("cx", (d, i) => xScale(data.x[i]))
        //     .attr("cy", (d) => yScale(d))
        //     .attr("r", 5);

    }, [data]);

    return <svg ref={ref} width={600} height={400}></svg>;
}
