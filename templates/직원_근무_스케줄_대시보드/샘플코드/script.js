let spread;
// SpreadJS 선언 및 양식 불러오기
window.onload = function () {
  $("#ss").hide();
  spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));

  fetch("./data/직원 근무 스케줄 대시보드.sjs")
    .then(res => res.blob())
    .then(blob => {
    spread.open(blob, function () {
      spread.suspendPaint();
      spread.suspendCalcService();	
      spread.suspendEvent();

      // 스크롤바 숨기기
      spread.options.showHorizontalScrollbar = false;
      spread.options.showVerticalScrollbar = false;
      // 시트 빈 공간 스크롤 없애기
      spread.options.scrollbarMaxAlign = true;
      // 시트 뒷 배경색을 흰색으로 설정
      spread.options.grayAreaBackColor = 'white';
      // 탭 선택기 좌측으로 이동
      spread.options.tabStripPosition = GC.Spread.Sheets.TabStripPosition.left;
      // 새 탭 추가 버튼 제거
      spread.options.newTabVisible = false;
      // 당월에 맞춰 활성 시트 변경
      let today = new Date();
      spread.setActiveSheet(today.getMonth()+1+"월");

      for(let i=0;i<spread.getSheetCount();i++) {
        // 시트 여백 설정
        spread.getSheet(i).options.sheetAreaOffset= {left : 2, top : 2};
        // 시트의 행/열 헤더 숨기기
        spread.getSheet(i).options.colHeaderVisible = false;
        spread.getSheet(i).options.rowHeaderVisible = false;
        for(let j=2;j<33;j++) {
          // 토요일, 일요일은 빨간색으로 표시
          if(spread.getSheet(i).getText(6, j) == "토" || spread.getSheet(i).getText(6, j) == "일") {
            spread.getSheet(i).getRange(7, j, spread.getSheet(i).getRowCount()-7, 1).backColor('red');
          }
        }
      }

      spread.resumePaint();
      spread.resumeEvent();
      spread.resumeCalcService();
      $("#ss").show();
    }, function (e) {
      console.log(e); // error callback
    }, {
      // openoptions - https://developer.mescius.com/spreadjs/api/modules/GC.Spread.Sheets#openoptions
      openMode: GC.Spread.Sheets.OpenMode.lazy 
    });
  });
}