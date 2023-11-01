function _1(md){return(
md`# Visualising absolute and anomaly temperature.
## In favor of more useful visual marks.`
)}

function _2(md){return(
md`When we talk about temperature in a climate change context, we usually see noisy line charts of yearly anomaly from a reference period. This reference period can change among sources. See three examples below.`
)}

async function _3(FileAttachment,htl){return(
htl.html`<div class="grid">
  <figure class="child">
    <img src="${await FileAttachment("met.png").url()}" alt="MET office" />
      <figcaption>© MET office. Deviation from 1850-1900 period.</figcaption>
  </figure>
  <figure class="child">
    <img src="${await FileAttachment("nasa.png").url()}" alt="NASA" />
    <figcaption>© NASA. Deviation from 1951-1980 period.</figcaption>
  </figure>
  <figure class="child">
    <img src="${await FileAttachment("copernicus.png").url()}" alt="Copernicus" />
    <figcaption>© Copernicus. Deviation from 1991-2020 period.</figcaption>
  </figure>
</div>
<style>
  .grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.child img {
  width: 100%;
  height: auto;
/*   vertical-align: top; */
}
</style>`
)}

function _4(md){return(
md`To better understand why it can be an issue to use a line mark with absolute or anomaly temperature, let's try a simple minimalist line chart from [Berkeley Earth Land/Ocean Temperature](https://berkeleyearth.org/data/).`
)}

function _indicator(Inputs){return(
Inputs.radio(
  ["absolute", "anomaly_1951_1980", "anomaly_1850_1900"],
  {
    label: "Variable:",
    value: "absolute"
  }
)
)}

function _6(Plot,indicator,annual_data){return(
Plot.plot({
  caption: "Source: Berkeley Earth Land/Ocean Temperature.",
  y: {
    label:
      indicator === "absolute"
        ? "absolute temperature (°C)"
        : indicator === "anomaly"
        ? "deviation from 1951-1980 average"
        : "deviation from 1850-1900 average"
  },
  marks: [
    Plot.lineY(annual_data, {
      x: "date",
      y: indicator,
      stroke: "coral"
    })
  ]
})
)}

function _7(md){return(
md`🧐   
**See some differences?**   
Apart from the y-axis, nothing visually helps us to understand absolute or anomaly temperature. But we can reinforce both concepts with effective visual mark choices.

**Absolute temperatures** are best to highlight an evolution, a tendency. By using a line mark, we link all values together to easily compare a value to the previous/next one and strengthen horizontal reading.   
As year-to-year variation can be noisy, a rolling average of 5 years helps us to see the long-term tendency. For transparency, we can suggest short-term variation with a dot mark in the background.   
Then comes the context: climate change and climate targets. What is a +1.5°C or +2°C target in absolute temperature? Which period are these targets referencing? Annotations is an effective solution.`
)}

function _8(Plot,baseline_plot,annual_data,paris_targets_plot,annual_baseline_1850_1900){return(
Plot.plot({
  title: "Global surface temperature, 1850-2022",
  subtitle: "Black curve: 5 years rolling average",
  caption: "Source: Berkeley Earth Land/Ocean Temperature.",
  style: { background: "#fff7eb" },
  marginTop: 40,
  y: {
    grid: true,
    label: "↑ temperature (°C)",
    ticks: 5,
    tickFormat: (d) =>
      d.toLocaleString(undefined, { minimumFractionDigits: 1 }),
    tickSize: 4
  },
  marks: [
    // Baseline reference (1850 to 1900)
    baseline_plot(annual_data, "absolute"),

    // Raw values
    Plot.dotY(annual_data, {
      x: "date",
      y: "absolute",
      r: 2,
      fill: "antiquewhite",
      stroke: "coral",
      strokeWidth: 1
    }),

    // Target 1.5°C and 2°C
    paris_targets_plot(undefined, { baseline: annual_baseline_1850_1900 }),

    // 5 years rolling average
    Plot.lineY(
      annual_data,
      Plot.windowY(5, {
        x: "date",
        y: "absolute",
        curve: "cardinal",
        strokeWidth: 1.5,
        tip: true
      })
    )
  ]
})
)}

function _9(md){return(
md`**Anomaly temperatures** are best to highlight a deviation from a reference. Vertical reading should be favored and bar mark excels at this. Again annotations help remind the context.`
)}

function _10(Plot,baseline_plot,annual_data,paris_targets_plot){return(
Plot.plot({
  title: "Global surface temperature anomaly, 1850-2022",
  subtitle: "From pre-industrial period",
  caption: "Source: Berkeley Earth Land/Ocean Temperature.",
  style: { background: "#fff7eb" },
  marginTop: 40,
  y: {
    grid: true,
    label: "temperature deviation (°C)\n    from 1850-1900 average",
    ticks: 5,
    tickFormat: (d) =>
      d.toLocaleString(undefined, { minimumFractionDigits: 1 }),
    tickSize: 4
  },
  marks: [
    // Baseline reference (1850 to 1900)
    baseline_plot(annual_data, "anomaly_1850_1900"),

    Plot.ruleX(annual_data, {
      x: "date",
      y: "anomaly_1850_1900",
      stroke: (d) => (d.anomaly_1850_1900 >= 0 ? "coral" : "cadetblue"),
      strokeWidth: 2
    }),
    Plot.ruleY([0]),

    // Target 1.5°C and 2°C
    paris_targets_plot(),

    Plot.dotY(annual_data, {
      x: "date",
      y: "anomaly_1850_1900",
      r: 2,
      fill: (d) => (d.anomaly_1850_1900 >= 0 ? "coral" : "cadetblue"),
      stroke: "white",
      strokeWidth: 1,
      tip: true
    })
  ]
})
)}

function _11(md){return(
md`---
When it comes to **monthly data**, seasonality of the data is highlighted with a monthly axis. On contrary years are simplified: group by period with a gradient of colors.

For **absolute temperature**, parts of the ideas above are reused:
+ Horizontal reading with line mark
+ Context with annotations`
)}

function _12(Plot,monthly_data,monthly_baseline_1850_1900){return(
Plot.plot({
  title: "Monthly global surface temperature, 1850-2023",
  caption: "Source: Berkeley Earth Land/Ocean Temperature.",
  style: { background: "#fff7eb" },
  height: 550,
  x: {
    tickFormat: (d) => Plot.formatMonth("en")(d - 1),
    ticks: 12,
    label: null
  },
  y: {
    grid: true,
    label: "↑ temperature (°C)",
    tickFormat: (d) =>
      d.toLocaleString(undefined, { minimumFractionDigits: 1 }),
    tickSize: 4
  },
  color: {
    legend: true,
    label: null,
    type: "threshold",
    domain: [1900, 1950, 2000, 2015],
    range: ["#ffe86e", "#ffc656", "#ffa33d", "#ff7a23", "#ff4400"]
  },
  marks: [
    Plot.lineY(monthly_data, {
      x: "month",
      y: "absolute",
      stroke: "year",
      strokeWidth: (d) => (d.year >= 2015 ? 2 : 0.7),
      curve: "natural",
      tip: true,
      sort: { channel: "-stroke" }
    }),
    // REFERENCE PERIOD
    Plot.lineY(monthly_baseline_1850_1900, {
      x: "month",
      y: "mean",
      curve: "natural",
      strokeWidth: 1.5,
      _strokeDasharray: 4
    }),
    Plot.text(monthly_baseline_1850_1900, {
      filter: (d) => d.month === 7,
      x: "month",
      y: "mean",
      dy: 33,
      text: (d) => "Pre-industrial reference period (1850-1900)",
      lineWidth: 10,
      stroke: "#fff7eb",
      strokeWidth: 5,
      fill: "black",
      fontWeight: "bold",
      textAnchor: "middle"
    }),
    // 1.5°C TARGET
    Plot.lineY(monthly_baseline_1850_1900, {
      x: "month",
      y: "target_15",
      curve: "natural",
      strokeWidth: 1,
      strokeDasharray: 4
    }),
    Plot.text(monthly_baseline_1850_1900, {
      filter: (d) => d.month === 7,
      x: "month",
      y: "target_15",
      text: (d) => "+1.5°C",
      stroke: "#fff7eb",
      strokeWidth: 8,
      fill: "black",
      textAnchor: "middle"
    }),
    // 2°C TARGET
    Plot.lineY(monthly_baseline_1850_1900, {
      x: "month",
      y: "target_20",
      curve: "natural",
      strokeWidth: 1,
      strokeDasharray: 4
    }),
    Plot.text(monthly_baseline_1850_1900, {
      filter: (d) => d.month === 7,
      x: "month",
      y: "target_20",
      text: (d) => "+2°C",
      stroke: "#fff7eb",
      strokeWidth: 8,
      fill: "black",
      textAnchor: "middle"
    })
  ]
})
)}

function _13(md){return(
md`For **anomaly temperature**, bar mark is drop in favor of a tick mark to allow superposition among years inside a month. Thanks to this choice, we can see that deviation from reference was higher during December to March than June to August. But that was before 2023...`
)}

function _14(Plot,monthly_data){return(
Plot.plot({
  title: "Monthly global surface temparature anomaly, 1850-2023",
  subtitle: "From pre-industrial period",
  caption: "Source: Berkeley Earth Land/Ocean Temperature.",
  style: { background: "#fff7eb" },
  height: 550,
  marginTop: 40,
  x: {
    tickFormat: (d) => Plot.formatMonth("en")(d - 1),
    ticks: 12,
    label: null
  },
  y: {
    grid: true,
    label: "temperature deviation (°C)\n    from 1850-1900 average",
    ticks: 5,
    tickFormat: (d) =>
      d.toLocaleString(undefined, { minimumFractionDigits: 1 }),
    tickSize: 4
  },
  color: {
    legend: true,
    label: null,
    type: "threshold",
    domain: [1900, 1950, 2000, 2015],
    range: ["#ffe86e", "#ffc656", "#ffa33d", "#ff7a23", "#ff4400"]
  },
  marks: [
    Plot.tickY(monthly_data, {
      x: "month",
      y: "anomaly_1850_1900",
      stroke: "year",
      strokeWidth: (d) => (d.year >= 2015 ? 2.5 : 1),
      curve: "natural",
      tip: true,
      sort: { channel: "-stroke" }
    }),
    Plot.dotY(monthly_data, {
      filter: (d) => d.year === 2023,
      x: "month",
      y: "anomaly_1850_1900",
      fill: "year",
      stroke: "#fff7eb"
    }),
    Plot.ruleY([0]),
    Plot.ruleY([1.5], { strokeWidth: 1, strokeDasharray: 4 }),
    Plot.ruleY([2], { strokeWidth: 1, strokeDasharray: 4 }),
    Plot.tip(
      [
        `Since June, 2023 (red dots) is breaking record each month with a large gap.`
      ],
      { x: 8, y: 1.7, dy: 0, anchor: "bottom-left", fill: "#fff7eb" }
    )
  ]
})
)}

function _15(md){return(
md`---
## Data cleaning
_Berkeley Earth_ is a great source, but their all-in-one text file (metadata + data) are a mess to play with...
+ extracting reference average (1951-1980)
+ parsing txt file (skip comment lines, slice lines and columns)
+ calcul absolute from anomaly and reference average (1951-1980)
+ calcul pre-industrial anomaly (1850-1900)`
)}

function _16(md){return(
md`### Annual average`
)}

function _annual_baseline_1951_1980(){return(
14.104
)}

function _annual_baseline_1850_1900(raw_annual_data,d3,round)
{
  const filter_data = raw_annual_data
    .filter((d) => d.year >= 1850 && d.year <= 1900)
    .map((d) => d.absolute);
  const mean = d3.mean(filter_data);
  return round(mean, 5);
}


async function _raw_annual_data(FileAttachment,parse_file,round,annual_baseline_1951_1980)
{
  const text = await FileAttachment("Land_and_Ocean_summary.txt").text();
  const columns = ["year", "anomaly"];

  return parse_file(text, 58, -1, columns).map(({ year, anomaly }) => ({
    year,
    date: new Date(`${year}-01-01`),
    absolute: round(annual_baseline_1951_1980 + anomaly, 5),
    anomaly_1951_1980: anomaly
  }));
}


function _annual_data(raw_annual_data,round,annual_baseline_1951_1980,annual_baseline_1850_1900){return(
raw_annual_data.map(({ year, ...d }) => ({
  ...d,
  anomaly_1850_1900: round(
    annual_baseline_1951_1980 + d.anomaly_1951_1980 - annual_baseline_1850_1900,
    4
  )
}))
)}

function _21(__query,annual_data,invalidation){return(
__query(annual_data,{from:{table:"annual_data"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"annual_data")
)}

function _22(md){return(
md`### Monthly average`
)}

function _monthly_baseline_1951_1980(){return(
"12.24 12.45 13.07 13.98 14.95 15.67 15.95 15.78 15.19 14.25 13.24 12.50"
  .split(" ")
  .map((d) => +d)
)}

function _monthly_baseline_1850_1900(aq,raw_monthly_data){return(
aq
  .from(raw_monthly_data)
  .filter((d) => d.year >= 1850 && d.year <= 1900)
  .groupby("month")
  .rollup({ mean: aq.op.mean("absolute") })
  .derive({ mean: (d) => aq.op.round_digits(d.mean, 4) })
  .derive({
    target_15: (d) => aq.op.round_digits(d.mean + 1.5, 4),
    target_20: (d) => aq.op.round_digits(d.mean + 2, 4)
  })
  .objects("mean_1850_1900")
)}

async function _raw_monthly_data(FileAttachment,parse_file,round,monthly_baseline_1951_1980)
{
  const text = await FileAttachment("Land_and_Ocean_complete.txt").text();
  const columns = ["year", "month", "anomaly"];

  return parse_file(text, 86, 2170, columns).map(({ anomaly, ...d }) => ({
    ...d,
    absolute: round(monthly_baseline_1951_1980[d.month - 1] + anomaly, 4),
    anomaly_1951_1980: anomaly
  }));
}


function _monthly_data(raw_monthly_data,round,monthly_baseline_1951_1980,monthly_baseline_1850_1900){return(
raw_monthly_data.map((d) => ({
  ...d,
  anomaly_1850_1900: round(
    monthly_baseline_1951_1980[d.month - 1] +
      d.anomaly_1951_1980 -
      monthly_baseline_1850_1900[d.month - 1].mean,
    4
  )
}))
)}

function _27(__query,monthly_data,invalidation){return(
__query(monthly_data,{from:{table:"monthly_data"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"monthly_data")
)}

function _28(md){return(
md`---
## Helpers`
)}

function _paris_targets(){return(
[
  { target: 1.5, text: "+1,5°C (from 1850-1900)" },
  { target: 2, text: "+2°C (from 1850-1900)" }
]
)}

function _paris_targets_plot(paris_targets,Plot){return(
function paris_targets_plot(
  data = paris_targets,
  { baseline = 0, ...options } = {}
) {
  return Plot.marks(
    Plot.ruleY(
      data.map((d) => baseline + d.target),
      { strokeDasharray: 3 }
    ),
    Plot.text(data, {
      x: (d) => new Date("1850-01-01"),
      y: (d) => baseline + d.target,
      text: "text",
      dx: 20,
      stroke: "#fff7eb",
      strokeWidth: 8,
      fill: "black",
      textAnchor: "start",
      ...options
    })
  );
}
)}

function _baseline_plot(d3,Plot){return(
function baseline_plot(data, variable, dy = -20) {
  const period = [new Date("1850-01-01"), new Date("1900-01-01")];
  // max value on the period
  const max = d3.max(
    data.filter((d) => d.date >= period[0] && d.date <= period[1]),
    (d) => d[variable]
  );

  return Plot.marks(
    Plot.lineY(period, {
      x: (d) => d,
      y: max,
      dy,
      strokeWidth: 1,
      markerStart: "arrow-reverse",
      markerEnd: "arrow"
    }),
    Plot.text(["Pre-industrial reference period (1850-1900)"], {
      x: (d) => new Date("1875-01-01"),
      y: max,
      dy: dy - 12,
      lineWidth: 15,
      fontWeight: "bold",
      textAnchor: "middle"
    })
  );
}
)}

function _parse_file(){return(
function parse_file(text, start, end = undefined, columns) {
  const data = text.split("\n").slice(start, end);

  return data.map((d) => {
    const values = d
      .split(" ")
      .filter((value) => value !== "")
      .slice(0, columns.length + 1);

    const row = {};
    columns.forEach((c, i) => (row[c] = +values[i]));

    return row;
  });
}
)}

function _round(){return(
function round(value, significant_digits) {
  if (value === 0) return 0;
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const nIntegers = exponent + 1;
  const precision = 10 ** -(nIntegers - significant_digits);
  return Math.round(value * precision) / precision;
}
)}

function _34(aq,round)
{
  aq.addFunction("round_digits", round, { override: true });
  return "Add round to arquero op functions as op.round_digits";
}


export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["Land_and_Ocean_complete.txt", {url: new URL("./files/26fbf2132be8d548c1592463bd48098dc97c691c554140d2416d5e0925aa89d4012c09614eba3f066f27a4b6d905027a8e25029b63aabdee10c811c9182a6062.txt", import.meta.url), mimeType: "text/plain", toString}],
    ["Land_and_Ocean_summary.txt", {url: new URL("./files/aaa6e1e6ed9c1284e62ac17451c4016cac51070b947fb1f03bf4b313a0f2d6d1cfcbf5dc36f75772d2502cf6f205efb530a238d19a32b2ad7ff8145712ae364f.txt", import.meta.url), mimeType: "text/plain", toString}],
    ["copernicus.png", {url: new URL("./files/19dd9a04786a2e557bb43cbe36c9b36978a0ecdc19a44d5e93a4cd111d3195b731a5488b5ee104e510bc2ac89e6652377ddc02971a2351b360d058d4e00b14fe.png", import.meta.url), mimeType: "image/png", toString}],
    ["nasa.png", {url: new URL("./files/6d49bd64bc7ccbeda2b409a218e96d18fa4cc3a0b32944fa760e973930251245124a55aca925b87beb5c5299886c7d37a0b9430128365dbecb4708691ea6088c.png", import.meta.url), mimeType: "image/png", toString}],
    ["met.png", {url: new URL("./files/0613e54f0214ed6803246aec9db3156acc0381b53b47bcc3935d69f325a78af1f017411120506c0418b87f2d3bc436cdcacd093d787c7ccdc3d76cdfec066808.png", import.meta.url), mimeType: "image/png", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["FileAttachment","htl"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer("viewof indicator")).define("viewof indicator", ["Inputs"], _indicator);
  main.variable(observer("indicator")).define("indicator", ["Generators", "viewof indicator"], (G, _) => G.input(_));
  main.variable(observer()).define(["Plot","indicator","annual_data"], _6);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer()).define(["Plot","baseline_plot","annual_data","paris_targets_plot","annual_baseline_1850_1900"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["Plot","baseline_plot","annual_data","paris_targets_plot"], _10);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer()).define(["Plot","monthly_data","monthly_baseline_1850_1900"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["Plot","monthly_data"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer("annual_baseline_1951_1980")).define("annual_baseline_1951_1980", _annual_baseline_1951_1980);
  main.variable(observer("annual_baseline_1850_1900")).define("annual_baseline_1850_1900", ["raw_annual_data","d3","round"], _annual_baseline_1850_1900);
  main.variable(observer("raw_annual_data")).define("raw_annual_data", ["FileAttachment","parse_file","round","annual_baseline_1951_1980"], _raw_annual_data);
  main.variable(observer("annual_data")).define("annual_data", ["raw_annual_data","round","annual_baseline_1951_1980","annual_baseline_1850_1900"], _annual_data);
  main.variable(observer()).define(["__query","annual_data","invalidation"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("monthly_baseline_1951_1980")).define("monthly_baseline_1951_1980", _monthly_baseline_1951_1980);
  main.variable(observer("monthly_baseline_1850_1900")).define("monthly_baseline_1850_1900", ["aq","raw_monthly_data"], _monthly_baseline_1850_1900);
  main.variable(observer("raw_monthly_data")).define("raw_monthly_data", ["FileAttachment","parse_file","round","monthly_baseline_1951_1980"], _raw_monthly_data);
  main.variable(observer("monthly_data")).define("monthly_data", ["raw_monthly_data","round","monthly_baseline_1951_1980","monthly_baseline_1850_1900"], _monthly_data);
  main.variable(observer()).define(["__query","monthly_data","invalidation"], _27);
  main.variable(observer()).define(["md"], _28);
  main.variable(observer("paris_targets")).define("paris_targets", _paris_targets);
  main.variable(observer("paris_targets_plot")).define("paris_targets_plot", ["paris_targets","Plot"], _paris_targets_plot);
  main.variable(observer("baseline_plot")).define("baseline_plot", ["d3","Plot"], _baseline_plot);
  main.variable(observer("parse_file")).define("parse_file", _parse_file);
  main.variable(observer("round")).define("round", _round);
  main.variable(observer()).define(["aq","round"], _34);
  return main;
}
