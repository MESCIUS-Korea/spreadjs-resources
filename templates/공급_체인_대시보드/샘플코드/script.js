let dataAll;
$(document).ready(function () {
  let spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));

  $.ajax({
    // 데이터 가져오기
    url: "data/공급 체인 대시보드_data.json",
    datatype: "json",
    success: function (data) {
      dataAll = data;
    },
    error: function (ex) {
      alert('Exception:' + ex);
    }
  });


  fetch('data/공급 체인 대시보드.sjs')
    .then(res => res.blob())
    .then(blob => {
    spread.suspendPaint();
    spread.suspendCalcService();	
    spread.suspendEvent();	
    spread.import(blob, function () {
      let table = spread.getSheet(0).tables.all();
      for(let i=0;i<table.length;i++) {
        // 바인딩 행 추가 시 시트 전체 행을 추가
        table[i].expandBoundRows(true);
      }
      //데이터 소스 설정
      let source = new GC.Spread.Sheets.Bindings.CellBindingSource(dataAll);
      let sheet = spread.getSheet(0);
      sheet.setDataSource(source);
      // 수식 입력
      table[0].setColumnDataFormula(7,"=[@[배송 완료]]-[@[주문 날짜]]-[@[주문 처리 시간]]");
      table[0].setColumnDataFormula(8,'=IF([@[배송 정확도]]<-1,"빠름",IF([@[배송 정확도]]>2,"늦음","정시"))');
      sheet.recalcAll(true);
      // 대시보드 시트 설정
      let dashboardSheet = spread.getSheet(2);
      // 헤더 숨김
      dashboardSheet.options.colHeaderVisible = false;
      dashboardSheet.options.rowHeaderVisible = false;
      // 여백 설정
      dashboardSheet.options.sheetAreaOffset= {left : 2, top : 2};
      // 월 선택 셀을 제외하고 잠금
      dashboardSheet.getCell(3,2).locked(false);
      dashboardSheet.options.isProtected = true;
      // 셀 선택기 숨김
      dashboardSheet.options.selectionBorderColor = 'rgba(0,0,0,0)';
      dashboardSheet.options.selectionBackColor = 'rgba(0,0,0,0)';

      // 월 선택 셀 hover 설정
      let style = new  GC.Spread.Sheets.Style();
      style.backColor = '#5784BB';
      style.foreColor = 'white';
      let range = new GC.Spread.Sheets.Range(3,2,1,1);
      dashboardSheet.cellStates.add(range, GC.Spread.Sheets.CellStatesType.hover, style);
      // 월 선택 셀 붙여넣기 방지
      dashboardSheet.bind(GC.Spread.Sheets.Events.ClipboardPasting, function (sender, args) {
        args.cancel = true;
      });

      // 스크롤 바 및 탭 스트립 설정
      spread.options.scrollbarMaxAlign = true;
      spread.options.newTabVisible = false;
      spread.options.tabStripPosition = GC.Spread.Sheets.TabStripPosition.left;
      spread.options.tabStripWidth = 110;
      // 우클릭 금지
      spread.options.allowContextMenu = false;
    }, function (e) {
      console.log(e); // error callback
    }, {
      fileType: GC.Spread.Sheets.FileType.sjs
    });

    spread.resumeEvent();
    spread.resumeCalcService();
    spread.resumePaint();
  });
});