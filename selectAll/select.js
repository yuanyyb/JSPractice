// window.onload = function() {
//     var allTr = document.getElementsByTagName('tr');
//     for (var i = 0; i < allTr.length; i++) {
//         allTr[i].index = i;
//         allTr[i].onmouseover = function() {
//             this.className = "trchecked";
//         };
//         allTr[i].onmouseout = function() {
//             for (var j = 0; j < allTr.length; j++) {
//                 allTr[j].className = '';
//                 if (allTr[j].clicked && allTr[j].clicked == '1') {
//                     allTr[j].className = 'trchecked';
//                 }
//             }
//         };
//         allTr[i].onclick = function() {
//             for (var i = 0; i < allTr.length; i++) {
//                 allTr[i].className = "";
//                 allTr[i].clicked = "";
//             }
//             this.clicked = '1';
//             this.className = 'trchecked';
//         };
//     }

//     var oCheckAll = document.getElementById('checkall');
//     var allCheck = document.getElementById('content').getElementsByTagName('tbody')[0].getElementsByTagName('input');

//     oCheckAll.onchange = function() {

//         if (this.checkAll && this.checkAll == '1') {
//             this.checkAll = '';
//             for (var j = 0; j < allCheck.length; j++) {
//                 allCheck[j].checked = false;
//             }
//         } else {
//             this.checkAll = '1';
//             for (var j = 0; j < allCheck.length; j++) {
//                 allCheck[j].checked = true;
//             }
//         }

//     };
// };

// window.onload = function() {
//     var items = ['sssss', '333333'];
//     var itemsstr = items;
//     items.push('wwwwww');
//     items = ['eeeee', '44444', '32dddg'];
//     console.log(items);
//     console.log(itemsstr);
// };

// window.onload = function() {  //字符串拼接，每次产生新的字符串值
//     var items = 'test';
//     var itemsstr = items;
//     items += 'ing';

//     console.log(items);
//     console.log(itemsstr);
// };
// window.onload = function() {
//     function setFoo(fooInput) {
//         this.foo = fooInput;
//     }
//     var foo = 5;
//     console.log(foo);
//     var obj = {
//         foo: 10
//     };
//     console.log(obj.foo);
//     setFoo(15);
//     console.log(foo);
//     obj.setFoo = setFoo;
//     obj.setFoo(20);
//     console.log(obj.foo);


// };
window.onload = function() {
    function changeColor(color) {
        this.style.color = color;
    }
    //changeColor('white');
    var main = document.createElement('div');
    changeColor.call(main, 'red');
    console.log(main.style.color);

    function SetBodyColor() {
        changeColor.apply(document.body, arguments);
    }
    SetBodyColor('blue');
    console.log(document.body.style.color);

}