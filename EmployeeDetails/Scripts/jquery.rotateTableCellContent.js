(function ($) {
    $.fn.rotateTableCellContent = function (options) {
        /*
        Version 1.0
        7/2011
        Written by David Votrubec (davidjs.com) and
        Michal Tehnik (@Mictech) for ST-Software.com
        */
        var cssClass = ((options) ? options.className : false) || "vertical";
        var cellsToRotate = $('.' + cssClass, this);
       
        var betterCells = [];
        cellsToRotate.each(function () {
            var MaxHeight = 100;
            if ($(this).width() > MaxHeight) {
                MaxHeight = width;
            }
            var cell = $(this)
		  , newText = cell.text()
		  , height = cell.height()
		  , width = cell.width()
          , newDiv = $('<div style="margin:auto;line-height:' + (290) + 'px;height:' + 150 + 'px;width:' + (height) + 'px; max-width:15px !important">', { height: width + 40, width: height, })
		  //, newDiv = $('<div>', { height: 250 , width: 25,})
		  , newInnerDiv = $('<div >', { text: newText, 'class': 'rotated' });

            newDiv.append(newInnerDiv);

            betterCells.push(newDiv);
        });

        cellsToRotate.each(function (i) {
            $(this).html(betterCells[i]);
        });
    };
})(jQuery);

(function ($) {
    $.fn.rotateTableDrillCellContent = function (options) {
        /*
        Version 1.0
        7/2011
        Written by David Votrubec (davidjs.com) and
        Michal Tehnik (@Mictech) for ST-Software.com
        */
        var cssClass = ((options) ? options.className : false) || "vertical";
        var cellsToRotate = $('.' + cssClass, this);

        var betterCells = [];
        cellsToRotate.each(function () {
            var cell = $(this)
		  , newText = cell.text()
		  , height = cell.height()
		  , width = cell.width()
          , newDiv = $('<div style="margin:auto;line-height:' + (285) + 'px;height:' + 180 + 'px;width:' + (height) + 'px; max-width:15px !important">', { height: width + 40, width: 0, })
		  //, newDiv = $('<div>', { height: 225 , width: height,})
		  , newInnerDiv = $('<div">', { text: newText, 'class': 'rotated' });

            newDiv.append(newInnerDiv);

            betterCells.push(newDiv);
        });

        cellsToRotate.each(function (i) {
            $(this).html(betterCells[i]);
        });
    };
})(jQuery);