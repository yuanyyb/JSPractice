window.onload = function(){
    var allTr = document.getElementsByTagName('tr');
    for(var i=0;i<allTr.length;i++){
        allTr[i].index = i;
        allTr[i].onmouseover = function(){
            this.className = "trchecked";
        };
        allTr[i].onmouseout = function(){
            for(var j=0;j<allTr.length;j++){
                allTr[j].className='';
                if(allTr[j].clicked&&allTr[j].clicked=='1'){
                    allTr[j].className='trchecked';
                }
            }
        };
        allTr[i].onclick = function(){
            for(var i=0;i<allTr.length;i++){
                allTr[i].className = "";
                allTr[i].clicked="";
            }
            this.clicked = '1';
            this.className = 'trchecked';
        };
    }

    var oCheckAll = document.getElementById('checkall');
    var allCheck = document.getElementById('content').getElementsByTagName('tbody')[0].getElementsByTagName('input');
    
    oCheckAll.onchange = function(){
        
        if(this.checkAll&&this.checkAll=='1'){
            this.checkAll = '';
            for(var j = 0;j<allCheck.length;j++){
            allCheck[j].checked = false;
            }
        }else{
            this.checkAll = '1';
            for(var j = 0;j<allCheck.length;j++){
            allCheck[j].checked = true;
            }
        }
        
    };
};

