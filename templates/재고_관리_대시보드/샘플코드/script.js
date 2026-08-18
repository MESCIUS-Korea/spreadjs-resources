let spread, dataAll;
// SpreadJS 선언 및 양식 불러오기
window.onload = function () {
  spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));

  fetch("./data/재고관리대시보드_data.json")
    .then(res => res.json())
    .then(json => {
      dataAll = json;
    });

  fetch("./data/재고관리대시보드.sjs")
    .then(res => res.blob())
    .then(blob => {
      spread.open(blob, function () {
        spread.suspendPaint();
        spread.suspendCalcService();
        spread.suspendEvent();

        let sheet = spread.getSheet(0);
        let table = sheet.tables.all()[0];
        table.expandBoundRows(true);
        table.setColumnDataFormula(6, "=SUMIF(Input[제품 ID],[@ID],Input[입고된 수량])-SUMIF(Output[제품 ID],[@ID],Output[판매된 수량])");
        table.setColumnDataFormula(7, "=Products[@단가]*[@[현재 수량]]");
        table.setColumnDataFormula(8, "=IF([@[현재 수량]]<[@[최적 수량]],[@[최적 수량]]-[@[현재 수량]],0)");
        table.setColumnDataFormula(9, '=IF([@[현재 수량]]>=[@[최적 수량]],"재고 양호",IF([@[현재 수량]]<[@[최소 수량]],"재주문 필요","최적 수량 미달"))');
        table.setColumnDataFormula(10, "=[@[현재 수량]]/[@[최적 수량]]");

        let sheet1 = spread.getSheet(1);
        let table1 = sheet1.tables.all()[0];
        table1.expandBoundRows(true);
        table1.setColumnDataFormula(7, "=F2*G2");

        let sheet2 = spread.getSheet(2);
        let table2 = sheet2.tables.all()[0];
        table2.expandBoundRows(true);
        table2.setColumnDataFormula(7, "=F2*G2");

        let sheet3 = spread.getSheet(3);
        // 텍스트로 입력된 날짜 데이터를 엑셀 함수를 이용하여 변경
        sheet3.setFormula(32, 0, '=SUMIF(Output[제품],Calc!$A$27,Output[판매된 수량])/(MAX(DATEVALUE(Output[날짜]))-MIN(DATEVALUE(Output[날짜])))');

        let source = new GC.Spread.Sheets.Bindings.CellBindingSource(dataAll);
        sheet.setDataSource(source);
        sheet1.setDataSource(source);
        sheet2.setDataSource(source);

        // 첫 행의 스타일을 추가된 행에 적용
        extendTableFormat(sheet, table);
        extendTableFormat(sheet1, table1);
        extendTableFormat(sheet2, table2);

        let dashboardsheet = spread.getSheet(4);
        // 헤더 숨김
        dashboardsheet.options.colHeaderVisible = false;
        dashboardsheet.options.rowHeaderVisible = false;
        // 셀 선택기 숨김
        dashboardsheet.options.selectionBorderColor = 'rgba(0,0,0,0)';
        dashboardsheet.options.selectionBackColor = 'rgba(0,0,0,0)';
        // 월/제품 선택 셀을 제외하고 잠금
        dashboardsheet.getCell(4, 4).locked(false);
        dashboardsheet.getCell(9, 4).locked(false);
        dashboardsheet.options.isProtected = true;
        // 월/제품 선택 셀 붙여넣기 방지
        dashboardsheet.bind(GC.Spread.Sheets.Events.ClipboardPasting, function (sender, args) {
          args.cancel = true;
        });
        // 월/제품 선택 셀 hover 설정
        let style = new GC.Spread.Sheets.Style();
        style.backColor = '#5784BB';
        style.foreColor = 'white';
        let range = new GC.Spread.Sheets.Range(4, 4, 1, 1);
        dashboardsheet.cellStates.add(range, GC.Spread.Sheets.CellStatesType.hover, style);
        let range2 = new GC.Spread.Sheets.Range(9, 4, 1, 1);
        dashboardsheet.cellStates.add(range2, GC.Spread.Sheets.CellStatesType.hover, style);

        dashboardsheet.recalcAll();

        // 스크롤 바 및 탭 스트립 설정
        spread.options.scrollbarMaxAlign = true;
        spread.options.showHorizontalScrollbar = false;
        spread.options.showVerticalScrollbar = false;
        spread.options.tabStripVisible = false;
        // 우클릭 금지
        spread.options.allowContextMenu = false;
        spread.options.scrollIgnoreHidden = true; 
        // 워크북 배경색 설정
        spread.options.grayAreaBackColor = "#F2F2F2";

        spread.resumePaint();
        spread.resumeEvent();
        spread.resumeCalcService();

        spread.refresh();
      }, function (e) {
        console.log(e); // error callback
      }, {
        // openoptions - https://developer.mescius.com/spreadjs/api/modules/GC.Spread.Sheets#openoptions
        // openMode: GC.Spread.Sheets.OpenMode.lazy 
      });
    });
}

let extendTableFormat = (sheet, table) => {
  let ts = table.range();
  for (let r = 1; r < ts.rowCount; r++) {
    for (let c = 0; c < ts.colCount; c++) {
      let row0style = sheet.getStyle(ts.row + 1, ts.col + c);
      sheet.setStyle(ts.row + r, ts.col + c, row0style);
    }
  }
}