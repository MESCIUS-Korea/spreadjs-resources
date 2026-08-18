var designer, spread;
function loadSpreadJS(cardData,customerData,chartData) {
  GC.Spread.Sheets.LicenseKey = "000696529.codepen.website,E395151416919275#B1wl5STJmdTFTaiJVYRd4Q6IlR4dTetR6SntmeyhTa4E5LmlWcFd5aH3kdhJjTMJzKxE4RC5ETYdUZspWW6dUaPV4UO36KVFzN9MDShVVdSZWQX94TMNzLlJ7ZKlWSvhmMRFmcUdFVKVGWzVTSvknSY5meJxkdWh6TycXZ5gXYiZ7UipWa6d4d7ZGUiVGcoRVbxcGNs3iYOVzRuBFMHhEaoNXVI9kc5tCdEFVRDhUbGhXY436ZxYla4g4QLFEWhRUVrJUUXlWVRl4bDdlUuNDNGV4NkJTdDx6SoZHcQVENjNjWyp7LUtma5kle6UWMrsCNW3SYIBHSGFleEVjVQpHWp3CMFlGODZ7QBV5KwRURiojITJCLiQzNwEkQElzNiojIIJCLyADN6czM9kTM0IicfJye#4Xfd5nIVF4SRJiOiMkIsIyNx8idgMlSgQWYlJHcTJiOi8kI1tlOiQmcQJCLiEjMwMzNwAyNyYDM4IDMyIiOiQncDJCLiUGdpNnYldnLuVGclR6bj9SOyUjN9YDMwAjI0IyctRkIsICpKyOtWyOnLyOlpuuI0ISYONkIsUWdyRnOiwmdFJCLiUzNykTM9YTM4ETNxUTOzIiOiQWSiwSfdJCdlVGaTRncvBXZSJCLiUGbiFGV43mdpBlIsICdlVGaTRHduF6RislOicGbmJCLlNHbhZmOiI7ckJye0ICbuFkI1pjIEJCLi4TPnpGWZlnMsJXUNVneLhHO4hVaINkcrFWVpZmR5lVd9BXdGdGOxZ6bLFTa7RTTu94Yy5mRiRjW8N4SyV4Txg7czM4NvNmS2FtL";
  GC.Spread.Sheets.Designer.LicenseKey = "000696529.codepen.website,E683832149312586#B1nT3lne6o5UapWN0NmbvZDT5JjVpJjdHl6UyJ4ct3WRx9Ea5EDbyh5MvQHdqpEVX3GdLVmWiN6MIJVYrRUa6tkVD5meiNGbO9ke9ZkVzVXUFVlTQFkdyRVOs3kYWhWemF7UlZmcFZDO9tCaJJ7YShkTzRUZW9kQKl6YSRza68mclJnM5hkZWJ4aM9ENvMEZwkncRF4cONFUFtUdmZHRNNUOTJ7LHRGOuFWZNlmNBN6cql5dUlGNvYmcvh5Uv9GR8EzNBR7RyFXRroGcsRGUx8kZ8wUeZxEcYR6VXRGa8hmW52WcSpWMtx4ZoFHTalWbpR7Z5dmRP96UGlXZzNERERjd8wUWKllYMF5YUF7R6xWSMpkaJpFZiojITJCLiUTQ5M4QyEjMiojIIJCL6IDM6MDO7ATO0IicfJye=#Qf35VfiM5VyQjI0IyQiwiI7EjL6BibvRGZB5icl96ZpNXZE5yUKRWYlJHcTJiOi8kI1tlOiQmcQJCLiIDMxMzNwAyNyYDM4IDMyIiOiQncDJCLiUGdpNnYldnLuVGclR6bj9SOyUjN9YDMwAjI0IyctRkIsICpKyOtWyOnLyOlpuuI0ISYONkIsUWdyRnOiwmdFJCLiYDO5ITMzkDNxIzM8MDO6IiOiQWSiwSfdJCdlVGaTRncvBXZSJCLiUGbiFGV43mdpBlIsICdlVGaTRHduF6RislOicGbmJCLlNHbhZmOiI7ckJye0ICbuFkI1pjIEJCLi4TP7l5QTVEOzFHRuVHMi3yLDRUehhnNrV6SahEZ73kN7xEOaVlTF3CaDFVSwpGbyNnQkxEbq5UOHxmerR6Vq9za51";

  var config = GC.Spread.Sheets.Designer.DefaultConfig;
  // 작업 섹션
  config.ribbon[0].buttonGroups.splice(0, 0, {
    "label": "작업",
    "thumbnailClass": "work",
    "commandGroup": {
      "children": [
        {
          "direction": "vertical",
          "commands": [
            "addRowToLast"
          ]
        },
        {
          "direction": "vertical",
          "commands": [
            "updateToGrid"
          ]
        }
      ]
    }
  });
  config.commandMap = {
    addRowToLast: {
      title: "addRowToLast",
      text: "행 추가",
      iconClass: "add-row-button",
      bigButton: "true",
      commandName: "addRowToLast",
      execute: function (context, propertyName, fontItalicChecked) {
        console.log(spread.getActiveSheet().getDataSource());
        if(spread.getActiveSheet().getDataSource() !== null) {
          spread.getActiveSheet().addRows(spread.getActiveSheet().getRowCount(), 1);
        }
      }
    },
    updateToGrid: {
      title: "updateToGrid",
      text: "업데이트",
      iconClass: "update-to-grid-button",
      bigButton: "true",
      commandName: "updateToGrid",
      execute: function (context, propertyName, fontItalicChecked) {
        var gridData = spread.getSheetFromName("카드 데이터").getDataSource();
        var salesData = spread.getSheetFromName("차트 데이터").getDataSource();
        var pieData = spread.getSheetFromName("고객 데이터").getDataSource();

        var gaugeData = new Object();
        gaugeData.ColonialVoice = spread.getSheetFromName("현황판").getValue(6,1);
        gaugeData.Distinguish = spread.getSheetFromName("현황판").getValue(6,5);
        gaugeData.SuperiorCard = spread.getSheetFromName("현황판").getValue(6,9);
        gaugeData.Vista = spread.getSheetFromName("현황판").getValue(6,13);
        console.log(gridData)
        //카드 데이터, 게이지 데이터 업데이트
        changeData(gridData,gaugeData);
        //차트 데이터 업데이트
        changeChartData(salesData);
        // 고객 데이터 업데이트
        changePieData(pieData);
      }
    }
  }

  designer = new GC.Spread.Sheets.Designer.Designer(document.getElementById("gc-designer-container"), config);
  spread = designer.getWorkbook();
  spread.setSheetCount(5);
  spread.options.newTabVisible = false;
  designer.refresh();
  spread.refresh(); //탭 패널 클릭 이벤트에 선언 필요

  let cardSheet = spread.getSheet(0);
  cardSheet.name("카드 데이터");
  cardSheet.setDataSource(cardData);
  var colInfos = [
    { name: "creditCardId", displayName: "ID", size: '*' },
    { name: "cardType", displayName: "카드 유형", size: '2*' },
    { name: "cardNumber", displayName: "카드 넘버", size: '2*', formatter: "@" },
    { name: "expiryMonth", displayName: "만료월", size: '2*' },
    { name: "expiryYear", displayName: "만료년", size: '2*' },
    { name: "modifiedDate", displayName: "수정 날짜", size: '2*' }
  ];
  cardSheet.bindColumns(colInfos);
  // 카드 유형 콤보 박스 설정
  var combo = new GC.Spread.Sheets.CellTypes.ComboBox();
  cardSheet.setCellType(-1, 1, combo, GC.Spread.Sheets.SheetArea.viewport);
  combo.items([
    { text: 'ColonialVoice', value: 'ColonialVoice' },
    { text: 'Distinguish', value: 'Distinguish' },
    { text: 'SuperiorCard', value: 'SuperiorCard' },
    { text: 'Vista', value: 'Vista' }
  ]);
  // 조건부 서식
  var style = new GC.Spread.Sheets.Style();
  style.backColor = 'red';
  var cell = new GC.Spread.Sheets.ConditionalFormatting.NormalConditionRule();
  cell.ruleType(GC.Spread.Sheets.ConditionalFormatting.RuleType.cellValueRule);
  cell.operator(GC.Spread.Sheets.ConditionalFormatting.ComparisonOperators.equalsTo);
  cell.ranges([new GC.Spread.Sheets.Range(-1, 4, -1, 1)]);
  cell.value1(2005);
  cell.style(style);
  cardSheet.conditionalFormats.addRule(cell);
  // 날짜/시간 선택 도구 설정
  var datetime = new GC.Spread.Sheets.Style();
  datetime.cellButtons = [
    {
      imageType: GC.Spread.Sheets.ButtonImageType.dropdown,
      command: "openDateTimePicker",
      useButtonStyle: true,
    }
  ];
  datetime.dropDowns = [
    {
      type: GC.Spread.Sheets.DropDownType.dateTimePicker,
      option: {
        showTime: true,
      }
    }
  ];
  cardSheet.setStyle(-1, 5, datetime);
  cardSheet.setFormatter(-1, 5, "yyyy-mm-dd hh:MM:ss");
  
  for(let i=0;i<cardSheet.getRowCount();i++) {
    let date = new Date(Date.parse(cardSheet.getValue(i,5)));
    cardSheet.setValue(i,5,date);
  }

  let customerSheet = spread.getSheet(1);
  customerSheet.name("고객 데이터");
  customerSheet.setDataSource(customerData);
  var colInfos2 = [
    { name: "customerId", displayName: "고객 ID", size: '*' },
    { name: "personId", displayName: "개인 ID", size: '*'  },
    { name: "storeId", displayName: "가게 ID", size: '*'  },
    { name: "territory", displayName: "지역", size: '2*'  },
    { name: "accountNumber", displayName: "계정 넘버", size: '2*'  },
    { name: "modifiedDate", displayName: "수정 날짜", size: '2*'  }
  ];
  customerSheet.bindColumns(colInfos2);

  let chartSheet = spread.getSheet(2);
  chartSheet.name("차트 데이터");
  // console.log("차트데이터",chartData)
  chartSheet.setDataSource(chartData);
  var colInfos3 = [
    { name: "year", size: '*' },
    { name: "newSales", size: '*'  },
    { name: "usedSales", size: '*'  },
    { name: "totalSalesNew", size: '*'  },
    { name: "totalSalesUsed", size: '*'  },
  //   { name: "promotionKey", size: '*'  },
  //   { name: "currency", size: '*'  },
  //   { name: "unitCost", size: '2*'  },
  //   { name: "unitPrice", size: '2*'  },
  //   { name: "salesQuantity", size: '*'  },
  //   { name: "returnQuantity", size: '*'  },
  //   { name: "returnAmount", size: '*'  },
  //   { name: "discountQuantity", size: '*'  },
  //   { name: "discountAmount", size: '2*'  },
  //   { name: "totalCost", size: '2*'  },
  //   { name: "salesAmount", size: '2*'  },
  //   { name: "etlloadId", size: '*'  },
  //   { name: "loadDate", size: '2*'  },
  //   { name: "updateDate", size: '2*'  }
  ];
  chartSheet.bindColumns(colInfos3);

  let dashboard = spread.getSheet(3);
  dashboard.name("현황판");
  dashboard.options.rowHeaderVisible = false;
  dashboard.options.colHeaderVisible = false;
  dashboard.options.gridline.showHorizontalGridline = false;
  dashboard.options.gridline.showVerticalGridline = false;

  dashboard.setColumnWidth(4,20);
  dashboard.setColumnWidth(8,20);
  dashboard.setColumnWidth(12,20);

  dashboard.addSpan(1,1,3,15);
  dashboard.setValue(1,1,"신용카드 점유율");
  dashboard.getRange("B2:P4")
    .vAlign(GC.Spread.Sheets.VerticalAlign.center)
    .hAlign(GC.Spread.Sheets.HorizontalAlign.center)
    .font("bold 22px 맑은 고딕")
    .setBorder(new GC.Spread.Sheets.LineBorder("gray", GC.Spread.Sheets.LineStyle.thin), { all: true });

  dashboard.addSpan(5,1,1,3);
  dashboard.addSpan(5,5,1,3);
  dashboard.addSpan(5,9,1,3);
  dashboard.addSpan(5,13,1,3);
  dashboard.setValue(5,1,"ColonialVoice");
  dashboard.setValue(5,5,"Distinguish");
  dashboard.setValue(5,9,"SuperiorCard");
  dashboard.setValue(5,13,"Vista");  

  dashboard.setRowHeight(5,40);

  dashboard.addSpan(6,1,1,3);
  dashboard.addSpan(6,5,1,3);
  dashboard.addSpan(6,9,1,3);
  dashboard.addSpan(6,13,1,3);

  dashboard.setRowHeight(6,40);

  dashboard.getRange("B6:P7")
    .vAlign(GC.Spread.Sheets.VerticalAlign.center)
    .hAlign(GC.Spread.Sheets.HorizontalAlign.center)
    .font("bold 17px Arial");
  dashboard.getRange("B6:D11").setBorder(new GC.Spread.Sheets.LineBorder("gray", GC.Spread.Sheets.LineStyle.thin), { all: true });
  dashboard.getRange("F6:H11").setBorder(new GC.Spread.Sheets.LineBorder("gray", GC.Spread.Sheets.LineStyle.thin), { all: true });
  dashboard.getRange("J6:L11").setBorder(new GC.Spread.Sheets.LineBorder("gray", GC.Spread.Sheets.LineStyle.thin), { all: true });
  dashboard.getRange("N6:P11").setBorder(new GC.Spread.Sheets.LineBorder("gray", GC.Spread.Sheets.LineStyle.thin), { all: true });

  dashboard.setFormula(6,1,'=COUNTIF(\'카드 데이터\'!B:B,B6)');
  dashboard.setFormula(6,5,'=COUNTIF(\'카드 데이터\'!B:B,F6)');
  dashboard.setFormula(6,9,'=COUNTIF(\'카드 데이터\'!B:B,J6)');
  dashboard.setFormula(6,13,'=COUNTIF(\'카드 데이터\'!B:B,N6)');

  dashboard.addSpan(7,1,4,3);
  dashboard.addSpan(7,5,4,3);
  dashboard.addSpan(7,9,4,3);
  dashboard.addSpan(7,13,4,3);
  dashboard.setFormula(7,1,'=GAUGEKPISPARKLINE(B7,B7,0,100,FALSE,,,,,,-90,90,0,0,{0,100,"#5B9BD5"})');
  dashboard.setFormula(7,5,'=GAUGEKPISPARKLINE(F7,F7,0,100,FALSE,,,,,,-90,90,0,0,{0,100,"#ED7D31"})');
  dashboard.setFormula(7,9,'=GAUGEKPISPARKLINE(J7,J7,0,100,FALSE,,,,,,-90,90,0,0,{0,100,"#A5A5A5"})');
  dashboard.setFormula(7,13,'=GAUGEKPISPARKLINE(N7,N7,0,100,FALSE,,,,,,-90,90,0,0,{0,100,"#FFC000"})');

  let chart1 = dashboard.charts.add('pie', GC.Spread.Sheets.Charts.ChartType.pie, 0, 0, 0, 0, 'B6:B7,F6:F7,J6:J7,N6:N7');
  chart1.startRow(12);
  chart1.startColumn(1);
  chart1.endRow(26);
  chart1.endColumn(16);
  chart1.endRowOffset(0);
  chart1.endColumnOffset(0);
  let title = chart1.title();
  title.text = "";
  chart1.title(title);
  let legend = chart1.legend();
  legend.fontSize = "20.00";
  legend.position = GC.Spread.Sheets.Charts.LegendPosition.right;
  chart1.legend(legend);

  dashboard.options.isProtected = true;
  
  // 차트 시트
  let expiryYearSheet = spread.getSheet(4);
  expiryYearSheet.name("만료 카드 관리");

  expiryYearSheet.options.rowHeaderVisible = false;
  expiryYearSheet.options.colHeaderVisible = false;
  expiryYearSheet.options.gridline.showHorizontalGridline = false;
  expiryYearSheet.options.gridline.showVerticalGridline = false;

  expiryYearSheet.setColumnWidth(1,150);
  expiryYearSheet.setColumnWidth(2,150);
  expiryYearSheet.setColumnWidth(3,150);
  expiryYearSheet.setColumnWidth(4,150);
  expiryYearSheet.setColumnWidth(5,150);

  expiryYearSheet.setValue(26,2,2005);
  expiryYearSheet.setValue(26,3,2006);
  expiryYearSheet.setValue(26,4,2007);
  expiryYearSheet.setValue(26,5,2008);
  expiryYearSheet.setValue(27,1,"만료년");

  expiryYearSheet.setFormula(27,2,"=COUNTIF(\'카드 데이터\'!E:E,C27)");
  expiryYearSheet.setFormula(27,3,"=COUNTIF(\'카드 데이터\'!E:E,D27)");
  expiryYearSheet.setFormula(27,4,"=COUNTIF(\'카드 데이터\'!E:E,E27)");
  expiryYearSheet.setFormula(27,5,"=COUNTIF(\'카드 데이터\'!E:E,F27)");

  expiryYearSheet.getRange("B27:F28")
    .vAlign(GC.Spread.Sheets.VerticalAlign.center)
    .hAlign(GC.Spread.Sheets.HorizontalAlign.center)
    .font("bold 17px Arial")
    .setBorder(new GC.Spread.Sheets.LineBorder("gray", GC.Spread.Sheets.LineStyle.thin), { all: true });

  var chart2 = expiryYearSheet.charts.add('columnClustered', GC.Spread.Sheets.Charts.ChartType.columnClustered, 2, 2, 1100, 400, 'B27:F28');
  chart2.startRow(1);
  chart2.startColumn(1);
  chart2.startRowOffset(0);
  chart2.startColumnOffset(0);
  chart2.endRow(25);
  chart2.endColumn(6);
  chart2.endRowOffset(0);
  chart2.endColumnOffset(0);

  spread.setActiveSheetIndex(0);
}