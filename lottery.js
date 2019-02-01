var alleight = [];
var various = [];
var allthree = [];
var win = 0;
var times = 0;


//增加增設六獎的輸入欄位
function add_blank(){
    var now_inputs = document.getElementsByName('sixthprize').length;

    var new_input = document.createElement('input');
    new_input.setAttribute('type', 'text');
    new_input.setAttribute('name', 'sixthprize');
    new_input.setAttribute('class', 'prize_input form-control');
    new_input.setAttribute('id', 'sixthprize' + now_inputs);

    document.getElementById('other3').innerHTML += '<br>';
    document.getElementById('other3').appendChild(new_input);
}


//把input元素的數值依序填入陣列
function array_fillin(ary, name){
    for(let i = 0; i < document.getElementsByName(name).length; i++){
        let theval = document.getElementById(name+i).value;
        ary.push(theval.toString());
    }
    return ary
}


function input_check(...args){
    var check_point = 0
    var the_correct_number = /^\d{8}$/;
    for(let i = 0; i < arguments.length; i++){
        var c = document.getElementById(arguments[i]);
        if(!c.value.match(the_correct_number)){
            console.log(c.value);
            console.log(arguments[i]);
            c.style.borderColor = 'red';
            c.value = '請輸入正確的統一發票號碼(8碼)';
            check_point++;
        }
    }
    return check_point;
}





//建立當期獎號的陣列
function serial_init(){
    alleight.length = 0;
    various.length = 0;
    allthree.length = 0;
    //每次點擊時先清空陣列

    alleight = array_fillin(alleight, 'special');
    various = array_fillin(various, 'headprize');
    allthree = array_fillin(allthree, 'sixthprize');
    console.log(alleight, various, allthree);


    if(input_check('special0', 'special1', 'headprize0', 'headprize1', 'headprize2') == 0){
        document.getElementById('SSR_p').innerHTML = alleight[0];
        document.getElementById('SR_p').innerHTML = alleight[1];

        var heads = "";
        for(let i = 0; i < various.length; i++){
            if(i != allthree.length - 1){
                heads = heads + various[i] + '<hr>';
            }
            else{
                heads = heads + various[i];
            }
        }
        document.getElementById('Head_p').innerHTML = heads;

        var sixths = "";
        for(let i = 0; i < allthree.length; i++){
            if(i != allthree.length - 1){
                sixths = sixths + allthree[i] + '<hr>';
            }
            else{
                sixths = sixths + allthree[i];
            }
        }
        document.getElementById('Six_p').innerHTML = sixths;
        
        var brd = document.getElementById("floatboard");
        brd.style.display = 'none';
    }

}


function brd_visible(){
    document.getElementById('other3').remove();

    var new_div = document.createElement('div');
    new_div.setAttribute('id', 'other3');
    document.getElementById('all3').appendChild(new_div);

    var brd = document.getElementById("floatboard");
    brd.style.display = 'block';
}


function brd_unvisible(){
    var brd = document.getElementById("floatboard");
    brd.style.display = 'none';
}


function clear_all(){
    alleight.length = 0;
    various.length = 0;
    allthree.length = 0;
    document.getElementById('SSR_p').innerHTML = "";
    document.getElementById('SR_p').innerHTML = "";
    document.getElementById('Head_p').innerHTML = "";
    document.getElementById('Six_p').innerHTML = "";
}

function clear_form(){
    var inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
    console.log(inputs);
}




//檢查特別獎、特獎
function allcheck(prizeary, trys, result){
    if(trys == prizeary[0]){
        result.innerHTML = "你中了特別獎(8碼全中) >>>>> " + prizeary[0] + "<br><br>獎金10,000,000元";
        win = 1;
    }
    if(trys == prizeary[1]){
        result.innerHTML = "你中了特獎(8碼全中) >>>>> " + prizeary[1] + "<br><br>獎金2,000,000元";
        win = 1;
    }
}


//檢查六獎
function checklast3(prizeary, trys, result){
    for(var elee in prizeary){
        var counter = 0;
        for(let i = 2; i >= 0; i--){
            if(trys[(i+5)] == prizeary[elee][i]){
                counter++;
            }
            else{
                break;
            }
            console.log(trys[(i+5)], prizeary[elee][i], counter);
        }
        console.log(prizeary[elee]);
        if(counter == 3){
            result.innerHTML = "你中了六獎(末3碼) >>>>> " + prizeary[elee] + "<br><br>獎金200元";
            win = 1;
        }
    }
}


//檢查頭獎與其他獎項(從全部8碼檢查至末3碼)
function variouscheck(headprizeary, trys, result){
    for(var elev in headprizeary){
        var counter = 0;
        for(let i = 7; i >= 0; i--){
            if(trys[i] == headprizeary[elev][i]){
                counter++;
            }
            else{
                break;
            }
        }

        switch(counter){
            case 8:
                result.innerHTML = "你中了頭獎(8碼全中) >>>>> " + headprizeary[elev] + "<br><br>獎金200,000元";
                win = 1;
                break;
            case 7:
                result.innerHTML = "你中了二獎(末7碼) >>>>> " + headprizeary[elev] + "<br><br>獎金40,000元";
                win = 1;
                break;
            case 6:
                result.innerHTML = "你中了三獎(末6碼) >>>>> " + headprizeary[elev] + "<br><br>獎金10,000元";
                win = 1;
                break;
            case 5:
                result.innerHTML = "你中了四獎(末5碼) >>>>> " + headprizeary[elev] + "<br><br>獎金4,000元";
                win = 1;
                break;
            case 4:
                result.innerHTML = "你中了五獎(末4碼) >>>>> " + headprizeary[elev] + "<br><br>獎金1,000元";
                win = 1;
                break;
            case 3:
                result.innerHTML = "你中了六獎(末3碼) >>>>> " + headprizeary[elev] + "<br><br>獎金200元";
                win = 1;
                break;
            default:
                break;
        }
    }
}


//發票號碼對獎按鈕點擊後觸發此函式
function gostart(){
    win = 0;
    //清除前次結果

    var tryer = document.getElementById("num").value;
    var result = document.getElementById("result");
    console.log(alleight, various, allthree);
    console.log(tryer);

    if(!tryer.match(/^\d{8}$/)){
        alert("請輸入正確的發票號碼");
    }
    else{
        allcheck(alleight, tryer, result);
        checklast3(allthree, tryer, result);
        variouscheck(various, tryer, result);

        if(win == 0){
            ++times;
            document.getElementById("coment").innerHTML = "你沒有中獎QQ * " + times;
            document.getElementById("coment").style.display = 'block';
            result.innerHTML = "";
            result.style.display = 'none';
        }
        else{
            result.style.display = 'block';
            document.getElementById("coment").style.display = 'none';
            document.getElementById("coment").innerHTML = "";
            times = 0;
        }
    }
    console.log(result);
    //確認發票號碼格式無誤後才開始兌獎

    
}



var form_inputs = document.getElementsByClassName('prize_input');
for(let i = 0; i < form_inputs.length; i++){
    form_inputs[i].addEventListener("focus", function(event) {
        event.preventDefault();
        form_inputs[i].value = "";
    });

    form_inputs[i].addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            form_inputs[i].blur();
            console.log("押されたキーのコード : " + event.keyCode);
        }
    });

}

document.getElementById("num").addEventListener("focus", function(event) {
    event.preventDefault();
    document.getElementById("num").value = "";
});

document.getElementById("num").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("num").blur();
    console.log("押されたキーのコード : " + event.keyCode);
  }
});


