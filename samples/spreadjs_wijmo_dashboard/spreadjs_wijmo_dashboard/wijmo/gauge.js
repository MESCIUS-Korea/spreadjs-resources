function gaugeComponent(gaugeData){
   let count = {};

  gaugeData.forEach((item) => {
    const value = item["cardType"];
    count[value] = (count[value] || 0) + 1;
  });
  var perText = document.getElementsByClassName("gauge-value-text")

  perText[0].textContent = count.ColonialVoice +"%";
  perText[1].textContent = count.Distinguish +"%";
  perText[2].textContent = count.SuperiorCard +"%";
  perText[3].textContent = count.Vista +"%";

  // create gauges
  theRadialGaugeOne = new wijmo.gauge.RadialGauge("#theRadialGaugeOne", {
    min: 0,
    max: 100,
    value: count.ColonialVoice,
    isReadOnly: true,
    showRanges: false,
    hasShadow: false,
    showText: 'MinMax',
    pointer: {
      thickness: 0.5,
      color: "#1C658C",
    },
    needleLength: wijmo.gauge.NeedleLength.Inner,
    needleElement: wijmo.gauge.RadialGauge.createNeedleElement([
      { x: 0, y: 10 }, { x: 70, y: 0 },{ x: 0, y: -10 }
    ],10,10),
    startAngle: -30,
    sweepAngle: 240,
    thumbSize: 0,
    face: {
      thickness: 0.5,
    },
    ranges: [
      { min: 0, max: 33 },
      { min: 33, max: 66 },
      { min: 66, max: 100 },
    ],
  })
  // create gauges
  theRadialGaugeTwo = new wijmo.gauge.RadialGauge("#theRadialGaugeTwo", {
    min: 0,
    max: 100,
    value: count.Distinguish,
    isReadOnly: true,
    showRanges: false,
    hasShadow: false,
    step: 10,
    showText: 'MinMax',
    pointer: {
      thickness: 0.5,
      color: "#eded4c",
    },
    needleLength: wijmo.gauge.NeedleLength.Inner,
    needleElement: wijmo.gauge.RadialGauge.createNeedleElement([
      { x: 0, y: 10 }, { x: 70, y: 0 },{ x: 0, y: -10 }
    ],10,10),
    startAngle: -30,
    sweepAngle: 240,
    thumbSize: 0,
    face: {
      thickness: 0.5,

    },
    ranges: [
      { min: 0, max: 33 },
      { min: 33, max: 66 },
      { min: 66, max: 100 },
    ],
  });

  // create gauges
  theRadialGaugeThree = new wijmo.gauge.RadialGauge("#theRadialGaugeThree", {
    min: 0,
    max: 100,
    value: count.SuperiorCard,
    isReadOnly: true,
    showRanges: false,
    hasShadow: false,
    step: 10,
    showText: 'MinMax',
    pointer: {
      thickness: 0.5,
      color: "#F55C47",
    },
    needleLength: wijmo.gauge.NeedleLength.Inner,
    needleElement: wijmo.gauge.RadialGauge.createNeedleElement([
      { x: 0, y: 10 }, { x: 70, y: 0 },{ x: 0, y: -10 }
    ],10,10),
    startAngle: -30,
    sweepAngle: 240,
    thumbSize: 0,
    face: {
      thickness: 0.5,
    },
    ranges: [
      { min: 0, max: 33 },
      { min: 33, max: 66 },
      { min: 66, max: 100 },
    ],
  });

  // create gauges
  theRadialGaugeFour = new wijmo.gauge.RadialGauge("#theRadialGaugeFour", {
    min: 0,
    max: 100,
    value: count.Vista,
    isReadOnly: true,
    showRanges: false,
    hasShadow: false,
    step: 10,
    showText: 'MinMax',
    pointer: {
      thickness: 0.5,
      color: "grey",
    },
    needleLength: wijmo.gauge.NeedleLength.Inner,
    needleElement: wijmo.gauge.RadialGauge.createNeedleElement([
      { x: 0, y: 10 }, { x: 70, y: 0 },{ x: 0, y: -10 }
    ],10,10),
    startAngle: -30,
    sweepAngle: 240,
    thumbSize: 0,
    face: {
      thickness: 0.5,

    },
    ranges: [
      { min: 0, max: 33 },
      { min: 33, max: 66 },
      { min: 66, max: 100 },
    ],
  });
}