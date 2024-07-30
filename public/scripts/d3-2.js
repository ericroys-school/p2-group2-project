async function getAssoc() {
    let v = {};
    try {
      let res = await fetch("/api/user/todo");
      if (res.status === 200) {
        v = await res.json();
        //   console.log(v);
      } else {
        throw "Fetch of user info failed";
      }
      return v;
    } catch (err) {
      console.log(err);
    }
  }

  
async function getClimb(climbid){
    let v;
       try {
         let res = await fetch(`/api/climb/${climbid}`);
         if (res.status === 200) {
           v = await res.json();
            //  console.log(v);
         } else {
           throw "Fetch of climb info failed";
         }
         return v;
       } catch (err) {
         console.log(err)
       }
   }

   async function processClimbs(climbs) {
     let totals = {}
    const promises = climbs.map(async c => {
        const cc = await getClimb(c.id);
        totals.hasOwnProperty(cc.difficulty_yd.name) ? totals[cc.difficulty_yd.name]++ : totals[cc.difficulty_yd.name]=1;
        return cc.difficulty_yd.name;
    });
    // Wait for all Promises to resolve
    const results = await Promise.all(promises);
    return totals;
}

export async function createBarChartFromJSON() {

    /**
     * need data to look like : 
     * [
    { "dif": "5.7", "num": 1 },
    { "dif": "5.8", "num": 8 },
    { "dif": "5.9", "num": 16 },
    { "dif": "5.10a", "num": 5 },
    { "dif": "5.10b", "num": 12 },
    { "dif": "5.10c", "num": 2 },
    { "dif": "5.10d", "num": 20 },
    { "dif": "5.11a", "num": 10 },
    { "dif": "5.11b", "num": 8 },
    { "dif": "5.11c", "num": 0},
    { "dif": "5.11d", "num": 11 },
    { "dif": "5.12a", "num": 6 },
    { "dif": "5.12b", "num": 3 },
    { "dif": "5.12c", "num": 1},
    { "dif": "5.12d", "num": 10 }
]
     */
    const td = await getAssoc();
    let climbs = td && td.climbs ? td.climbs : [];
    let t = await processClimbs(climbs);
    let data = []
    Object.keys(t).forEach(i => data.push({dif: i, num:t[i]} ))
    // Declare the chart dimensions and margins.
    const width = 350;
    const height = 250;
    const marginTop = 30;
    const marginRight = 20;
    const marginBottom = 60;
    const marginLeft = 40;

//     // Find max frequency
    const maxFrequency = d3.max(data, d => d.num);
  
//     // Declare the x (horizontal position) scale.
    const x = d3.scaleBand()
        .domain(data.map(d => d.dif))
        .range([marginLeft, width - marginRight])
        .padding(0.1);
    
//     // Declare the y (vertical position) scale.
    const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => d.num)])
        .range([height - marginBottom, marginTop]);
  
//     // Create the SVG container.
    const svg = d3.create("svg")
        .attr("width", "100%")
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("max-width", width)
        .attr("preserveAspectRatio", "xMidYMid meet");
  
//     // Add a rect for each bar.
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
  
//     // Add the x-axis and label.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .attr("stroke", "black") // Color of the tick labels
        .call(d3.axisBottom(x).tickSizeOuter(0));

//     // Add x-axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 10)
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("font-weight", "bold")
        .text("DIFFICULTY");
  
//     // Add the y-axis and label, and remove the domain line.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).tickFormat((y) => (y * 1).toFixed()))
        .call(g => g.select(".domain").remove())
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "black")
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(""));
  
//     // Return the SVG element.
    return svg.node();
}

// Call the function and append the chart to a container
export async function renderChart() {
    const chartContainer = document.getElementById('barBody');
    const svgNode = await createBarChartFromJSON();
    chartContainer.appendChild(svgNode);
}
