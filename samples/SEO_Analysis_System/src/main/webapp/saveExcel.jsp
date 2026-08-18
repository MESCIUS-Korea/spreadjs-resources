<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*, jakarta.servlet.*, jakarta.servlet.http.*" %>
<%@ page import="com.grapecity.documents.excel.*" %>
<%
	Part filePart = request.getPart("file");
	
	 if (filePart != null) {
        // 업로드된 blob 데이터 스트림 얻기
        InputStream fileContent = filePart.getInputStream();
        String fileName = filePart.getSubmittedFileName();
        
        Workbook workbook = new Workbook();

        workbook.open(fileContent);
        String savePath = application.getRealPath("xlsx/" + fileName);
        workbook.save(savePath);
        System.out.println("엑셀 파일 처리 완료! 저장 경로: " + savePath);
        fileContent.close();
     	// 클라이언트에게 성공 메시지 전송
        out.print("success");
        out.flush();
     	
    } else {
        out.print("파일을 받지 못했습니다.");
    }
%>
