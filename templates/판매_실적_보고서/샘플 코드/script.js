let spread;
// SpreadJS 선언 및 양식 불러오기
window.onload = function () {
  spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));
  spread.suspendPaint();
  spread.suspendCalcService();
  spread.suspendEvent();
  fetch("https://assets.codepen.io/975719/salesPerformanceReport.sjs")
    .then(res => res.blob())
    .then(blob => {
    spread.open(blob, function () {
      let sheet = spread.getSheet(0);
      let source = new GC.Spread.Sheets.Bindings.CellBindingSource(hong);
      sheet.setDataSource(source);
      // 헤더 숨김
      sheet.options.colHeaderVisible = false;
      sheet.options.rowHeaderVisible = false;
      // 시트 여백 설정
      sheet.options.sheetAreaOffset = {left : 5, top : 0};
      // 셀 선택기 숨김
      sheet.options.selectionBorderColor = 'rgba(0,0,0,0)';
      sheet.options.selectionBackColor = 'rgba(0,0,0,0)';
      // 시트 보호
      sheet.options.isProtected = true;
      // 셀 복사 방지
      sheet.bind(GC.Spread.Sheets.Events.ClipboardChanging, function (sender, args) {
        args.cancel = true;
      });
      sheet.charts.all().forEach(function (chart) {
        chart.isLocked(true);
      })
      sheet.shapes.all().forEach(function (shape) {
        shape.isLocked(true);
      })
      // 스크롤 바 및 탭 스트립 설정
      spread.options.scrollbarMaxAlign = true;
      spread.options.showHorizontalScrollbar = false;
      spread.options.showVerticalScrollbar = false;
      spread.options.tabStripVisible = false;
      // 우클릭 금지
      spread.options.allowContextMenu = false;
      // 워크북 배경색 설정
      spread.options.grayAreaBackColor = '#FEFEFE';
      // 인쇄 설정
      let printInfo = new GC.Spread.Sheets.Print.PrintInfo();
      printInfo.fitPagesTall(1);
      printInfo.fitPagesWide(1);
      printInfo.columnStart(0);
      printInfo.columnEnd(11);
      printInfo.rowStart(0);
      printInfo.rowEnd(32);
      printInfo.paperSize(new GC.Spread.Sheets.Print.PaperSize(GC.Spread.Sheets.Print.PaperKind.a4));
      printInfo.centering(GC.Spread.Sheets.Print.PrintCentering.both);
      printInfo.margin({top:0, bottom:0, left:0, right:0, header:0, footer:0});
      spread.getSheet(0).printInfo(printInfo);
    }, function (e) {
      console.log(e); // error callback
    }, {
      // openoptions - https://developer.mescius.com/spreadjs/api/modules/GC.Spread.Sheets#openoptions
      openMode: GC.Spread.Sheets.OpenMode.lazy
    });

    spread.resumePaint();
    spread.resumeEvent();
    spread.resumeCalcService();
  });

  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // 스타일 변경
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 데이터 교체
      const tab = button.dataset.tab;
      let sheet = spread.getSheet(0);
      if(tab == "hong") {
        let source = new GC.Spread.Sheets.Bindings.CellBindingSource(hong);
        sheet.setDataSource(source);
      }
      else if(tab == "kim") {
        let source = new GC.Spread.Sheets.Bindings.CellBindingSource(kim);
        sheet.setDataSource(source);
      }
      else if(tab == "oh") {
        let source = new GC.Spread.Sheets.Bindings.CellBindingSource(oh);
        sheet.setDataSource(source);
      }
      else if(tab == "goh") {
        let source = new GC.Spread.Sheets.Bindings.CellBindingSource(goh);
        sheet.setDataSource(source);
      }
    });
  });
}

function spreadPrint() {
  spread.print(0);
}

function spreadPDF() {
  let base64String, base64String1;
  fetch("https://assets.codepen.io/975719/malgun.ttf")
    .then(function(response) {
    return response.arrayBuffer();
  })
    .then(function(arrayBuffer) {
    base64String = _arrayBufferToBase64(arrayBuffer);
  })

  fetch("https://assets.codepen.io/975719/malgunbd.ttf")
    .then(function(response) {
    return response.arrayBuffer();
  })
    .then(function(arrayBuffer) {
    base64String1 = _arrayBufferToBase64(arrayBuffer);
    var fonts = {
      normal: base64String,
      bold: base64String1
    };
    GC.Spread.Sheets.PDF.PDFFontsManager.registerFont('맑은 고딕', fonts);
    GC.Spread.Sheets.PDF.PDFFontsManager.fallbackFont = function (font) {
      return fonts.normal;
    }
  })
    .then(function() {
    spread.savePDF(
      function (blob) {
        let today = new Date();
        // saveAs(blob, "salesReport_홍길동_"+ today.getFullYear() + (today.getMonth() + 1).toString().padStart(2, '0') + today.getDate() +".pdf");
        const url = URL.createObjectURL(blob);
        window.open(url);
      },
      console.log,
      {
        title: 'salesReport',
        author: 'MESCIUS',
        subject: 'salesReport',
        keywords: 'salesReport',
        creator: 'MESCIUS'
      });
  });
}

function _arrayBufferToBase64(buffer) {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

let hong = {
  "year": "2024년",
  "created_date": "12월 31일",
  "position": "영업 대표",
  "reporter": "홍길동",
  "sales_status": [
    {"itemName": "Item 1", "Q1": 15, "Q2": 15, "Q3": 12, "Q4": 10},
    {"itemName": "Item 2", "Q1": 5, "Q2": 10, "Q3": 11, "Q4": 9},
    {"itemName": "Item 3", "Q1": 18, "Q2": 15, "Q3": 15, "Q4": 13},
    {"itemName": "Item 4", "Q1": 6, "Q2": 8, "Q3": 9, "Q4": 10},
    {"itemName": "Item 5", "Q1": 20, "Q2": 25, "Q3": 26, "Q4": 43}
  ],
  "sales_volume": [
    {"companyName": "Company A", "salesDetails": "Item 5 - 40건, Item 3 - 15건", "note": "정기거래처"},
    {"companyName": "Company B", "salesDetails": "Item 1 - 20건, Item 2 - 10건", "note": "신규계약 체결"},
    {"companyName": "Company C", "salesDetails": "Item 5 - 30건, Item 4 - 15건", "note": "대량주문"},
    {"companyName": "Company D", "salesDetails": "Item 3 - 25건, Item 2 - 10건", "note": "판촉행사"},
    {"companyName": "Company E", "salesDetails": "Item 5 - 44건, Item 1 - 22건, Item 4 - 18건", "note": "우수거래처"}
  ]
}

let kim = {
  "year": "2024년",
  "created_date": "12월 31일",
  "position": "영업 대표",
  "reporter": "김지수",
  "sales_status": [
    {"itemName": "Item A", "Q1": 10, "Q2": 12, "Q3": 13, "Q4": 10},   // 45
    {"itemName": "Item B", "Q1": 6, "Q2": 7, "Q3": 6, "Q4": 6},       // 25
    {"itemName": "Item C", "Q1": 15, "Q2": 14, "Q3": 16, "Q4": 15},   // 60
    {"itemName": "Item D", "Q1": 7, "Q2": 7, "Q3": 6, "Q4": 5},       // 25
    {"itemName": "Item E", "Q1": 17, "Q2": 18, "Q3": 16, "Q4": 14}    // 65
  ],
  "sales_volume": [
    {"companyName": "Company Nero", "salesDetails": "Item A - 20건, Item B - 10건, Item D - 5건", "note": "주요 고객사"},
    {"companyName": "Company Lumen", "salesDetails": "Item C - 25건, Item E - 20건", "note": "신규계약"},
    {"companyName": "Company Axis", "salesDetails": "Item A - 15건, Item D - 10건, Item E - 25건", "note": "정기납품"},
    {"companyName": "Company Nova", "salesDetails": "Item B - 15건, Item C - 20건", "note": "기획프로모션"},
    {"companyName": "Company Solis", "salesDetails": "Item A - 10건, Item C - 15건, Item D - 10건, Item E - 20건", "note": "우수파트너"}
  ]
}

let oh = {
  "year": "2024년",
  "created_date": "12월 31일",
  "position": "영업 대표",
  "reporter": "오영수",
  "sales_status": [
    {"itemName": "Item A", "Q1": 13, "Q2": 12, "Q3": 13, "Q4": 12},
    {"itemName": "Item B", "Q1": 9, "Q2": 8, "Q3": 8, "Q4": 10},
    {"itemName": "Item C", "Q1": 14, "Q2": 15, "Q3": 16, "Q4": 15},
    {"itemName": "Item D", "Q1": 8, "Q2": 7, "Q3": 7, "Q4": 8},
    {"itemName": "Item E", "Q1": 18, "Q2": 17, "Q3": 15, "Q4": 17}
  ],
  "sales_volume": [
    {"companyName": "Company Core", "salesDetails": "Item A - 20건, Item B - 10건, Item D - 5건", "note": "전략거래처"},
    {"companyName": "Company Loop", "salesDetails": "Item C - 20건, Item E - 20건", "note": "신규계약"},
    {"companyName": "Company Apex", "salesDetails": "Item A - 15건, Item D - 10건, Item E - 25건", "note": "정기공급처"},
    {"companyName": "Company Hive", "salesDetails": "Item B - 15건, Item C - 25건", "note": "판촉 캠페인"},
    {"companyName": "Company Flux", "salesDetails": "Item A - 15건, Item C - 15건, Item D - 10건, Item E - 22건", "note": "우수파트너"}
  ]
}

let goh = {
  "year": "2024년",
  "created_date": "12월 31일",
  "position": "영업 대표",
  "reporter": "고시영",
  "sales_status": [
    {"itemName": "Item A", "Q1": 12, "Q2": 11, "Q3": 13, "Q4": 14},
    {"itemName": "Item B", "Q1": 7, "Q2": 8, "Q3": 7, "Q4": 8},
    {"itemName": "Item C", "Q1": 15, "Q2": 16, "Q3": 14, "Q4": 15},
    {"itemName": "Item D", "Q1": 8, "Q2": 7, "Q3": 8, "Q4": 7},
    {"itemName": "Item E", "Q1": 16, "Q2": 15, "Q3": 17, "Q4": 17}
  ],
  "sales_volume": [
    {"companyName": "Company Alpha", "salesDetails": "Item A - 25건, Item B - 10건, Item D - 5건", "note": "정기거래처"},
    {"companyName": "Company Beta", "salesDetails": "Item C - 20건, Item E - 15건", "note": "대량납품"},
    {"companyName": "Company Gamma", "salesDetails": "Item A - 15건, Item D - 10건, Item E - 20건", "note": "신규계약"},
    {"companyName": "Company Delta", "salesDetails": "Item B - 10건, Item C - 25건", "note": "판촉행사"},
    {"companyName": "Company Epsilon", "salesDetails": "Item A - 10건, Item C - 15건, Item E - 30건, Item D - 5건", "note": "우수거래처"}
  ]
}