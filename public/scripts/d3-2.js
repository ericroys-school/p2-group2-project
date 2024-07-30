async function createBarChartFromJSON() {
    // Fetch JSON data (assuming it's an external file or API)
    const response = await fetch('data.json');
    const data = await response.json();

    // Declare the chart dimensions and margins.
    const width = 928;
    const height = 500;
    const marginTop = 30;
    const marginRight = 20;
    const marginBottom = 60;
    const marginLeft = 40;

    // Find max frequency
    const maxFrequency = d3.max(data, d => d.num);
  
    // Declare the x (horizontal position) scale.
    const x = d3.scaleBand()
        .domain(data.map(d => d.dif))
        .range([marginLeft, width - marginRight])
        .padding(0.1);
    
    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.num)])
        .range([height - marginBottom, marginTop]);
  
    // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", "100%")
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("max-width", width)
        .attr("preserveAspectRatio", "xMidYMid meet");
  
    // Add a rect for each bar.
    svg.append("g")
        .attr("fill", "green")
      .selectAll()
      .data(data)
      .join("rect")
        .attr("x", (d) => x(d.dif))
        .attr("y", (d) => y(d.num))
        .attr("height", (d) => y(0) - y(d.num))
        .attr("width", x.bandwidth())
        .attr("fill", (d) => d.num === maxFrequency ? "green" : "blue");
  
    // Add the x-axis and label.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add x-axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .attr("fill", "currentColor")
        .attr("font-weight", "bold")
        .text("DIFFICULTY");
  
    // Add the y-axis and label, and remove the domain line.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickFormat((y) => (y * 1).toFixed()))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text("# COMPLETED"));
  
    // Return the SVG element.
    return svg.node();
}

// Call the function and append the chart to a container
async function renderChart() {
    const chartContainer = document.getElementById('chart');
    const svgNode = await createBarChartFromJSON();
    chartContainer.appendChild(svgNode);
}

// Invoke the rendering function
renderChart();
