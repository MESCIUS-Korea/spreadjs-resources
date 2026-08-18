let HRData = {
  "기획팀": [
    { "이름": "김민준", "직책": "팀장", "이메일": "mj.kim@mescius.com" },
    { "이름": "이서연", "직책": "대리", "이메일": "sy.lee@mescius.com" },
    { "이름": "박지훈", "직책": "사원", "이메일": "jh.park@mescius.com" },
    { "이름": "최유진", "직책": "사원", "이메일": "yj.choi@mescius.com" }
  ],
  "인사팀": [
    { "이름": "정하늘", "직책": "팀장", "이메일": "hn.jung@mescius.com" },
    { "이름": "강도형", "직책": "대리", "이메일": "dh.kang@mescius.com" },
    { "이름": "윤지아", "직책": "사원", "이메일": "ja.yoon@mescius.com" },
    { "이름": "조서후", "직책": "사원", "이메일": "sh.cho@mescius.com" }
  ],
  "총무팀": [
    { "이름": "임예린", "직책": "팀장", "이메일": "yr.lim@mescius.com" },
    { "이름": "한준서", "직책": "주임", "이메일": "js.han@mescius.com" },
    { "이름": "서지우", "직책": "사원", "이메일": "jw.seo@mescius.com" },
    { "이름": "신태현", "직책": "사원", "이메일": "th.shin@mescius.com" }
  ],
  "마케팅팀": [
    { "이름": "오하린", "직책": "팀장", "이메일": "hr.oh@mescius.com" },
    { "이름": "유건우", "직책": "대리", "이메일": "gw.yoo@mescius.com" },
    { "이름": "배수아", "직책": "사원", "이메일": "sa.bae@mescius.com" },
    { "이름": "장민서", "직책": "사원", "이메일": "ms.jang@mescius.com" }
  ],
  "영업팀": [
    { "이름": "노지후", "직책": "팀장", "이메일": "jh.noh@mescius.com" },
    { "이름": "문소윤", "직책": "대리", "이메일": "sy.moon@mescius.com" },
    { "이름": "황시우", "직책": "사원", "이메일": "sw.hwang@mescius.com" },
    { "이름": "홍아린", "직책": "사원", "이메일": "ar.hong@mescius.com" }
  ]
}

let spread;
// SpreadJS 선언 및 양식 불러오기
window.onload = function () {
  spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));
  fetch("./data/Organigram.sjs")
    .then(res => res.blob())
    .then(blob => {
    spread.open(blob, function () {
      spread.suspendPaint();
      spread.suspendCalcService();	
      spread.suspendEvent();	

      // 직원 리스트 시트에 팀 별 데이터 바인딩
      let sheet1 = spread.getSheet(1);
      let source = new GC.Spread.Sheets.Bindings.CellBindingSource(HRData);
      sheet1.setDataSource(source);
      // 헤더 숨김
      sheet1.options.colHeaderVisible = false;
      sheet1.options.rowHeaderVisible = false;
      // 셀 선택기 숨김
      sheet1.options.selectionBorderColor = 'rgba(0,0,0,0)';
      sheet1.options.selectionBackColor = 'rgba(0,0,0,0)';
      // 시트 보호
      sheet1.options.isProtected = true;
      // 셀 복사 방지
      sheet1.bind(GC.Spread.Sheets.Events.ClipboardChanging, function (sender, args) {
        args.cancel = true;
      });

      let sheet = spread.getSheet(0);
      // 시트 배율 변경
      sheet.zoom(0.8);
      // 헤더 숨김
      sheet.options.colHeaderVisible = false;
      sheet.options.rowHeaderVisible = false;
      // 셀 선택기 숨김
      sheet.options.selectionBorderColor = 'rgba(0,0,0,0)';
      sheet.options.selectionBackColor = 'rgba(0,0,0,0)';
      // 시트 보호
      sheet.options.isProtected = true;
      // 셀 복사 방지
      sheet.bind(GC.Spread.Sheets.Events.ClipboardChanging, function (sender, args) {
        args.cancel = true;
      });

      // 활성 시트 변경 시 시트 너비 변경
      spread.bind(GC.Spread.Sheets.Events.SheetTabClick, function (e, info) {
        let width = 0, height = 0;
        for(let i = 0;i<info.sheet.getColumnCount();i++) {
          width += Math.ceil(info.sheet.getColumnWidth(i)*info.sheet.zoom());
        }
        for(let j = 0;j<info.sheet.getRowCount();j++) {
          height += Math.ceil(info.sheet.getRowHeight(j)*info.sheet.zoom());
        }

        // 열 너비
        document.getElementById("ss").style.width = width+"px";
        // 행 높이 + 탭 스트립 높이
        document.getElementById("ss").style.height = (height + 28)+"px";
      });
      
      // 사용자가 시트 배율 설정(ctrl+wheel) 금지
      spread.options.allowUserZoom = false;
      // 스크롤 바 및 탭 스트립 설정
      spread.options.scrollbarMaxAlign = true;
      spread.options.showHorizontalScrollbar = false;
      spread.options.showVerticalScrollbar = false;
      spread.options.newTabVisible = false;
      spread.options.tabEditable = false;
      spread.options.tabNavigationVisible = false;
      // 우클릭 금지
      spread.options.allowContextMenu = false;

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