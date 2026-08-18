function chartComponent(chartData){
  linechart = new wijmo.chart.FlexChart("#chart", {
    header:"판매 내역 차트",
    legend: {
      position: wijmo.chart.Position.Bottom,
    },
    chartType: wijmo.chart.ChartType.LineSymbols,
    bindingX: "year",
    series: [

      { binding: "totalSalesNew", name: "신규 채널 총판매액" ,chartType:"Bar"},
      { binding: "totalSalesUsed", name: "기존 채널 총판매액",chartType:"Bar"},
      { binding: "newSales", name: "신규 채널 판매" },
      { binding: "usedSales", name: "기존 채널 판매"},
    ],
    tooltip: {
      content: (hti) => {
        let item = hti.item;
        return `<b>${item.year}년</b> </br><b>신규 채널 건수: </b> ${wijmo.Globalize.format(item.newSales,"n")}</br><b>기존 채널 건수: </b> ${wijmo.Globalize.format(item.usedSales,"n")}</br><b>신규 채널 판매 총액: </b> ${wijmo.Globalize.format(item.totalSalesNew,"c,,")}</br><b>기존 채널 판매 총액: </b> ${wijmo.Globalize.format(item.totalSalesUsed,"c,,")}`;
      }
    },
    itemsSource: chartData,
    palette: [
      "#FFD07C",
      "#42A5E2",
      "#FF8774",
      "#08D1A4"
    ],
  });

  // 다중축 설정
  let axisY2 = new wijmo.chart.Axis();
  axisY2.position = wijmo.chart.Position.Right;
  axisY2.format = "c,,"
  axisY2.title = "판매총액 (만원)";
  getSeries("totalSalesNew").axisY = axisY2;
  getSeries("totalSalesUsed").axisY = axisY2;




  //   create scrollbar
  let axisXScrollbar = new AxisScrollbar(linechart.axes[0], {
    minScale: 0.02
  });

  setTimeout(() => {
    axisXScrollbar.minPos = 0.2
    axisXScrollbar.maxPos = 0.7
  }, 400)

  // 마우스 휠로 차트 줌/줌아웃
  linechart.hostElement.addEventListener('wheel', e => {
    if (e.ctrlKey) {
      let center = linechart.pointToData(e.clientX, e.clientY);
      applyZoom(linechart, e.deltaY > 0 ? 1.1 : .9, center);
      e.preventDefault();
    }
  });


}



document.querySelector('#btnZoomIn').addEventListener('click', () => applyZoom(linechart, .9));
document.querySelector('#btnZoomOut').addEventListener('click', () => applyZoom(linechart, 1.1));
document.querySelector('#btnResetZoom').addEventListener('click', () => applyZoom(linechart, null));

// apply a zoom factor to the chart (keeping the center constant)
function applyZoom(chart, factor, center) {
  applyZoomAxis(chart.axisX, factor, center ? center.x : null);
  applyZoomAxis(chart.axisY, factor, center ? center.y : null);
}
//
function applyZoomAxis(axis, factor, center) {
  if (!factor) { // reset
    axis.min = axis.max = null;
  }
  else {
    let min = (axis.min != null ? axis.min : axis.actualMin).valueOf(), max = (axis.max != null ? axis.max : axis.actualMax).valueOf();
    //
    if (center == null) {
      center = (min + max) / 2;
    }
    //
    axis.min = center - (center - min) * factor;
    axis.max = center + (max - center) * factor;
  }
}
function getSeries(binding) {
  let s = linechart.series;
  //
  for (let i = 0; i < s.length; i++) {
    if (s[i].binding == binding) {
      return s[i];
    }
  }
  //
  return null;
}
// 

// function convertToDate(testData) {
//   linechart.itemsSource = testData;
//   linechart.collectionView.refresh();
// }

// // 


//########################### axisScrollBar 클래스 ######################################
class AxisScrollbar {

  constructor(axis, options) {

    this._isVisible = true;
    this._min = null;
    this._max = null;
    this._buttonsVisible = true;

    this._minScale = 0;

    this._chart = null;
    this._axis = null;
    this._rangeSlider = null;

    this._slbarContainer = null;
    this._isXAxis = true;
    this._chartRefreshDelay = null;
    if (!wijmo.chart) {
      wijmo.assert(false, 'The Axis cannot be null.');
    }
    this._axis = axis;
    this._chart = axis._chart;
    this._isXAxis = this._axis.axisType === wijmo.chart.AxisType.X;
    wijmo.copy(this, options);
    this._createScrollbar();
  }

  get buttonsVisible() {
    return this._buttonsVisible;
  }
  set buttonsVisible(value) {
    if (value !== this._buttonsVisible) {
      this._buttonsVisible = wijmo.asBoolean(value);
      if (!this._rangeSlider) {
        return;
      }
      this._rangeSlider.buttonsVisible = this._buttonsVisible;
    }
  }

  get isVisible() {
    return this._isVisible;
  }
  set isVisible(value) {
    if (value != this._isVisible) {
      this._isVisible = wijmo.asBoolean(value);
      if (!this._rangeSlider) {
        return;
      }
      this._rangeSlider.isVisible = value;
    }
  }
  set minPos(value) {
    if (value < 0 && value > 1 && value > this._rangeSlider._maxPos) {
      return;
    }
    this._rangeSlider._minPos = value;
    this._updateAxisRange();
  }
  set maxPos(value) {
    if (value < 0 && value > 1 && value < this._rangeSlider._minPos) {
      return;
    }
    this._rangeSlider._maxPos = value;
    this._updateAxisRange();
  }

  get minScale() {
    return this._minScale;
  }
  set minScale(value) {
    if (value > 0 && value != this._minScale) {
      this._minScale = wijmo.asNumber(value);
      if (!this._rangeSlider) {
        return;
      }
      this._rangeSlider.minScale = value;
    }
  }

  remove() {
    if (this._slbarContainer) {
      this._chart.hostElement.removeChild(this._slbarContainer);
      this._switchEvent(false);
      this._slbarContainer = null;
    }
  }
  _createScrollbar() {
    var chart = this._chart, chartHostEle = chart.hostElement;
    this._slbarContainer = wijmo.createElement('<div class="wj-axis-scrollbar-container"></div>');
    this._rangeSlider = new wijmo.chart.interaction._RangeSlider(this._slbarContainer, true, 
                                                                 true,
                                                                 {
      buttonsVisible: this._buttonsVisible,
      isHorizontal: this._isXAxis,
      isVisible: this._isVisible,
      minScale: this._minScale,
      seamless: true
    });
    chartHostEle.appendChild(this._slbarContainer);
    this._switchEvent(true);
  }
  _switchEvent(isOn) {
    var eventListener = isOn ? 'addEventListener' : 'removeEventListener', eventHandler = isOn ? 'addHandler' : 'removeHandler';
    if (this._chart.hostElement) {
      this._chart.rendered[eventHandler](this._refresh, this);
      this._rangeSlider.rangeChanged[eventHandler](this._updateAxisRange, this);
      this._rangeSlider.rangeChanging[eventHandler](this._updatingAxisRange, this);
    }
  }
  _refresh() {
    var chartHostEle = this._chart.hostElement, rangeSlider = this._rangeSlider, pa, pOffset, plotBox, axisRect = this._axis._axrect, axisEle, axisOffset, isBottom, isLeft, rsWidth, rOffset = wijmo.getElementRect(this._slbarContainer);
    if (rangeSlider._isSliding) {
      return;
    }

    if (this._min === null) {
      this._min = wijmo.isDate(this._axis.actualMin) ? this._axis.actualMin.valueOf() : this._axis.actualMin;
    }
    if (this._max === null) {
      this._max = wijmo.isDate(this._axis.actualMax) ? this._axis.actualMax.valueOf() : this._axis.actualMax;
    }
    pa = chartHostEle.querySelector('.' + wijmo.chart.FlexChart._CSS_PLOT_AREA);
    pOffset = wijmo.getElementRect(pa);
    plotBox = pa.getBBox(pa);

    axisEle = chartHostEle.querySelector(this._isXAxis ? '.wj-axis-x' : '.wj-axis-y');
    axisOffset = wijmo.getElementRect(axisEle);
    if (axisOffset.height === 0) {
      return;
    }
    if (this._isXAxis) {
      isBottom = this._axis.position === wijmo.chart.Position.Bottom;
      rangeSlider._refresh({
        left: plotBox.x,
        top: isBottom ? axisOffset.top + axisOffset.height - rOffset.top :
        axisOffset.top - rOffset.top - axisOffset.height,
        width: plotBox.width
      });
    }
    else {
      isLeft = this._axis.position === wijmo.chart.Position.Left;
      rsWidth = rangeSlider._handleWidth;
      rangeSlider._refresh({
        left: isLeft ? axisOffset.left - rOffset.left - rsWidth :
        axisOffset.left - rOffset.left + pOffset.width + this._axis._axrect.width,
        top: pOffset.top - rOffset.top,
        height: plotBox.height
      });
    }
  }
  _updateAxisRange() {
    var chart, axis, range, rangeSlider = this._rangeSlider;
    chart = this._chart;
    axis = this._axis;
    range = this._max - this._min;
    axis.min = this._min + rangeSlider._minPos * range;
    axis.max = this._min + rangeSlider._maxPos * range;
    chart.invalidate();
  }
  _updatingAxisRange() {
    var self = this;
    this._chartRefreshDelay = window.setTimeout(function () {
      if (self._chartRefreshDelay) {
        clearTimeout(self._chartRefreshDelay);
        self._chartRefreshDelay = null;
      }
      self._updateAxisRange();
    }, 200);
  }
}
