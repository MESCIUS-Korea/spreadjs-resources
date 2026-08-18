let spread;
// SpreadJS 선언 및 양식 불러오기
window.onload = function () {
  spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));

  spread.suspendPaint();
  spread.suspendCalcService();	
  spread.suspendEvent();
  fetch("https://assets.codepen.io/975719/%EC%84%B1%EA%B3%BC%EB%B6%84%EC%84%9D%EB%8C%80%EC%8B%9C%EB%B3%B4%EB%93%9C.sjs")
    .then(res => res.blob())
    .then(blob => {
    spread.open(blob, function () {
      let sheet = spread.getSheet(1);
      let source = new GC.Spread.Sheets.Bindings.CellBindingSource(productData);
      sheet.setDataSource(source);
      
      let sheet2 = spread.getSheet(0);
      // 헤더 숨김
      sheet2.options.colHeaderVisible = false;
      sheet2.options.rowHeaderVisible = false;
      // 셀 선택기 숨김
      sheet2.options.selectionBorderColor = 'rgba(0,0,0,0)';
      sheet2.options.selectionBackColor = 'rgba(0,0,0,0)';
      // 시트 보호
      sheet2.options.isProtected = true;
      // 스크롤 바 및 탭 스트립 설정
      spread.options.scrollbarMaxAlign = true;
      spread.options.showHorizontalScrollbar = false;
      spread.options.showVerticalScrollbar = false;
      spread.options.tabStripVisible = false;
      // 우클릭 금지
      spread.options.allowContextMenu = false;
      // 워크북 배경색 설정
      spread.options.grayAreaBackColor = 'white';
      
      spread.resumePaint();
      spread.resumeEvent();
      spread.resumeCalcService();
      sheet.recalcAll();
    }, function (e) {
      console.log(e); // error callback
    }, {
      // openoptions - https://developer.mescius.com/spreadjs/api/modules/GC.Spread.Sheets#openoptions
      openMode: GC.Spread.Sheets.OpenMode.lazy 
    });
  });
}

let productData = {
  "event_overview": [
    {
      "Date": "0801-0802",
      "Gross Billing": 1000000,
      "Net Billing": 100000,
      "구매건수": 100,
      "구매고객수": 90
    },
    {
      "Date": "0725-0726",
      "Gross Billing": 800000,
      "Net Billing": 80000,
      "구매건수": 80,
      "구매고객수": 70
    }
  ],
  "total_overview": [
    {
      "Date": "0801-0802",
      "Gross Billing": 10000000,
      "Net billing": 1000000,
      "구매건수": 1000,
      "구매고객수": 900
    },
    {
      "Date": "0725-0726",
      "Gross Billing": 9000000,
      "Net billing": 900000,
      "구매건수": 900,
      "구매고객수": 800
    }
  ],
  "event_detail(0801-0802)":[
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "기타",
      "Gross Billing": 500000,
      "Net Billing": 50000,
      "구매건수": 50,
      "구매고객수": 45
    },
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "메타사이트",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "모바일_앱푸시",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "배너",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "기타",
      "Gross Billing": 150000,
      "Net Billing": 15000,
      "구매건수": 15,
      "구매고객수": 13
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "메타사이트",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "배너",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "이메일구독",
      "Gross Billing": 100000,
      "Net Billing": 10000,
      "구매건수": 10,
      "구매고객수": 9
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "키워드",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "기타",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "메타사이트",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "배너",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "쇼핑",
      "Gross Billing": 250000,
      "Net Billing": 25000,
      "구매건수": 25,
      "구매고객수": 23
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "이메일구독",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "즐겨찾기",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "키워드",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "SNS",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    }
  ],
  "event_detail(0725-0726)": [
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "기타",
      "Gross Billing": 400000,
      "Net Billing": 40000,
      "구매건수": 40,
      "구매고객수": 36
    },
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "메타사이트",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "모바일_앱푸시",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "배너",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "기타",
      "Gross Billing": 100000,
      "Net Billing": 10000,
      "구매건수": 10,
      "구매고객수": 10
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "메타사이트",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "배너",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "이메일구독",
      "Gross Billing": 100000,
      "Net Billing": 10000,
      "구매건수": 10,
      "구매고객수": 10
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "키워드",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "기타",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "메타사이트",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "배너",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "쇼핑",
      "Gross Billing": 200000,
      "Net Billing": 20000,
      "구매건수": 20,
      "구매고객수": 14
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "이메일구독",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "즐겨찾기",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "키워드",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "SNS",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    }
  ],
  "total_detail(0801-0802)": [
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "기타",
      "Gross Billing": 8000000,
      "Net Billing": 800000,
      "구매건수": 800,
      "구매고객수": 720
    },
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "메타사이트",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "모바일_앱푸시",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "배너",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "기타",
      "Gross Billing": 1000000,
      "Net Billing": 100000,
      "구매건수": 100,
      "구매고객수": 100
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "메타사이트",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "배너",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "이메일구독",
      "Gross Billing": 500000,
      "Net Billing": 50000,
      "구매건수": 50,
      "구매고객수": 40
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "키워드",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "기타",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "메타사이트",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "배너",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "쇼핑",
      "Gross Billing": 500000,
      "Net Billing": 50000,
      "구매건수": 50,
      "구매고객수": 40
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "이메일구독",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "즐겨찾기",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "키워드",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "SNS",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    }
  ],
  "total_detail(0725-0726)": [
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "기타",
      "Gross Billing": 7000000,
      "Net Billing": 700000,
      "구매건수": 700,
      "구매고객수": 600
    },
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "메타사이트",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "모바일_앱푸시",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile App",
      "유입경로(대)": "배너",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "기타",
      "Gross Billing": 1000000,
      "Net Billing": 100000,
      "구매건수": 100,
      "구매고객수": 100
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "메타사이트",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "배너",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "이메일구독",
      "Gross Billing": 500000,
      "Net Billing": 50000,
      "구매건수": 50,
      "구매고객수": 50
    },
    {
      "플랫폼(중)": "Mobile Web",
      "유입경로(대)": "키워드",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "기타",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "메타사이트",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "배너",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "쇼핑",
      "Gross Billing": 500000,
      "Net Billing": 50000,
      "구매건수": 50,
      "구매고객수": 50
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "이메일구독",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "즐겨찾기",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "키워드",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    },
    {
      "플랫폼(중)": "PC Web",
      "유입경로(대)": "SNS",
      "Gross Billing": null,
      "Net Billing": null,
      "구매건수": null,
      "구매고객수": null
    }
  ],
  "salesbydate": [
    {
      "Date": "7/18/2024",
      "A": 1000000,
      "B": 200000,
      "C": 3000000
    },
    {
      "Date": "7/19/2024",
      "A": 2000000,
      "B": 400000,
      "C": 6000000
    },
    {
      "Date": "7/20/2024",
      "A": 2400000,
      "B": 480000,
      "C": 7200000
    },
    {
      "Date": "7/21/2024",
      "A": 2160000,
      "B": 432000,
      "C": 6480000
    },
    {
      "Date": "7/22/2024",
      "A": 1000000,
      "B": 200000,
      "C": 3000000
    },
    {
      "Date": "7/23/2024",
      "A": 2000000,
      "B": 400000,
      "C": 6000000
    },
    {
      "Date": "7/24/2024",
      "A": 2400000,
      "B": 480000,
      "C": 7200000
    },
    {
      "Date": "7/25/2024",
      "A": 2160000,
      "B": 432000,
      "C": 6480000
    },
    {
      "Date": "7/26/2024",
      "A": 1000000,
      "B": 200000,
      "C": 3000000
    },
    {
      "Date": "7/27/2024",
      "A": 2000000,
      "B": 400000,
      "C": 6000000
    },
    {
      "Date": "7/28/2024",
      "A": 2400000,
      "B": 480000,
      "C": 7200000
    },
    {
      "Date": "7/29/2024",
      "A": 2160000,
      "B": 432000,
      "C": 6480000
    },
    {
      "Date": "7/30/2024",
      "A": 1000000,
      "B": 200000,
      "C": 3000000
    },
    {
      "Date": "7/31/2024",
      "A": 2000000,
      "B": 400000,
      "C": 6000000
    },
    {
      "Date": "8/1/2024",
      "A": 2400000,
      "B": 480000,
      "C": 7200000
    },
    {
      "Date": "8/2/2024",
      "A": 2160000,
      "B": 432000,
      "C": 6480000
    }
  ],
  "pv": [
    {
      "1DEPTH": "A",
      "PLATFORM": "PC",
      "7/1": 1,
      "7/2": 26,
      "7/3": 27,
      "7/4": 15,
      "7/5": 16,
      "7/6": 17,
      "7/7": 24,
      "7/8": 19,
      "7/9": 16,
      "7/10": 10,
      "7/11": 11,
      "7/12": 12,
      "7/13": 13,
      "7/14": 14,
      "7/15": 24,
      "7/16": 15,
      "7/17": 16,
      "7/18": 18,
      "7/19": 19,
      "7/20": 20,
      "7/21": 21,
      "7/22": 22,
      "7/23": 23,
      "7/24": 24,
      "7/25": 25,
      "7/26": 26,
      "7/27": 27,
      "7/28": 20,
      "7/29": 29,
      "7/30": 30,
      "7/31": 17,
      "8/1": 7,
      "8/2": 33,
      "8/3": 34,
      "8/4": 26,
      "8/5": 27,
      "8/6": 7,
      "8/7": 38,
      "8/8": 39,
      "8/9": 19,
      "8/10": 19,
      "8/11": 20
    },
    {
      "1DEPTH": "A",
      "PLATFORM": "Mobile",
      "7/1": 1,
      "7/2": 23,
      "7/3": 24,
      "7/4": 15,
      "7/5": 16,
      "7/6": 17,
      "7/7": 25,
      "7/8": 26,
      "7/9": 19,
      "7/10": 10,
      "7/11": 11,
      "7/12": 12,
      "7/13": 13,
      "7/14": 14,
      "7/15": 19,
      "7/16": 18,
      "7/17": 19,
      "7/18": 18,
      "7/19": 19,
      "7/20": 20,
      "7/21": 21,
      "7/22": 22,
      "7/23": 23,
      "7/24": 24,
      "7/25": 25,
      "7/26": 23,
      "7/27": 24,
      "7/28": 20,
      "7/29": 29,
      "7/30": 30,
      "7/31": 17,
      "8/1": 7,
      "8/2": 33,
      "8/3": 34,
      "8/4": 23,
      "8/5": 24,
      "8/6": 7,
      "8/7": 38,
      "8/8": 39,
      "8/9": 19,
      "8/10": 19,
      "8/11": 20
    },
    {
      "1DEPTH": "B",
      "PLATFORM": "PC",
      "7/1": 4,
      "7/2": 24,
      "7/3": 25,
      "7/4": 18,
      "7/5": 19,
      "7/6": 20,
      "7/7": 14,
      "7/8": 23,
      "7/9": 26,
      "7/10": 13,
      "7/11": 14,
      "7/12": 15,
      "7/13": 16,
      "7/14": 19,
      "7/15": 26,
      "7/16": 15,
      "7/17": 26,
      "7/18": 21,
      "7/19": 22,
      "7/20": 23,
      "7/21": 24,
      "7/22": 25,
      "7/23": 26,
      "7/24": 27,
      "7/25": 28,
      "7/26": 24,
      "7/27": 25,
      "7/28": 23,
      "7/29": 32,
      "7/30": 33,
      "7/31": 20,
      "8/1": 10,
      "8/2": 36,
      "8/3": 37,
      "8/4": 24,
      "8/5": 25,
      "8/6": 10,
      "8/7": 41,
      "8/8": 42,
      "8/9": 22,
      "8/10": 22,
      "8/11": 23
    },
    {
      "1DEPTH": "B",
      "PLATFORM": "Mobile",
      "7/1": 1,
      "7/2": 2,
      "7/3": 14,
      "7/4": 15,
      "7/5": 26,
      "7/6": 27,
      "7/7": 7,
      "7/8": 8,
      "7/9": 9,
      "7/10": 19,
      "7/11": 24,
      "7/12": 15,
      "7/13": 16,
      "7/14": 26,
      "7/15": 23,
      "7/16": 16,
      "7/17": 17,
      "7/18": 18,
      "7/19": 19,
      "7/20": 20,
      "7/21": 21,
      "7/22": 22,
      "7/23": 23,
      "7/24": 24,
      "7/25": 25,
      "7/26": 26,
      "7/27": 19,
      "7/28": 20,
      "7/29": 29,
      "7/30": 30,
      "7/31": 26,
      "8/1": 27,
      "8/2": 33,
      "8/3": 34,
      "8/4": 35,
      "8/5": 17,
      "8/6": 7,
      "8/7": 38,
      "8/8": 26,
      "8/9": 27,
      "8/10": 19,
      "8/11": 20
    },
    {
      "1DEPTH": "C",
      "PLATFORM": "PC",
      "7/1": 2,
      "7/2": 3,
      "7/3": 15,
      "7/4": 16,
      "7/5": 23,
      "7/6": 24,
      "7/7": 8,
      "7/8": 9,
      "7/9": 10,
      "7/10": 26,
      "7/11": 25,
      "7/12": 18,
      "7/13": 19,
      "7/14": 23,
      "7/15": 16,
      "7/16": 17,
      "7/17": 18,
      "7/18": 19,
      "7/19": 20,
      "7/20": 21,
      "7/21": 22,
      "7/22": 23,
      "7/23": 24,
      "7/24": 25,
      "7/25": 26,
      "7/26": 27,
      "7/27": 20,
      "7/28": 21,
      "7/29": 30,
      "7/30": 31,
      "7/31": 23,
      "8/1": 24,
      "8/2": 34,
      "8/3": 35,
      "8/4": 36,
      "8/5": 18,
      "8/6": 8,
      "8/7": 39,
      "8/8": 23,
      "8/9": 24,
      "8/10": 20,
      "8/11": 21
    },
    {
      "1DEPTH": "C",
      "PLATFORM": "Mobile",
      "7/1": 1,
      "7/2": 2,
      "7/3": 14,
      "7/4": 15,
      "7/5": 24,
      "7/6": 25,
      "7/7": 7,
      "7/8": 8,
      "7/9": 9,
      "7/10": 23,
      "7/11": 14,
      "7/12": 15,
      "7/13": 26,
      "7/14": 14,
      "7/15": 15,
      "7/16": 16,
      "7/17": 17,
      "7/18": 18,
      "7/19": 19,
      "7/20": 20,
      "7/21": 21,
      "7/22": 22,
      "7/23": 23,
      "7/24": 24,
      "7/25": 25,
      "7/26": 26,
      "7/27": 19,
      "7/28": 20,
      "7/29": 29,
      "7/30": 30,
      "7/31": 24,
      "8/1": 25,
      "8/2": 33,
      "8/3": 34,
      "8/4": 35,
      "8/5": 17,
      "8/6": 7,
      "8/7": 38,
      "8/8": 24,
      "8/9": 25,
      "8/10": 19,
      "8/11": 20
    }
  ]
}