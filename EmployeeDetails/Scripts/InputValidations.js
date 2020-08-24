function EmailValidation(ele) {
    var value = $(ele).val();
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var isValid = regex.test(value);
    if (value.length > 0) {
        if (isValid == false) {
            $('#' + ele.id).addClass("RequiredFields");
        }
        else {
            $('#' + ele.id).removeClass("RequiredFields");
        }
    }
    return isValid;
}
function AllowOnlyNumbers(evt) {
    var e = window.event.keyCode;
    if ((e >= 48 && e <= 57) || ((e >= 96 && e <= 105)) || e == 46 || e == 8 || e == 9) {
        return true;
    }
    else {
        return false;
    }
}
function AllowOnlyDecimalNumbers(evt) {
    var e = window.event.keyCode;
    var regex = /^\d*[\.\,]?\d*$/;
    var value = (evt.value + String.fromCharCode(e));
    var isValid = regex.test(value);
    return isValid;
}
function RestrictCharacters() {
    if (window.event.keyCode != 16) {
        //alert(window.event.keyCode);
    }
    if ((window.event.keyCode >= 65) && (window.event.keyCode <= 90)) {
        return false;
    }
    else {
        return true;
    }
}

function ValidateTelephoneNumbers(ele) {
    var value = $(ele).val();
    var regex = /^[0-9-+]+$/;
    var isValid = regex.test(value);
    if (value.length > 0) {
        if (isValid == false) {
            $('#' + ele.id).addClass("RequiredFields");
        }
        else {
            $('#' + ele.id).removeClass("RequiredFields");
        }
    }
}

function AllowOnlyText(evt) {

}

function ShowDatePicker(evt) {
    $('#' + evt.id).datetimepicker({
        yearOffset: 00,
        timepicker: false,
        format: 'd/m/Y',
        formatDate: 'Y/m/d',
        closeOnDateSelect: true
    });
}

function Clearborder(ele, Mandatory) {
    //alert(Mandatory);
    if (Mandatory == 'True') {
        var value = $(ele).val();
        if (value.trim() == "") {
            $('#' + ele.id).addClass("RequiredFields");
            $('#' + ele.id).val("");
        }
        else {
            $('#' + ele.id).removeClass("RequiredFields");
        }
    }
}

function ClearDropDownborder(ele) {
        var value = $(ele).val();
        if (value == 0) {
            $('#' + ele.id).addClass("RequiredFields");
        }
        else {
            $('#' + ele.id).removeClass("RequiredFields");
        }
}
function AllowOnlyDateTime() {
    if (window.event.keyCode != 9) {
        return false;
    }
}
function ShowSuccessMsg(msg) {
    if (msg.trim() != "") {
        $.notify({
            title: '<strong>Success:</strong>',
            message: msg,
            placement: {
                from: 'top',
                align: 'center'
            }
        },{
            type: 'success',
            delay:1000,
            placement: {
                from: 'top',
                align: 'center'
            }
        });
    }
}
function ShowErrorMsg(msg) {

    if (msg!= undefined && msg.trim() != "") {
        $.notify({
            title: '<strong>Error:</strong>',
            message: msg,
            placement: {
                from: 'top',
                align: 'center'
            }
        }, {
            type: 'danger',
            placement: {
                from: 'top',
                align: 'center'
            }
        });
    }
}

