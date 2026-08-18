let spread;

window.onload = async function () {
  spread = new GC.Spread.Sheets.Workbook(document.getElementById("ss"));

  // 대시보드 템플릿
  const templateUrl = "https://assets.codepen.io/975719/Budget_Dashboard.sjs";
  // 바인딩할 데이터
  const budgetUrl = "https://assets.codepen.io/975719/Budget_Dashboard_Budget.json";
  const expensesUrl = "https://assets.codepen.io/975719/Budget_Dashboard_Expenses.json";

  try {
    // 템플릿과 JSON 데이터를 동시에 불러옵니다.
    const [templateResponse, budgetResponse, expensesResponse] =
          await Promise.all([
            fetch(templateUrl),
            fetch(budgetUrl),
            fetch(expensesUrl)
          ]);

    if (!templateResponse.ok) {
      throw new Error(
        `템플릿을 불러오지 못했습니다: ${templateResponse.status}`
      );
    }

    if (!budgetResponse.ok) {
      throw new Error(
        `예산 데이터를 불러오지 못했습니다: ${budgetResponse.status}`
      );
    }

    if (!expensesResponse.ok) {
      throw new Error(
        `지출 데이터를 불러오지 못했습니다: ${expensesResponse.status}`
      );
    }

    const [templateBlob, budgetData, expensesData] =
          await Promise.all([
            templateResponse.blob(),
            budgetResponse.json(),
            expensesResponse.json()
          ]);

    const bindingData = {
      Budget: budgetData.Budget,
      Expenses: expensesData.Expenses
    };

    // 템플릿 불러오기
    spread.open(templateBlob, function () {
      spread.suspendPaint();
      spread.suspendCalcService();
      spread.suspendEvent();

      try {
        const source = new GC.Spread.Sheets.Bindings.CellBindingSource(bindingData);

        // workbook 설정
        spread.options.grayAreaBackColor = 'white';
        spread.options.scrollbarMaxAlign = true;
        spread.options.tabStripVisible = false;
        // 시트 설정
        spread.getSheet(0).options.rowHeaderVisible = false;
        spread.getSheet(0).options.colHeaderVisible = false;
        spread.getSheet(1).options.rowHeaderVisible = false;
        spread.getSheet(1).options.colHeaderVisible = false;
        spread.getSheet(2).options.rowHeaderVisible = false;
        spread.getSheet(2).options.colHeaderVisible = false;
        // 지출 내역 시트 열 수식 추가
        spread.getSheet(2).tables.all()[0].setColumnDataFormula(11, 'YEAR(A2)');
        spread.getSheet(2).tables.all()[0].setColumnDataFormula(12, 'MONTH(A2)');
        spread.getSheet(2).tables.all()[0].setColumnDataFormula(13, '"Q"&ROUNDUP(M2/3,0)');

        // 각 시트의 바인딩 테이블 행 확장
        for (let i = 0; i < spread.getSheetCount(); i++) {
          const sheet = spread.getSheet(i);
          sheet.tables.all().forEach(function (table) {
            table.expandBoundRows(true);
          });
        }

        // 데이터 바인딩
        spread.getSheet(1).setDataSource(source);
        spread.getSheet(2).setDataSource(source);

        // 서식 유지
        extendTableFormat(spread.getSheet(1), spread.getSheet(1).tables.all()[0]);
        extendTableFormat(spread.getSheet(2), spread.getSheet(2).tables.all()[0]);

      } finally {
        spread.resumeEvent();
        spread.resumeCalcService();
        spread.resumePaint();

        // 바인딩 완료 후 전체 재계산
        for (let i = 0; i < spread.getSheetCount(); i++) {
          spread.getSheet(i).recalcAll();
        }

        spread.refresh();
      }
    },
                function (error) {
      console.error("SJS 파일 열기 실패:", error);
    },
                {
      openMode: GC.Spread.Sheets.OpenMode.lazy
    }
               );
  } catch (error) {
    console.error("데이터 또는 템플릿 로드 실패:", error);
  }

  // 버튼 클릭 이벤트
  document.querySelectorAll(".sheet-button").forEach(function (button) {
    button.addEventListener("click", function () {
      const sheetIndex = Number(this.dataset.sheetIndex);
      changeSheet(sheetIndex);
    });
  });

  // 행 추가 버튼 이벤트
  document.getElementById("addRowButton").addEventListener("click", function () {
    const sheetIndex = spread.getActiveSheetIndex();

    if (sheetIndex !== 1 && sheetIndex !== 2) {
      return;
    }

    const sheet = spread.getActiveSheet();
    const table = sheet.tables.all()[0];

    if (!table) {
      console.error("현재 시트에서 테이블을 찾을 수 없습니다.");
      return;
    }

    spread.suspendPaint();
    spread.suspendCalcService();
    spread.suspendEvent();

    try {
      const dataRange = table.dataRange();
      
      // 테이블 데이터 영역 마지막에 새 행 삽입
      sheet.addRows(sheet.getRowCount(), 1);      
      table.insertRows(dataRange.rowCount - 1, 1, true);
      
      // 추가된 행에 스타일 적용
      for (var c = 0; c < dataRange.colCount; c++) {
        var row0style = sheet.getStyle(dataRange.rowCount, dataRange.col + c);
        sheet.setStyle(dataRange.rowCount+1, dataRange.col + c, row0style);
      }

      // 새로 생성된 행의 첫 번째 셀
      const newRowIndex = dataRange.row + dataRange.rowCount;

      // 사용자가 바로 입력할 수 있도록 첫 번째 셀 선택
      sheet.setActiveCell(newRowIndex, dataRange.col);
      sheet.showCell(
        newRowIndex,
        dataRange.col,
        GC.Spread.Sheets.VerticalPosition.center,
        GC.Spread.Sheets.HorizontalPosition.left
      );

      // 바로 편집 모드 시작
      sheet.startEdit();
    } finally {
      spread.resumeEvent();
      spread.resumeCalcService();
      spread.resumePaint();
    }
  });
};

// 시트 변경
function changeSheet(sheetIndex) {
  spread.suspendPaint();
  spread.suspendCalcService();
  spread.suspendEvent();

  spread.setActiveSheetIndex(sheetIndex);

  document.querySelectorAll(".sheet-button").forEach(function (button) {
    const buttonSheetIndex = Number(button.dataset.sheetIndex);

    button.classList.toggle(
      "active",
      buttonSheetIndex === sheetIndex
    );
  });

  const addRowButton = document.getElementById("addRowButton");

  // 예산 데이터와 지출 데이터 시트에서만 표시
  addRowButton.style.display =
    sheetIndex === 1 || sheetIndex === 2
    ? "inline-flex"
  : "none";

  spread.resumeEvent();
  spread.resumeCalcService();
  spread.resumePaint();
}

// 기존 서식 유지
function extendTableFormat(sheet, table) {
  var ts = table.range();
  for (var r = 2; r < ts.rowCount; r++) {
    for (var c = 0; c < ts.colCount; c++) {
      var row0style = sheet.getStyle(ts.row + 1, ts.col + c);
      sheet.setStyle(ts.row + r, ts.col + c, row0style);
    }
  }
}