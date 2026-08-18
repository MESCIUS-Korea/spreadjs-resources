function pieComponent(pieData){
  
   pieChart = new wijmo.chart.FlexPie("#flexPie", {
    header: "고객 나라 분포",
    bindingName: "territory",
    binding: "count",
    selectionMode: wijmo.chart.SelectionMode.Point,
    selectedItemPosition: wijmo.chart.Position.Top,
    selectedItemOffset: 0.2,
    isAnimated: true,
    legend:{
      position:"Bottom",
      scrollbar:true
    },
    dataLabel: {
      position: wijmo.chart.PieLabelPosition.Center,
      content: (ht) => {
        return `${ht.item.count}%`;
      },
    },
    tooltip: {
      content: (hti) => {
        let item = hti.item;
        return `<b>국가명: </b><img style="width:20px" src="../images/${item.territory.replace(/\s+/g, '')}.png" /> ${item.territory} </br> <b>고객 거주 비율:</b> ${item.count}%`;
      },
    },
    itemsSource: convertToPieData(pieData),
    palette: [
      "#FF8774",
      "#FFD07C",
      "#02B4BF",
      "#08D1A4",
      "#42A5E2",
      "#B898EA"
    ]
  });
}
// 파이데이터 수정
function convertToPieData(data){
  var countPie = [];
   data.forEach((item) => {
    let territory = item["territory"];
    var  territoryName = territory.split("(")[1].slice(0,-1)
    const existingIndex = countPie.findIndex(
      (obj) => obj.territory === territoryName
    );
    if (existingIndex !== -1) {
      countPie[existingIndex].count++;
    } else {
      countPie.push({ territory: territoryName, count: 1 });
    }
  });
  return countPie;
}