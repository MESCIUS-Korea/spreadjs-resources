let spread, dataAll;

window.onload = function () {
  spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));

  fetch("./data/SEO 대시보드_data.json")
    .then(res => res.json())
    .then(json => {
      dataAll = json;
    });

  fetch("./data/SEO대시보드.sjs")
    .then(res => res.blob())
    .then(blob => {
      spread.suspendPaint();
      spread.suspendCalcService();
      spread.suspendEvent();
      spread.open(blob, function () {
        let sheet = spread.getSheet(0);
        let sheet1 = spread.getSheet(1);

        let source = new GC.Spread.Sheets.Bindings.CellBindingSource(dataAll);
        sheet.setDataSource(source);
        sheet1.setDataSource(source);

        let sheet3 = spread.getSheet(3);
        // 헤더 숨김
        sheet3.options.colHeaderVisible = false;
        sheet3.options.rowHeaderVisible = false;
        // 셀 선택기 숨김
        sheet3.options.selectionBorderColor = 'rgba(0,0,0,0)';
        sheet3.options.selectionBackColor = 'rgba(0,0,0,0)';
        // 연도/월 선택 셀을 제외하고 잠금
        sheet3.getCell(1,10).locked(false);
        sheet3.getCell(1,12).locked(false);
        sheet3.options.isProtected = true;
        // 연도/월 선택 셀 붙여넣기 방지
        sheet3.bind(GC.Spread.Sheets.Events.ClipboardPasting, function (sender, args) {
          args.cancel = true;
        });
        // 연도/월 선택 셀 hover 설정
        let style = new  GC.Spread.Sheets.Style();
        style.backColor = '#5784BB';
        style.foreColor = 'white';
        let range = new GC.Spread.Sheets.Range(1,10,1,1);
        sheet3.cellStates.add(range, GC.Spread.Sheets.CellStatesType.hover, style);
        let range2 = new GC.Spread.Sheets.Range(1,12,1,1);
        sheet3.cellStates.add(range2, GC.Spread.Sheets.CellStatesType.hover, style);
        // 스크롤 바 및 탭 스트립 설정
        spread.options.scrollbarMaxAlign = true;
        spread.options.showHorizontalScrollbar = false;
        spread.options.showVerticalScrollbar = false;
        spread.options.tabStripVisible = false;
        // 우클릭 금지
        spread.options.allowContextMenu = false;
        // 워크북 배경색 설정
        spread.options.grayAreaBackColor = '#FEFEFE';

        spread.resumePaint();
        spread.resumeEvent();
        spread.resumeCalcService();
      }, function (e) {
        console.log(e); // error callback
      }, {
        // openoptions - https://developer.mescius.com/spreadjs/api/modules/GC.Spread.Sheets#openoptions
        openMode: GC.Spread.Sheets.OpenMode.lazy
      });
    });
}