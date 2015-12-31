var validEmail = false
var validPhone = false

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function isPhone(phone) {
  var regex = /^([0-9 .()-]{10,25})/;
  return regex.test(phone);
}

function disableSubmit(){
  $("input[type=submit]").attr('disabled','disabled');
  $("input[type=submit]").attr('class','button-secondary');
}

function enableSubmit(){
  $("input[type=submit]").removeAttr('disabled');
  $("input[type=submit]").attr('class','button-primary');
}

function emailEvent(){
    if(isEmail($(this).val())) {
      $(this).next().hide();
      validEmail = true;
    } else {
      $(this).next().show("slow");
      validEmail = false;
    }
}
function phoneEvent(){
    if(isPhone($(this).val())) {
      $(this).next().hide();
validPhone= true;
    } else {
      $(this).next().show("slow");
validPhone = false;
    }
}

function checksubmit(){
  if (validEmail) {
    if (validPhone) {
      enableSubmit();
    } else {
      disableSubmit();
    }
  } else {
      disableSubmit();
    }
}


enableSubmit();
disableSubmit();

$("#email").keyup(emailEvent).keyup(checksubmit);

$("#phone").keyup(phoneEvent).keyup(checksubmit);
