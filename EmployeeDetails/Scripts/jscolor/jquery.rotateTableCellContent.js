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
            var cell = $(this)
		  , newText = cell.text()
		  , height = cell.height()
		  , width = cell.width()
          , newDiv = $('<div style="margin:0px auto;line-height:' + (width + 130) + 'px;height:' + (width + 40) + 'px;width:' + (height) + 'px">', { height: width + 40, width: height, })
		  //, newDiv = $('<div>', { height: 225 , width: height,})
		  , newInnerDiv = $('<div>', { text: newText, 'class': 'rotated' });

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
          , newDiv = $('<div style="margin:0px auto;line-height:' + (width + 150) + 'px;height:' + (width + 40) + 'px;width:' + 0 + 'px">', { height: width + 40, width: 0, })
		  //, newDiv = $('<div>', { height: 225 , width: height,})
		  , newInnerDiv = $('<div>', { text: newText, 'class': 'rotated' });

            newDiv.append(newInnerDiv);

            betterCells.push(newDiv);
        });

        cellsToRotate.each(function (i) {
            $(this).html(betterCells[i]);
        });
    };
})(jQuery);