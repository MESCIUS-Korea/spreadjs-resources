function popupComponent(){
    let alarmPopup = new wijmo.input.Popup('#alarmPopup',{
    owner: document.getElementById('alarmBtn'),
    showTrigger: 'Click',
  })

  let messagePopup = new wijmo.input.Popup('#messagePopup',{
    owner: document.getElementById('messageBtn'),
    showTrigger: 'Click',
  })

  let settingPopup = new wijmo.input.Popup('#settingPopup',{
    owner: document.getElementById('settingBtn'),
    showTrigger: 'Click',
  })

}