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
