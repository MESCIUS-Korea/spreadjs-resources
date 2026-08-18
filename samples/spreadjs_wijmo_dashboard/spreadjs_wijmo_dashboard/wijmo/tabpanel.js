function tabpanelComponent(){
  //       TabPanel
  var theTabPanel = new wijmo.nav.TabPanel("#theTabPanel");
  theTabPanel.selectedIndexChanged.addHandler(function (s, e) {
    if (s.selectedIndex === 1) {
      designer.refresh();
      spread.refresh(); //탭 패널 클릭 이벤트에 선언 필요
    }
  });

  var host = theTabPanel.hostElement;
  wijmo.toggleClass(host, "tabs-left");
}