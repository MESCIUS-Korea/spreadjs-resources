<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ko">

<head>
  	<meta charset="UTF-8">
  	<meta name="spreadjs culture" content="ko-kr" />
  	<title>MESCIUS SEO 분석 솔루션</title>
  	<link href="css/style.css" rel="stylesheet" type="text/css" />
  	<link href="https://cdn.mescius.com/spreadjs/hosted/css/gc.spread.sheets.excel2013white.18.2.2.css" rel="stylesheet" type="text/css" />
</head>

<body>

  <!-- 사이드바 -->
  <div class="sidebar">
    <div class="logo"></div>
    <ul>
      <li onclick="loadPage('dashboard.html', this)" class="active" id="dashboard">대시보드</li>
      <li onclick="loadPage('datainfo.html', this)">데이터 정보</li>   
      <li onclick="loadPage('settings.html', this)" id="settings">설정</li>
    </ul>
  </div>

  <!-- 메인 -->
  <div class="main">
    <div class="top-bar">
      <input type="text" class="search-input" placeholder="🔍 검색" /> <!-- 동작하지 않는 요소입니다 -->
      <div class="user-actions">
        <button class="btn refresh-btn" onclick="dataRefresh()">🔄 데이터 새로고침</button>
        <div class="user-icon"></div>
        <span>User</span>
      </div>
    </div>

    <div id="main-content">

    </div>
  </div>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/gc.spread.sheets.all.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.shapes.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.charts.18.2.2.min.js"></script>

	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.print.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.pdf.18.2.2.min.js"></script>
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/plugins/gc.spread.sheets.io.18.2.2.min.js"></script>
	
	<script type="text/javascript" src="https://cdn.mescius.com/spreadjs/hosted/scripts/resources/ko/gc.spread.sheets.resources.ko.18.2.2.min.js"></script>
	
	
  	<script src="js/FileSaver.min.js"></script>
  	<script src="js/app.js"></script>
</body>

</html>