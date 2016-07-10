var BLOCK_WIDTH = 3;
var BLOCK_HEIGHT = 3;
var GAP_WIDTH = 1;
var GAP_HEIGHT = 2;
var start = new Date('1991', '11', '22');
var end = new Date('2077', '7', '14');

function timeGapOnClick()
{


}

function fillImgOnClick()
{
    start = Bridge.Date.parse(startPicker.value);
    end = Bridge.Date.parse(endPicker.value);

    var yearCount = new System.Int32;
    var monthCount = new System.Int32;
    var dayCount = new System.Int32;
    Utilities.DateCalculator.getDurationInYMD(start, end,
        yearCount, monthCount, dayCount);

    y.textContent = yearCount.v + 'years';
    m.textContent = monthCount.v + 'months';
    d.textContent = dayCount.v + 'days';


    var calculator = new Utilities.DateCalculator(start, end);
    var width = 366 * (BLOCK_WIDTH + GAP_WIDTH) + GAP_WIDTH;
    var height = calculator.dayList.length * (BLOCK_HEIGHT + GAP_HEIGHT) + GAP_HEIGHT;

    var drawDay = new Utilities.DrawDay(calculator, width, height, 
        BLOCK_WIDTH, BLOCK_HEIGHT, GAP_WIDTH, GAP_HEIGHT);
    var array = drawDay.getByteArray();


    imgHolder.width = width;
    imgHolder.height = height;
    var context = imgHolder.getContext('2d');
    var imgData = context.getImageData(0, 0, width, height);
    imgData.data.set(new Uint8ClampedArray(array));
    context.putImageData(imgData, 0, 0);

}
