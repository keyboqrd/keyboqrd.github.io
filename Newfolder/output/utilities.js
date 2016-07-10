(function (globals) {
    "use strict";

    Bridge.define('Utilities.DateCalculator', {
        statics: {
            /**
             * Get duration in year plus month plus day by start date and end date
             *
             * @static
             * @public
             * @this Utilities.DateCalculator
             * @memberof Utilities.DateCalculator
             * @param   {Date}             start         
             * @param   {Date}             end           
             * @param   {System.Int32&}    yearCount     
             * @param   {System.Int32&}    monthCount    
             * @param   {System.Int32&}    dayCount
             * @return  {void}
             */
            getDurationInYMD: function (start, end, yearCount, monthCount, dayCount) {
                var y1 = start.getFullYear();
                var m1 = (start.getMonth() + 1);
                var d1 = start.getDate();
                var y2 = end.getFullYear();
                var m2 = (end.getMonth() + 1);
                var d2 = end.getDate();
    
                var dy = (y2 - y1) | 0;
                var dm = (m2 - m1) | 0;
                var dd = (d2 - d1) | 0;
    
                yearCount.v = 0;
                monthCount.v = 0;
                dayCount.v = 0;
    
                if (dy < 0 || (dy === 0 && dm < 0) || (dy === 0 && dm === 0 && dd < 0)) {
                    throw new System.Exception("out of range");
                }
                else  {
                    if (dy >= 0 && dm >= 0 && dd >= 0) {
                        yearCount.v = dy;
                        monthCount.v = dm;
                        dayCount.v = dd;
                    }
                    else  {
                        if (dy > 0 && dm < 0 && dd >= 0) {
                            yearCount.v = (dy - 1) | 0;
                            monthCount.v = (12 + dm) | 0;
                            dayCount.v = dd;
                        }
                        else  {
                            if (dy > 0 && dm <= 0 && dd < 0) {
                                yearCount.v = (dy - 1) | 0;
                                monthCount.v = (11 + dm) | 0;
                                var startToo = new Date(new Date(start.getFullYear() + ((dy - 1) | 0), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()).getFullYear(), new Date(start.getFullYear() + ((dy - 1) | 0), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()).getMonth() + ((11 + dm) | 0), new Date(start.getFullYear() + ((dy - 1) | 0), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()).getDate(), new Date(start.getFullYear() + ((dy - 1) | 0), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()).getHours(), new Date(start.getFullYear() + ((dy - 1) | 0), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()).getMinutes(), new Date(start.getFullYear() + ((dy - 1) | 0), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()).getSeconds(), new Date(start.getFullYear() + ((dy - 1) | 0), start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()).getMilliseconds());
                                dayCount.v = (Bridge.Date.subdd(end, startToo)).getDays();
                            }
                            else  {
                                if (dy >= 0 && dm > 0 && dd < 0) {
                                    yearCount.v = dy;
                                    monthCount.v = (dm - 1) | 0;
                                    dayCount.v = (Bridge.Date.subdd(end, new Date(new Date(start.getFullYear() + dy, start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()).getFullYear(), new Date(start.getFullYear() + dy, start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()).getMonth() + ((dm - 1) | 0), new Date(start.getFullYear() + dy, start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()).getDate(), new Date(start.getFullYear() + dy, start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()).getHours(), new Date(start.getFullYear() + dy, start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()).getMinutes(), new Date(start.getFullYear() + dy, start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()).getSeconds(), new Date(start.getFullYear() + dy, start.getMonth(), start.getDate(), start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds()).getMilliseconds()))).getDays();
                                }
                            }
                        }
                    }
                }
            }
        },
        dateList: null,
        dayList: null,
        config: {
            init: function () {
                this.startDate = new Date(-864e13);
                this.endDate = new Date(-864e13);
            }
        },
        constructor: function (start, end) {
            this.startDate = start;
            this.endDate = end;
            this.getDateList();
        },
        getDateList: function () {
            var startYear = this.startDate.getFullYear();
            var endYear = this.endDate.getFullYear();
            var yearCount = (((endYear - startYear) | 0) + 1) | 0;
            this.dayList = System.Array.init(yearCount, null);
    
            for (var i = 0; i < yearCount; i = (i + 1) | 0) {
                if ((new Date(((startYear + i) | 0), 2, -1).getDate() === 28)) {
                    this.dayList[i] = System.Array.init(366, 0);
                }
                else  {
                    this.dayList[i] = System.Array.init(365, 0);
                }
    
            }
    
            if (Bridge.Date.lt(Bridge.Date.today(), this.startDate)) {
                for (var d = new Date(startYear, 1 - 1, 1); Bridge.Date.lt(d, this.startDate); d = new Date(d.valueOf() + Math.round((1) * 864e5))) {
                    this.dayList[((d.getFullYear() - startYear) | 0)][((Math.ceil((d - new Date(d.getFullYear(), 0, 1)) / 864e5) - 1) | 0)] = Utilities.DayType.Na;
                }
                for (var d1 = this.startDate; Bridge.Date.lte(d1, this.endDate); d1 = new Date(d1.valueOf() + Math.round((1) * 864e5))) {
                    this.dayList[((d1.getFullYear() - startYear) | 0)][((Math.ceil((d1 - new Date(d1.getFullYear(), 0, 1)) / 864e5) - 1) | 0)] = Utilities.DayType.Demain;
                }
                for (var d2 = new Date(this.endDate.valueOf() + Math.round((1) * 864e5)); Bridge.Date.lt(d2, new Date(endYear, 12 - 1, 31)); d2 = new Date(d2.valueOf() + Math.round((1) * 864e5))) {
                    this.dayList[((d2.getFullYear() - startYear) | 0)][((Math.ceil((d2 - new Date(d2.getFullYear(), 0, 1)) / 864e5) - 1) | 0)] = Utilities.DayType.Na;
                }
            }
            if (Bridge.Date.lte(this.startDate, Bridge.Date.today()) && Bridge.Date.lte(Bridge.Date.today(), this.endDate)) {
                for (var d3 = new Date(startYear, 1 - 1, 1); Bridge.Date.lt(d3, this.startDate); d3 = new Date(d3.valueOf() + Math.round((1) * 864e5))) {
                    this.dayList[((d3.getFullYear() - startYear) | 0)][((Math.ceil((d3 - new Date(d3.getFullYear(), 0, 1)) / 864e5) - 1) | 0)] = Utilities.DayType.Na;
                }
                for (var d4 = this.startDate; Bridge.Date.lt(d4, Bridge.Date.today()); d4 = new Date(d4.valueOf() + Math.round((1) * 864e5))) {
                    this.dayList[((d4.getFullYear() - startYear) | 0)][((Math.ceil((d4 - new Date(d4.getFullYear(), 0, 1)) / 864e5) - 1) | 0)] = Utilities.DayType.Passe;
                }
                for (var d5 = Bridge.Date.today(); Bridge.Date.lte(d5, this.endDate); d5 = new Date(d5.valueOf() + Math.round((1) * 864e5))) {
                    this.dayList[((d5.getFullYear() - startYear) | 0)][((Math.ceil((d5 - new Date(d5.getFullYear(), 0, 1)) / 864e5) - 1) | 0)] = Utilities.DayType.Demain;
                }
                for (var d6 = new Date(this.endDate.valueOf() + Math.round((1) * 864e5)); Bridge.Date.lt(d6, new Date(endYear, 12 - 1, 31)); d6 = new Date(d6.valueOf() + Math.round((1) * 864e5))) {
                    this.dayList[((d6.getFullYear() - startYear) | 0)][((Math.ceil((d6 - new Date(d6.getFullYear(), 0, 1)) / 864e5) - 1) | 0)] = Utilities.DayType.Na;
                }
            }
            if (Bridge.Date.gt(Bridge.Date.today(), this.endDate)) {
                for (var d7 = new Date(startYear, 1 - 1, 1); Bridge.Date.lt(d7, this.startDate); d7 = new Date(d7.valueOf() + Math.round((1) * 864e5))) {
                    this.dayList[((d7.getFullYear() - startYear) | 0)][((Math.ceil((d7 - new Date(d7.getFullYear(), 0, 1)) / 864e5) - 1) | 0)] = Utilities.DayType.Na;
                }
                for (var d8 = this.startDate; Bridge.Date.lte(d8, this.endDate); d8 = new Date(d8.valueOf() + Math.round((1) * 864e5))) {
                    this.dayList[((d8.getFullYear() - startYear) | 0)][((Math.ceil((d8 - new Date(d8.getFullYear(), 0, 1)) / 864e5) - 1) | 0)] = Utilities.DayType.Passe;
                }
                for (var d9 = new Date(this.endDate.valueOf() + Math.round((1) * 864e5)); Bridge.Date.lt(d9, new Date(endYear, 12 - 1, 31)); d9 = new Date(d9.valueOf() + Math.round((1) * 864e5))) {
                    this.dayList[((d9.getFullYear() - startYear) | 0)][((Math.ceil((d9 - new Date(d9.getFullYear(), 0, 1)) / 864e5) - 1) | 0)] = Utilities.DayType.Na;
                }
            }
    
    
            var dayCount = (Bridge.Date.subdd(this.endDate, this.startDate)).getDays();
            this.dateList = new System.Collections.Generic.List$1(System.Int32)();
            for (var i1 = 0; i1 < dayCount; i1 = (i1 + 1) | 0) {
                this.dateList.add(i1);
    
            }
        }
    });
    
    Bridge.define('Utilities.DayType', {
        statics: {
            Na: 0,
            Passe: 1,
            Demain: 2
        },
        $enum: true
    });
    
    Bridge.define('Utilities.DrawDay', {
        width: 0,
        height: 0,
        blockWidth: 0,
        blockHeight: 0,
        gapWidth: 0,
        gapHeight: 0,
        dateCalculator: null,
        constructor: function (dateCalculator, imgWidth, imgHeight, blockWidth, blockHeight, gapWidth, gapHeight) {
            this.width = imgWidth;
            this.height = imgHeight;
            this.blockWidth = blockWidth;
            this.blockHeight = blockHeight;
            this.gapWidth = gapWidth;
            this.gapHeight = gapHeight;
            this.dateCalculator = dateCalculator;
        },
        getRGBAArray: function () {
            var result = System.Array.init(((((this.width * this.height) | 0) * 4) | 0), 0);
            var resultIndex = 0;
            var totalWidth = (this.blockWidth + this.gapWidth) | 0;
            var totalHeight = (this.blockHeight + this.gapHeight) | 0;
            for (var y = 0; y < this.height; y = (y + 1) | 0) {
                for (var x = 0; x < this.width; x = (x + 1) | 0) {
                    if ((x % totalWidth === 1 || x % totalWidth === 2 || x % totalWidth === 3) && (y % totalHeight === 2 || y % totalHeight === 3 || y % totalHeight === 4)) {
                        var a = (Bridge.Int.div(x, (((this.blockWidth + this.gapWidth) | 0)))) | 0;
                        var b = (Bridge.Int.div(y, (((this.blockHeight + this.gapHeight) | 0)))) | 0;
                        if (a < this.dateCalculator.dayList[b].length) {
                            if (this.dateCalculator.dayList[b][a] === Utilities.DayType.Na) {
                                result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 70;
                                result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 70;
                                result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 70;
                                result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 255;
                            }
                            else  {
                                if (this.dateCalculator.dayList[b][a] === Utilities.DayType.Passe) {
                                    result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 255;
                                    result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 0;
                                    result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 0;
                                    result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 255;
                                }
                                else  {
                                    if (this.dateCalculator.dayList[b][a] === Utilities.DayType.Demain) {
                                        result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 0;
                                        result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 0;
                                        result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 255;
                                        result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 255;
                                    }
                                }
                            }
    
    
                        }
                        else  {
                            result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 200;
                            result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 200;
                            result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 200;
                            result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 255;
                        }
    
                    }
                    else  {
                        result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 200;
                        result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 200;
                        result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 200;
                        result[Bridge.identity(resultIndex, (resultIndex = (resultIndex + 1) | 0))] = 255;
                    }
                }
            }
            return result;
        }
    });
    
    Bridge.init();
})(this);
