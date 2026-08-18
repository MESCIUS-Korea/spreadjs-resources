window.onload = function () {
    // 생성일 셋팅
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset);
    document.getElementById('created-date').value = today.toISOString().slice(0, 10);

    // 거래처 리스트 스프레드
    let customerListSpread = new GC.Spread.Sheets.Workbook('customerListSpread');
    // 거래처 리스트 스프레드 설정
    customerListSpread.options.tabStripVisible = false;
    customerListSpread.options.scrollbarMaxAlign = true;
    customerListSpread.options.showHorizontalScrollbar = false;
    // 행 단위 선택
    customerListSpread.getSheet(0).selectionUnit(GC.Spread.Sheets.SelectionUnit.row);
    customerListSpread.getSheet(0).selectionPolicy(GC.Spread.Sheets.SelectionPolicy.range);
    customerListSpread.getSheet(0).setSelection(0, -1, 1, -1);
    // 클릭 시 거래처 input에 회사명 입력
    customerListSpread.getSheet(0).bind(GC.Spread.Sheets.Events.CellClick, function (sender, args) {
        document.getElementById('customer').value = args.sheet.getValue(args.row, 0);
        modal.style.display = 'none';
    });

    // 바인딩 헤더 설정 - 각 열의 너비 동적 설정(size)
    var colInfos = [
        { name: "customer", displayName: "회사명", size: '*' },
        { name: "address", displayName: "주소", size: '2.5*' },
        { name: "contact", displayName: "담당자", size: '*' },
        { name: "tel", displayName: "전화", size: '*' },
        { name: "fax", displayName: "팩스", size: '*' },
        { name: "email", displayName: "이메일", size: '2*' },

    ];
    customerListSpread.getSheet(0).setDataSource(customers);
    customerListSpread.getSheet(0).bindColumns(colInfos);
    // 행 기본 높이 설정
    customerListSpread.getSheet(0).defaults.rowHeight = 40;
    // 데이터가 열 너비 초과 시 자동 줄 바꿈
    customerListSpread.getSheet(0).getRange(0, 0, customerListSpread.getSheet(0).getRowCount(), customerListSpread.getSheet(0).getColumnCount()).wordWrap(true);

    // 품목 목록 스프레드
    let itemListSpread = new GC.Spread.Sheets.Workbook('spreadsheet-container');
    // 행 헤더를 드래그하여 순서 변경 가능
    itemListSpread.options.allowDragHeaderToMove = GC.Spread.Sheets.AllowDragHeaderToMove.row;
    // 품목 목록 스프레드 설정
    itemListSpread.options.scrollbarMaxAlign = true;
    itemListSpread.options.showHorizontalScrollbar = false;
    itemListSpread.options.tabStripVisible = false;
    itemListSpread.options.allowUserZoom = false;
    itemListSpread.options.grayAreaBackColor = 'white';
    let sheet = itemListSpread.getSheet(0);

    // 품목코드 콤보박스
    let itemcodecombo = new GC.Spread.Sheets.CellTypes.ComboBox();
    itemcodecombo.items(itemList.map(item => item.code));
    itemcodecombo.editable(true);

    // 바인딩 헤더 설정 - 각 열의 너비 동적 설정(size)
    var colInfos = [
        { name: "code", displayName: "품목코드", size: '*', cellType: itemcodecombo },  // 품목코드 콤보박스 설정
        { name: "name", displayName: "품목명", size: '4*' },
        { name: "quantity", displayName: "수량", size: '*' },
        { name: "unitPrice", displayName: "단가", size: '*', formatter: "#,#" },    // 포맷터 설정
        { name: "amount", displayName: "공급가액", size: '*', formatter: "#,#" },    // 포맷터 설정
        { name: "vat", displayName: "부가세", size: '*', formatter: "#,#" },    // 포맷터 설정
        { name: "description", displayName: "적요", size: '*' },
    ];
    sheet.setDataSource(inputList);
    sheet.bindColumns(colInfos);

    // 마지막 행 클릭 시 새로운 품목 입력 가능한 행 추가
    sheet.bind(GC.Spread.Sheets.Events.CellClick, function (sender, args) {
        if (args.row === sheet.getRowCount() - 1) {
            args.sheet.addRows(args.sheet.getRowCount(), 1);
        }
    });

    // 품목코드 및 수량 입력 시 품목명, 단가, 공급가액, 부가세 값 자동 셋팅
    sheet.bind(GC.Spread.Sheets.Events.ValueChanged, function (e, info) {
        // 품목코드
        if (info.col == 0) {
            info.sheet.setValue(info.row, info.col, info.newValue.toUpperCase());
            itemList.forEach(item => {
                if (item.code == info.newValue) {
                    sheet.setValue(info.row, 1, item.name);
                    sheet.setValue(info.row, 3, item.price);
                    let supplyPrice = item.price * sheet.getValue(info.row, 2);
                    sheet.setValue(info.row, 4, supplyPrice);
                    sheet.setValue(info.row, 5, Math.floor(supplyPrice * 0.1));
                }
            });
        }
        // 수량
        if (info.col == 2) {
            // 숫자만 입력 가능
            if(isNaN(info.newValue) == true) {
                alert("숫자만 입력 가능합니다.");
                info.sheet.setValue(info.row, info.col, null);
            }
            let unitPrice = sheet.getValue(info.row, 3);
            let supplyPrice = unitPrice * info.newValue;
            sheet.setValue(info.row, 4, supplyPrice);
            sheet.setValue(info.row, 5, Math.floor(supplyPrice * 0.1));
        }
    });

    // 품목코드 입력 시 품목명, 단가, 공급가액, 부가세 값 자동 셋팅 (붙여넣기)
    itemListSpread.bind(GC.Spread.Sheets.Events.ClipboardPasted, function (sender, args) {
        if (args.cellRange.col == 0) {
            itemList.forEach(item => {
                if (item.code == args.pasteData.text) {
                    sheet.setValue(args.cellRange.row, 1, item.name);
                    sheet.setValue(args.cellRange.row, 3, item.price);
                    let supplyPrice = item.price * sheet.getValue(args.cellRange.row, 2);
                    sheet.setValue(args.cellRange.row, 4, supplyPrice);
                    sheet.setValue(args.cellRange.row, 5, Math.floor(supplyPrice * 0.1));
                }
            });
        }
    });

    // 견적서 미리보기 스프레드
    let previewSpread = new GC.Spread.Sheets.Workbook('preview');
    // 견적서 양식 불러오기
    fetch("./MESCIUS_Sample_Quotation.sjs")
        .then(res => res.blob())
        .then(blob => {
            previewSpread.open(blob, function () {
                previewSpread.suspendPaint();
                previewSpread.suspendCalcService();
                previewSpread.suspendEvent();
                // 모바일 스크롤바 설정
                previewSpread.options.scrollbarAppearance = GC.Spread.Sheets.ScrollbarAppearance.mobile;
                // 스프레드 옵션 설정
                previewSpread.options.tabStripVisible = false;
                previewSpread.options.scrollbarMaxAlign = true;
                previewSpread.options.allowUserZoom = false;
                previewSpread.options.grayAreaBackColor = 'white';
                // 우클릭 금지
                previewSpread.options.allowContextMenu = false;
                let sheet = previewSpread.getSheet(0);
                // 헤더 숨기기
                sheet.options.colHeaderVisible = false;
                sheet.options.rowHeaderVisible = false;
                // 셀 선택기 숨기기
                sheet.options.selectionBorderColor = 'rgba(0,0,0,0)';
                sheet.options.selectionBackColor = 'rgba(0,0,0,0)';
                // 시트 보호
                sheet.options.isProtected = true;
                // 붙여넣기 방지
                sheet.bind(GC.Spread.Sheets.Events.ClipboardPasting, function (sender, args) {
                    args.cancel = true;
                });
                // 표 설정
                let table = previewSpread.getSheet(0).tables.all()[0];
                // 바인딩 표 행 확장 설정
                table.expandBoundRows(true);
                // 열 수식 설정
                table.setColumnDataFormula(6, '=[@공급가액]+[@부가세]');
                // 시트 배율 설정
                sheet.zoom(0.8);
                previewSpread.resumePaint();
                previewSpread.resumeEvent();
                previewSpread.resumeCalcService();
            }, function (e) {
                console.log(e);
            }, {
                // openoptions - https://developer.mescius.com/spreadjs/api/modules/GC.Spread.Sheets#openoptions
                openMode: GC.Spread.Sheets.OpenMode.lazy
            });
        });

    // 새 견적서 버튼 클릭 시
    document.getElementById('new').onclick = function () {
        if (confirm("새 견적서를 생성하시겠습니까?")) {
            location.reload();
        }
    }

    // 거래처 리스트 스프레드 모달 팝업
    const openBtn = document.getElementById('customerList');
    const closeBtn = document.getElementById('closeModalBtn');
    const modal = document.getElementById('customerListContainer');
    openBtn.onclick = function () {
        modal.style.display = 'flex';
        customerListSpread.refresh();
    };
    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
    // ESC 키로 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
    // 거래처 input 더블클릭 시 거래처 리스트 모달 오픈
    document.getElementById('customer').addEventListener('dblclick', () => {
        modal.style.display = 'flex';
        customerListSpread.refresh();
    });

    // 품목 목록 불러오기 버튼 클릭 시
    const fileInput = document.getElementById('fileInput');
    document.getElementById('loadList').onclick = function () {
        // 기존에 선택된 파일 초기화
        fileInput.value = '';
        fileInput.click();
    }
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        let tmpspread = new GC.Spread.Sheets.Workbook();
        tmpspread.import(file, function () {
            try {
                let tmpsheet = tmpspread.getSheetFromName("품목 목록");
                let r = tmpsheet.getUsedRange(GC.Spread.Sheets.UsedRangeType.data);
                // 품목코드
                itemListSpread.getSheet(0).deleteRows(0, 100);  // 기존 데이터 삭제
                itemListSpread.getSheet(0).addRows(0, r.rowCount);
                itemListSpread.getSheet(0).setArray(0,0, tmpsheet.getArray(0,0,r.rowCount, 1));
                // 수량
                itemListSpread.getSheet(0).setArray(0,2, tmpsheet.getArray(0,1,r.rowCount, 1));
                // 품목코드에 따른 품목명, 단가, 공급가액, 부가세 값 셋팅
                tmpsheet.getArray(0,0,r.rowCount, 1).forEach((item, index) => {
                    itemList.forEach(i => {
                        if (i.code == item[0]) {
                            itemListSpread.getSheet(0).setValue(index, 1, i.name);
                            itemListSpread.getSheet(0).setValue(index, 3, i.price);
                            let supplyPrice = i.price * itemListSpread.getSheet(0).getValue(index, 2);
                            itemListSpread.getSheet(0).setValue(index, 4, supplyPrice);
                            itemListSpread.getSheet(0).setValue(index, 5, Math.floor(supplyPrice * 0.1));
                        }
                    });
                });
            } catch (e) {
                // 품목 목록 시트가 없을 시 알림
                alert("목록을 불러오지 못했습니다. '품목 목록' 시트가 있는지 확인해주세요.");
                return;
            }
        }, function (e) {
            console.log(e); // error callback
        }, {
            // importoptions - https://demo.mescius.co.kr/spreadjs/api/modules/GC.Spread.Sheets#importoptions
            openMode: GC.Spread.Sheets.OpenMode.lazy
        });
    });

    // 견적서 생성 버튼 클릭 시
    document.getElementById('create').onclick = function () {
        let flag = false;
        // 거래처 정보 셋팅
        for (let i = 0; i < customers.length; i++) {
            if (customers[i].customer == document.getElementById('customer').value) {
                previewSpread.getSheet(0).setValue(7, 2, customers[i].customer);
                previewSpread.getSheet(0).setValue(8, 2, customers[i].address);
                previewSpread.getSheet(0).setValue(10, 2, customers[i].contact);
                previewSpread.getSheet(0).setValue(11, 2, customers[i].tel);
                previewSpread.getSheet(0).setValue(12, 2, customers[i].fax);
                previewSpread.getSheet(0).setValue(13, 2, customers[i].email);
                flag = true;
                break;
            }
        }
        // 등록된 거래처가 아닐 시 알림
        if (!flag) {
            alert("등록되지 않은 거래처입니다.");
            return;
        }
        // 입력된 값 셋팅
        previewSpread.getSheet(0).setValue(6, 2, document.getElementById('created-date').value);
        previewSpread.getSheet(0).setValue(10, 6, document.getElementById('manager').value);
        previewSpread.getSheet(0).setValue(5, 7, document.getElementById('validity-period').value * 1);
        for (let i = previewSpread.getSheet(0).getRowCount() - 1; i >= 0; i--) {
            if (itemListSpread.getSheet(0).getValue(i, 0) == null) {
                itemListSpread.getSheet(0).deleteRows(i, 1);
            }
        }
        let data;
        // 통화에 따른 단가, 공급가액, 부가세 변환, 통화 심볼 셋팅
        if (document.getElementById('currency').value == 'USD') {
            let inputListUSD = JSON.parse(JSON.stringify(itemListSpread.getSheet(0).getDataSource()));
            inputListUSD.forEach(item => {
                item.unitPrice = item.unitPrice ? Math.floor(item.unitPrice / 1300) : '';
                item.amount = item.amount ? Math.floor(item.amount / 1300) : '';
                item.vat = item.vat ? Math.floor(item.vat / 1300) : '';
            });
            previewSpread.getSheet(0).getCell(17, 3).formatter("$ #,#;;-");
            data = { 'inputList': inputListUSD };
        }
        else if (document.getElementById('currency').value == 'KRW') {
            previewSpread.getSheet(0).getCell(17, 3).formatter("￦ #,#;;-");
            let inputListKRW = JSON.parse(JSON.stringify(itemListSpread.getSheet(0).getDataSource()));
            data = { 'inputList': inputListKRW };
        }
        let source = new GC.Spread.Sheets.Bindings.CellBindingSource(data);
        previewSpread.getSheet(0).setDataSource(source);

        // 행 높이 자동 조절
        let table = previewSpread.getSheet(0).tables.all()[0];
        let trange = table.range();
        for (let i = 0; i < trange.rowCount - 2; i++) {
            previewSpread.getSheet(0).setRowHeight(trange.row + i + 1, 50);
        }

        // 인쇄 설정 - 너비 맞춤, 가로 가운데 맞춤
        let printInfo = new GC.Spread.Sheets.Print.PrintInfo();
        printInfo.fitPagesWide(1);
        printInfo.centering(GC.Spread.Sheets.Print.PrintCentering.horizontal);
        printInfo.margin({ top: 20, bottom: 20, left: 0, right: 0, header: 0, footer: 0 });
        previewSpread.getSheet(0).printInfo(printInfo);
    }

    // PDF export용 글꼴 등록
    fetch("./NanumGothic.ttf")
        .then(function (response) {
            return response.arrayBuffer();
        })
        .then(function (arrayBuffer) {
            var base64String = _arrayBufferToBase64(arrayBuffer);
            var fonts = {
                normal: base64String
            };
            GC.Spread.Sheets.PDF.PDFFontsManager.registerFont('나눔고딕', fonts);
            GC.Spread.Sheets.PDF.PDFFontsManager.fallbackFont = function (font) {
                return fonts.normal;
            }
        });

    // PDF 저장 버튼 클릭 시
    document.getElementById('exportPDF').onclick = function () {
        let fileName = document.getElementById('customer').value + '_' + document.getElementById('created-date').value + '_견적서.pdf';
        previewSpread.savePDF(
            function (blob) {
                saveAs(blob, fileName);
            },
            console.log,
            {
                // 문서 정보
                title: 'Quotation',
                author: 'MESCIUS',
                subject: 'Quotation',
                keywords: 'Quotation',
                creator: 'MESCIUS'
            }
        );
    }
    
    // Excel 저장 버튼 클릭 시
    document.getElementById('exportExcel').onclick = function () {
        let fileName = document.getElementById('customer').value + '_' + document.getElementById('created-date').value + '_견적서.xlsx';
        previewSpread.export(function (blob) {
            saveAs(blob, fileName);
        }, function (e) {
            console.log(e);
        }, {
            // ExportXlsxOptions - https://demo.mescius.co.kr/spreadjs/api/modules/GC.Spread.Sheets#exportxlsxoptions
            fileType: GC.Spread.Sheets.FileType.excel,
            includeBindingSource: true
        });
    }    
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