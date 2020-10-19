const spline = (data, title) => {
  const options = {
    animationEnabled: true,
    title: {
      text: title,
    },
    axisY: {
      title: title,
    },
    toolTip: {
      shared: true,
    },
    data,

    // : [
    //   {
    //     type: "spline",
    //     name: "2016",
    //     showInLegend: true,
    //     dataPoints: [
    //       { y: 155, label: "Jan" },
    //       { y: 150, label: "Feb" },
    //       { y: 152, label: "Mar" },
    //       { y: 148, label: "Apr" },
    //       { y: 142, label: "May" },
    //       { y: 150, label: "Jun" },
    //       { y: 146, label: "Jul" },
    //       { y: 149, label: "Aug" },
    //       { y: 153, label: "Sept" },
    //       { y: 158, label: "Oct" },
    //       { y: 154, label: "Nov" },
    //       { y: 150, label: "Dec" },
    //     ],
    //   },
    //   {
    //     type: "spline",
    //     name: "2017",
    //     showInLegend: true,
    //     dataPoints: [
    //       { y: 172, label: "Jan" },
    //       { y: 173, label: "Feb" },
    //       { y: 175, label: "Mar" },
    //       { y: 172, label: "Apr" },
    //       { y: 162, label: "May" },
    //       { y: 165, label: "Jun" },
    //       { y: 172, label: "Jul" },
    //       { y: 168, label: "Aug" },
    //       { y: 175, label: "Sept" },
    //       { y: 170, label: "Oct" },
    //       { y: 165, label: "Nov" },
    //       { y: 169, label: "Dec" },
    //     ],
    //   },
    // ],
  };

  return options;
};

const pie = (data, title) => {
  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: title,
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 14,
        indexLabel: "{label} - {y}",
        dataPoints: data,
      },
    ],
  };

  return options;
};

export { spline };
export { pie };
