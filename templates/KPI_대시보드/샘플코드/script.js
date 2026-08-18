let dataAll; //원본 JSON 데이터를 위한 변수
$(document).ready(function () {
  // Spread 및 데이터 로드 완료 전까지 숨기기
  $("#ss").hide();

  //SpreadJS 초기화
  let spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));

  // 원본 JSON 데이터 불러오기 ---------------------
  $.ajax({
    // JSON 데이터 URL 또는 파일 경로
    url: "./data/KPI 대시보드_data.json",
    datatype: "json",
    success: function (data) {
      dataAll = data;
    },
    error: function (ex) {
      alert('Exception:' + ex);
    }
  });

  // 대시보드 SJS 템플릿 불러오기 ---------------------
  // 템플릿 URL 또는 파일 경로
  fetch('./data/KPI 대시보드.sjs')
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

      //데이터 소스 바인딩 설정
      let source = new GC.Spread.Sheets.Bindings.CellBindingSource(dataAll);
      let sheet = spread.getSheet(0);
      sheet.setDataSource(source);

      sheet.recalcAll(true);
      spread.refresh();
      // 대시보드 시트 설정
      let dashboardSheet = spread.getSheet(2);
      // 헤더 숨김
      dashboardSheet.options.colHeaderVisible = false;
      dashboardSheet.options.rowHeaderVisible = false;
      // 분기 선택 셀을 제외하고 잠금
      dashboardSheet.getCell(1,5).locked(false);
      dashboardSheet.options.isProtected = true;
      // 셀 선택기 숨김
      dashboardSheet.options.selectionBorderColor = 'rgba(0,0,0,0)';
      dashboardSheet.options.selectionBackColor = 'rgba(0,0,0,0)';
      //셀 선택기를 분기 선택 셀로 고정
      dashboardSheet.bind(GC.Spread.Sheets.Events.SelectionChanging, function (e, info) {
        if(info.newSelections[0].row != 1 || info.newSelections[0].col != 5) {
          info.sheet.setActiveCell(1,5);
        }
      });

      // 분기 선택 셀 hover 설정
      let style = new  GC.Spread.Sheets.Style();
      style.backColor = '#5784BB';
      style.foreColor = 'white';
      let range = new GC.Spread.Sheets.Range(1,5,1,1);
      dashboardSheet.cellStates.add(range, GC.Spread.Sheets.CellStatesType.hover, style);
      // 분기 선택 셀 붙여넣기 방지
      dashboardSheet.bind(GC.Spread.Sheets.Events.ClipboardPasting, function (sender, args) {
        args.cancel = true;
      });

      // 스크롤 바 및 탭 스트립 설정
      spread.options.showHorizontalScrollbar = false;
      spread.options.showVerticalScrollbar = false;
      spread.options.tabStripVisible = false;
      // 우클릭 금지
      spread.options.allowContextMenu = false;
      // Spread 및 데이터 로드 완료 후 보이기
      $("#ss").show();
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