window.onload = function(){
    sss("11111");
        var aLi = document.getElementsByTagName('li');
        for(var i=0;i<aLi.length;i++){
            aLi[i].index = i;

            aLi[i].onclick = function(){
                for(var j=0;j<aLi.length;j++){
                    aLi[j].checked='';
                }
                for(var i=0;i<=this.index;i++){
                    aLi[i].className='active';
                    aLi[i].checked = '1';
                }
            };

            aLi[i].onmouseover = function(){
                for(var j=0;j<aLi.length;j++){
                    aLi[j].className='';
                }
                for(var i=0;i<=this.index;i++){
                    aLi[i].className='active';
                }
            };
            aLi[i].onmouseout = function(){
                for(var i=0;i<aLi.length;i++){
                    if(aLi[i].checked!='1'){
                        aLi[i].className='';
                    }else{
                        aLi[i].className="active";
                    }
                }
            };
        }
    };

    function sss(ddd){
        alert(ddd);
    }