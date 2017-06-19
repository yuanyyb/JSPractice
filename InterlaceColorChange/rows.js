window.onload = function(){
    var oUl = document.getElementById('rows');
    var colorArray = ['red','yellow','green','white','black'];
    for(var i=0;i<50;i++){
        oUl.innerHTML += '<li style="background:'+colorArray[i%colorArray.length]+'"></li>';
    }
    var aLi = oUl.getElementsByTagName('li');
    for(var j=0;j<aLi.length;j++){
        aLi[j].onmouseover = function(){
            this.oldColor = this.style.backgroundColor;
            this.style.backgroundColor = 'pink';
        };
        aLi[j].onmouseout = function(){
            
            if(this.clickColor&&this.clickColor!=''){
                this.style.backgroundColor = 'blue';
            }else{
                this.style.backgroundColor = this.oldColor;
            }
        };
        aLi[j].onclick = function(){
            if(this.clickColor&&this.clickColor!=''){
                this.clickColor='';
                this.style.backgroundColor = this.oldColor;
            }else{
                this.clickColor='blue';
                this.style.backgroundColor = 'blue';
            }
            
        };
    }


};