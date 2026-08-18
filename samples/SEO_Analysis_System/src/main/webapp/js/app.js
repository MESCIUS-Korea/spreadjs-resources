let spread, spread1, spread2;
window.onload = async function () {
    let homeItem = document.getElementById("dashboard");
    await loadPage('dashboard.html', homeItem);
}

async function loadPage(file, clickedItem) {
    await fetch(file, { cache: "no-store" })
        .then(response => {
            if (!response.ok) throw new Error("불러오기 실패");
            return response.text();
        })
        .then(html => {
            document.getElementById("main-content").innerHTML = html;
            const items = document.querySelectorAll('li');
            items.forEach(item => item.classList.remove('active'));
            clickedItem.classList.add('active');
            if(clickedItem.id === 'dashboard') {
            }
            else if(clickedItem.id === 'settings') {
                
            }
			spreadInit();
        })
        .catch(error => {
            document.getElementById("main-content").innerHTML = `<p style="color:red;">오류: ${error.message}</p>`;
        });
}

function spreadInit() {
    spread = new GC.Spread.Sheets.Workbook(document.getElementById("dashboard_spread"));
    spread1 = new GC.Spread.Sheets.Workbook();
    spread2 = new GC.Spread.Sheets.Workbook();

    spread.suspendPaint();
    spread.suspendCalcService();
    spread.suspendEvent();

    fetch("xlsx/SEO대시보드.xlsx", { cache: "no-store" })
        .then(res => res.blob())
        .then(blob => {
            spread.import(blob, function () {
                let sheet = spread.getActiveSheet();
                sheet.zoom(1.05);
                // 헤더 숨김
                sheet.options.colHeaderVisible = false;
                sheet.options.rowHeaderVisible = false;
                // 셀 선택기 숨김
                sheet.options.selectionBorderColor = 'rgba(0,0,0,0)';
                sheet.options.selectionBackColor = 'rgba(0,0,0,0)';
                // 연도/월 선택 셀을 제외하고 잠금
                sheet.getCell(1, 12).locked(false);
                sheet.getCell(1, 14).locked(false);
                sheet.options.isProtected = true;
                // 연도/월 선택 셀 붙여넣기 방지
                sheet.bind(GC.Spread.Sheets.Events.ClipboardPasting, function (sender, args) {
                    args.cancel = true;
                });
                // 연도/월 선택 셀 hover 설정
                let style = new GC.Spread.Sheets.Style();
                style.backColor = '#5784BB';
                style.foreColor = 'white';
                let range = new GC.Spread.Sheets.Range(1, 12, 1, 1);
                sheet.cellStates.add(range, GC.Spread.Sheets.CellStatesType.hover, style);
                let range2 = new GC.Spread.Sheets.Range(1, 14, 1, 1);
                sheet.cellStates.add(range2, GC.Spread.Sheets.CellStatesType.hover, style);
                // 스크롤 바 및 탭 스트립 설정
                spread.options.scrollbarMaxAlign = true;
                spread.options.showHorizontalScrollbar = false;
                spread.options.showVerticalScrollbar = false;
                spread.options.tabStripVisible = false;
                // 우클릭 금지
                spread.options.allowContextMenu = false;
                // 워크북 배경색 설정
                spread.options.grayAreaBackColor = '#F2F2F2';

				loadData("SEO_data.xlsx", spread1);
				loadData("industry_data.xlsx", spread2);
				spread.calculate(GC.Spread.Sheets.CalculationType.rebuild);
				
                spread.resumePaint();
                spread.resumeEvent();
                spread.resumeCalcService();

            }, function (e) {
                console.log(e); // error callback
            }, {
				fileType: GC.Spread.Sheets.FileType.excel,
				fullRecalc: true
			});
    });    
}

// 참조 파일 불러와 업데이트
function loadData(filename, workbook) {
	workbook.destroy();
	workbook = new GC.Spread.Sheets.Workbook();
	fetch("xlsx/" + filename, { cache: "no-store" })
	    .then(res => res.blob())
	    .then(blob => {
	        workbook.import(blob, function () {
	            spread.updateExternalReference(filename, workbook.toJSON(), null, true);
	        }, function (e) {
	            console.log(e); // error callback
	        });
	    });
}

// 디자이너를 새 창으로 열기, 파일 이름 넘기기
async function openDesigner(filename) {	
	const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'designer.jsp';
    form.target = '_blank'; // 새 탭
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'filename';
    input.value = filename;
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

// 데이터 새로고침
async function dataRefresh() {
	loadData("SEO_data.xlsx", spread1);
	loadData("industry_data.xlsx", spread2);
	spread = GC.Spread.Sheets.findControl('dashboard_spread');
	spread.calculate(GC.Spread.Sheets.CalculationType.rebuild);
	spread.refresh();
	alert("데이터 새로고침 완료");
}
