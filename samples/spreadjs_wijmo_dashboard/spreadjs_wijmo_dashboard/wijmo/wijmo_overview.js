let theGrid,
    theRadialGaugeOne,
    theRadialGaugeTwo,
    theRadialGaugeThree,
    theRadialGaugeFour,
    linechart,
    pieChart;
function loadWijmo(cardData, customerData, salesChartData) {
  wijmo.setLicenseKey("000696529.codepen.website,531778136519128#B03UScsFmZ0IiczRmI1pjIs9WQisnOiQkIsISP3EUOKVjWh9UQyEHVVFHbyd6dYVzKzMGOahDaxVEc9A7SxJlcDBFb5Z7b4IzdYllN4QEUTZXePBFcxAHe9UjUPhFW5JTUFFXT7J7RMVmT5VlN5pEOxhHUGxUTtdHRVdUcLdjb4EEajl5VwdnZ72UVvAXSndGR626Q59WaOZlRy4Ea6ImZiZjQ7g6Zy24VNhkdM3SS7Q5RzxGTzIHaMlmTDtEbqhmWYR4dSZFc7NVdP5EN6lTbNdVbMlTUvQUZGdTb8MDZZ3GMvRlRzVmWxZlRo3ieoh5aSFXVtR7KI5kQYJVbVNlUxN6M4MFZnFWSSJjRxRzNv9ke7cmbqJXSTpWVoZ4NnJjNIllT7ZGRSRHazsScMJEeXZkR6Z6VOJDeq5mcyUWQztkQnVTY6ombYNGNER4VqRmSuJHUaVTMGhDNVhWWCZjaINFTspnT0JUV9RFMLNWe8RjWiJiOiMlIsICNGJUOGRDRiojIIJCL4kTMwYzM8gTO0IicfJye35XX3JSSwIjUiojIDJCLi86bpNnblRHeFBCI4VWZoNFelxmRg2Wbql6ViojIOJyes4nI5kkTRJiOiMkIsIibvl6cuVGd8VEIgIXZ7VWaWRncvBXZSBybtpWaXJiOi8kI1xSfis4N8gkI0IyQiwiIu3Waz9WZ4hXRgAydvJVa4xWdNBybtpWaXJiOi8kI1xSfiQjR6QkI0IyQiwiIu3Waz9WZ4hXRgACUBx4TgAybtpWaXJiOi8kI1xSfiMzQwIkI0IyQiwiIlJ7bDBybtpWaXJiOi8kI1xSfiUFO7EkI0IyQiwiIu3Waz9WZ4hXRgACdyFGaDxWYpNmbh9WaGBybtpWaXJiOi8kI1tlOiQmcQJCLiADN7IzNwAyNyYDM4IDMyIiOiQncDJCLiUGdpNnYldnLuVGclR6bj9SOyUjN9YDMwAjI0IyctRkIsICsL6OnLyOhU6OtdyOiguOu7quI0ISYONkIsICOyETOxUjNzEDO7cTMzUjI0ICZJJCL355W0IyZsZmIsIiM6NjMwIjI0IicNZLI"
  );

  document.getElementById("sideBarVisible").addEventListener("click",function(e){
    const sideBar = document.querySelector('.wj-tabheaders');

    if(sideBar.style.display === "flex"){
      sideBar.style.display = "none"
    } else {
      sideBar.style.display = "flex"
    }

  })

  gridComponent(cardData)
  chartComponent(salesChartData)
  gaugeComponent(cardData)
  pieComponent(customerData)
  popupComponent()
  tabpanelComponent() 
autocompleteComponent()
}

function changeData(data,gaugeData) {
  var gridData = convertGridData(data)
  
  theGrid.collectionView.sourceCollection = gridData;
  theGrid.collectionView.refresh();

  theRadialGaugeOne.value = gaugeData.ColonialVoice;
  theRadialGaugeTwo.value = gaugeData.Distinguish;
  theRadialGaugeThree.value = gaugeData.SuperiorCard;
  theRadialGaugeFour.value = gaugeData.Vista;

  var res = document.getElementsByClassName("gauge-value-text")

  res[0].textContent = gaugeData.ColonialVoice +"%";
  res[1].textContent = gaugeData.Distinguish +"%";
  res[2].textContent = gaugeData.SuperiorCard +"%";
  res[3].textContent = gaugeData.Vista +"%";
}

function changeChartData(data) {
  linechart.itemsSource = data;
  linechart.collectionView.refresh();
}

function changePieData(data) {
  pieChart.itemsSource =  convertToPieData(data);
}

function convertGridData(data){
  data.forEach(d => {
     if (d.modifiedDate) {
            d.modifiedDate = convertOADateStringToISOString(d.modifiedDate);
        }
  })
  return data
}
function convertOADateStringToISOString(oaDateString) {
    var match = oaDateString.match(/\/OADate\((\d+)\)\//);
    if (match) {
        var oaDate = parseInt(match[1], 10);
        var baseDate = new Date(Date.UTC(1899, 11, 30));
        var jsDate = new Date(baseDate.getTime() + oaDate * 24 * 60 * 60 * 1000);

        return jsDate.toISOString();
    } else {
        throw new Error("Invalid OADate string format");
    }
}

