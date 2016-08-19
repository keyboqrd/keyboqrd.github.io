       $(document).ready(function () {
            setit();
            $(window).resize(function (event) {
                setit();
            });
        });

        function setit (){
            var wi = $(window).width() - 20;
            var hi = $(window).height() - 20;

			imgHolder.width = wi;
			imgHolder.height = hi;
			var context = imgHolder.getContext('2d');
			var imgData = context.getImageData(0, 0, wi, hi);
			var array = getArray(wi, hi, 25, 100)
			imgData.data.set(array);
			context.putImageData(imgData, 0, 0);
        }
        
		function getArray(width, height, thisYear, yearCount){
			var arr = new Uint8Array(width * height * 4);
			i = 0;
			while(i < width * height * thisYear / yearCount  ){
				arr[i*4] = 200;
				arr[i*4+1] = 0;
				arr[i*4+2] = 0;
				arr[i*4+3] = 255;
				i++;
			}
			
			for(; i < width * height; i++){
				arr[i*4] = 0;
				arr[i*4+1] = 0;
				arr[i*4+2] = 200;
				arr[i*4+3] = 255;
			
			}
			return arr;
			
		}
		