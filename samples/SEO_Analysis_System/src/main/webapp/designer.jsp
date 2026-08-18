<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
	String filename = request.getParameter("filename");
%>
<!DOCTYPE html>
<html>
<head>
  	<meta charset="UTF-8">
  	<meta name="spreadjs culture" content="ko-kr" />
  	<title>디자이너</title>
  	<link href="https://cdn.mescius.com/spreadjs/hosted/css/gc.spread.sheets.excel2013white.18.2.2.css" rel="stylesheet" type="text/css" />
	<link href="https://cdn.mescius.co.kr/installers/SpreadJS/demo/18.2.2/gc.spread.sheets.designer.light.18.2.2.min.css" rel="stylesheet" type="text/css">
	<link href="css/style_designer.css" rel="stylesheet" type="text/css">
</head>
<body>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/gc.spread.sheets.all.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.shapes.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.charts.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.datacharts.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.slicers.18.2.2.min.js"></script>

	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.print.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.barcode.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.pdf.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.pivot.pivottables.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.tablesheet.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.ganttsheet.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.formulapanel.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.report.reportsheet.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.io.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/resources/ko/gc.spread.sheets.resources.ko.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.co.kr/installers/SpreadJS/demo/18.2.2/gc.spread.sheets.designer.resource.ko.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.co.kr/installers/SpreadJS/demo/18.2.2/gc.spread.sheets.designer.all.18.2.2.min.js"></script>
	<div id="designerHost"></div>
	<script>
		let designer = new GC.Spread.Sheets.Designer.Designer("designerHost");
	    let workbook = designer.getWorkbook();
	    
		const filename = "<%= filename %>";
		console.log(filename);

		fetch("xlsx/" + filename, { cache: "no-store" })
	    .then(res => res.blob())
	    .then(blob => {
	        workbook.import(blob, function () {
	        }, function (e) {
	            console.log(e); // error callback
	        });
	    });	
	
	    // 기본 구성에 접근합니다.
	    var config = GC.Spread.Sheets.Designer.DefaultConfig;
	
	    // 새 버튼의 레이아웃을 설정합니다.
	    var saveData = {
	        "label": "저장",
	        "thumbnailClass": "",
	        "commandGroup": {
	            "children": [
	                {
	                    "direction": "vertical",
	                    "commands": [
	                        "cmdSaveData"
	                    ]
	                }
	            ]
	        }
	    }
	
	    // 새 버튼을 구성 리본 탭에 추가합니다.
	    config.ribbon[0].buttonGroups.unshift(saveData);
	
	    // 새 버튼에 대한 명령을 생성합니다.
	    config.commandMap = {
	        cmdSaveData: {
	            title: "변경 데이터 저장",
	            text: "변경 데이터 저장",
	            iconClass: "cmdSaveData",
	            bigButton: "true",
	            commandName: "cmdSaveData",
	            execute: async (context, propertyName, fontItalicChecked) => {				
					workbook.export(async function (blob) {
						const formData = new FormData();
				    	formData.append("file", blob, filename);
	
				    	// JSP나 Servlet에 파일 업로드 요청
				    	const response = await fetch("saveExcel.jsp", {
				    		method: "POST",
				     		body: formData
				    	});
			    	    alert("저장 중입니다.");		
						
				    	// 응답
				    	const result = await response.text();
				    	console.log("서버 응답:", result);

				    	if (result.trim() === "success") {
				    	    alert("저장이 완료되었습니다.");				    	    
				    	} else {
				    	    alert("저장 실패: " + result);
				    	}
				    	
					}, function (e) {
					   console.log(e);
					}, { 
	                       // ExportXlsxOptions - https://demo.mescius.co.kr/spreadjs/api/modules/GC.Spread.Sheets#exportxlsxoptions
	                       fileType: GC.Spread.Sheets.FileType.excel
	                   });					
	            }
	        }
	    }	
	    designer.setConfig(config);
	</script>
</body>
</html>