function gridComponent(gridData){
  // create a grid with default row height
  theGrid = new wijmo.grid.FlexGrid("#theGrid", {
    isReadOnly: true,
    alternatingRowStep:0,
    headersVisibility:"Column",
    autoGenerateColumns: false,
    columns: [
      {
        binding: "creditCardId",
        header: "신용카드 아이디",
        width: 200,
      },
      {
        binding: "cardType",
        header: "카드 유형",
        allowResizing: false,
      },
      {
        binding: "cardNumber",
        header: "카드 번호",
        allowResizing: false,
      },
      {
        binding: "expiryYear",
        header: "만기년",
        format: "d",

        allowResizing: false,
      },
      {
        binding: "expiryMonth",
        header: "만기월",

        allowResizing: false,
      },
      {
        binding: "modifiedDate",
        header: "수정된 날짜",
        dataType: "Date",

        allowResizing: false,
        format:"d"
      },
    ],
    itemsSource: new wijmo.collections.CollectionView(gridData, {
      sortDescriptions: ["cardType"],
      groupDescriptions: ["cardType"],
      getError,
    }),
    formatItem: function (s, e) {
      if (e.panel == s.cells) {
        var col = s.columns[e.col];
        if (col.binding === "cardNumber") {
          var val = s.getCellData(e.row, e.col);

          // 입력된 숫자를 문자열로 변환
          let numStr = val.toString();

          // 마스킹할 부분의 시작 인덱스와 마스킹할 길이 설정
          const maskStartIndex = 6; // 마스킹할 부분의 시작 인덱스
          const maskLength = 6; // 마스킹할 길이

          // 마스킹할 부분의 시작 인덱스부터 지정된 길이만큼 '*'로 대체
          let masked =
              numStr.substring(0, maskStartIndex) + "*".repeat(maskLength);

          // 마스킹한 부분 뒤의 숫자들은 그대로 유지
          masked += numStr.substring(maskStartIndex + maskLength);
          s.setCellData(e.row, e.col, masked, false, true);
        }
      }
    },
  });

  filter = new wijmo.grid.filter.FlexGridFilter(theGrid)
}  


 function getError(item, propName) {
    switch (propName) {
      case "expiryYear":
        return item[propName] === 2005 ? "카드가 만기되었습니다!" : "";
      case null:
        let errors = [];
        for (let key in item) {
          let err = getError(item, key);
          if (err) errors.push(err);
        }
        return errors.length > 1
          ? "해당 항목은 " + errors.length + " 개의 에러가 있습니다."
        : errors.length == 1
          ? errors[0]
        : null;
    }
    return null;
  }
  //    그리드 내보내기
  document.getElementById("exportGridbtn").addEventListener("click",function(){
    wijmo.grid.xlsx.FlexGridXlsxConverter.saveAsync(theGrid, {
      includeColumnHeaders: true,
      includeStyles: false,
    }, 'FlexGrid.xlsx');
  })

  //    그룹화 설정 유무
  document.getElementById("isGrouping").addEventListener("click",function(e){
    theGrid.showGroups = !theGrid.showGroups
  })

  //    필터 설정
  document.getElementById("isFiltering").addEventListener("click",function(){
    filter.defaultFilterType =
      filter.defaultFilterType === wijmo.grid.filter.FilterType.Both
      ? wijmo.grid.filter.FilterType.None
    : wijmo.grid.filter.FilterType.Both;
  })