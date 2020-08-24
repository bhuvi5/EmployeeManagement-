var popupopen = 0;
var entity = false;
function popUPClose() {
    $("#DialogDropDown").hide();
    HideDialog();
}
function Openpopup(ele) {
    var elm = $(ele);
    var screen = this;
    var offset = elm.offset(), top = offset.top + ele.offsetHeight - 1, left = offset.left;
    if (top + ele.offsetHeight > $(window).height() + $(window).scrollTop())
        top = offset.top - ele.offsetHeight + 1;
    if (top < 0)
        top = 0;
    if (left + ele.offsetWidth > $(window).width())
        left = offset.left - ele.offsetWidth + ele.offsetWidth;
    var reportMsgPosition = elm.offset();
    if (popupopen == 0) {
        if (reportMsgPosition.top != undefined) {
            $("#dialog").css({
                position: "absolute",
                top: top - 127, left: left,
                marginTop: 0, marginLeft: 0, width: ele.clientWidth
            });
            document.getElementById("POPUp").className = "DivImage";
            $("#dialog").show();
            popupopen = 1;
        }
    }
    return false;
}

function ShowDialog() {
    popupopen = 0;
    $("#dialog").show();
    HideAddrsDialog();
}

function HideDialog() {
    $("#DialogDropDown").hide();
    $("#dialog").hide();
    popupopen = 1;
    //$('EntitySearchTable').html("");
}
var ControlID = "";
function onTextChange(evt, ID) {
    ControlID = evt.id;
    popupopen = 0;
    NavigateTable(0);
    $('#LoadSearchTable').jtable('load', {
        Search: $("#" + evt.id).val(),
        ParentID: ID,
        Entity: false
    });
    Openpopup(evt);
}
function RowClick(id, Description) {
    if (entity == false) {
        $("#" + ControlID).val(Description);
        $("#id_" + ControlID).val(id);
        $('#' + ControlID).removeClass("RequiredFields");
    }   
    else {
        var ctrlHdnID = ControlID.replace('txt', 'hdn');
        $('#'+ControlID).val(Description);
        $('#' + ctrlHdnID).val(id);
        $('#' + ControlID).removeClass("RequiredFields");
    }
    HideDialog();
    return false;
}
var count = 0;

function SearchText(evt, ID) {
    entity = false;
    if (window.event.keyCode == 40 || window.event.keyCode == 38) {
        NavigateTable(count);
    }
    else {
        if (window.event.keyCode != 13) {
            onTextChange(evt, ID);
        }
        count = 0;
    }
}

function EntitySearch(evt) {
    ControlID = evt.id;
    entity = true;
    if (window.event.keyCode == 40 || window.event.keyCode == 38) {
        NavigateTable(count);
    }
    else {
        if (window.event.keyCode != 13) {
            popupopen = 0;
            $('#LoadSearchTable').jtable('load', {
                Search: $("#" + evt.id).val(),
                ParentID: 0,
                Entity: true
            });
            Openpopup(evt);
        }
        count = 0;
    }
}

function RowCount() {
    var rowcount = 0;
    $(".popupdiv").each(function () {
        rowcount++;
    });
    return rowcount;
}
function NavigateTable(count) {
    var i = 1;
    $(".popupdiv").each(function () {
        if (count == i) {
            $(this).addClass("activeRow")
        }
        else {
            $(this).removeClass("activeRow")
        }
        i++;
    });
    if (count >= 1) {
        $(".activeRow").each(function () {
            if (entity == false) {
                $("#" + ControlID).val(($(this).children().html()));
                $("#id_" + ControlID).val(($(this).children().next().val()));
            }
            else {
                $("#" + ControlID).val(($(this).children().html()));
                $("#hdn" + ControlID).val(($(this).children().next().val()));
                }
        });
    }
}

function UpDownEvent(evt) {
    switch (window.event.keyCode) {
        case 13: // enter
            $(".activeRow").each(function () {
                $(this).click();
                HideDialog();
            });
            break;
        case 38:
            if (count > 1) {
                count--;
            }
            break;
        case 40:
            if (count < RowCount()) {
                count++;
            }
            break;
        case 9:
            $(".activeRow").each(function () {
                $(this).click();
                HideDialog();
            });
            CheckClient();
            break;
    }
}
$(document).ready(function () {
    $('jtable-page-number-first').hide();
});



