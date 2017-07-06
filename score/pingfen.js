window.onload = function() {
    var aLi = document.getElementsByTagName('li');
    var oDiv = document.getElementById('content');
    var oSpan = oDiv.getElementsByTagName('span')[0];
    for (var i = 0; i < aLi.length; i++) {
        aLi[i].index = i;

        aLi[i].onclick = function() {
            for (var j = 0; j < aLi.length; j++) {
                aLi[j].checked = '';
            }
            for (var i = 0; i <= this.index; i++) {
                if (this.index < 2) {
                    aLi[i].className = 'chaactive';
                    aLi[i].checked = '1';
                } else {
                    aLi[i].className = 'active';
                    aLi[i].checked = '1';
                }

            }
        };

        aLi[i].onmouseover = function() {
            for (var i = 0; i <= this.index; i++) {
                aLi[i].className = 'active';
            }
            for (var j = aLi.length - 1; j > this.index; j--) {
                aLi[j].className = '';
            }
            if (this.index < 2) {
                for (var i = 0; i <= this.index; i++) {
                    aLi[i].className = 'chaactive';
                }
            }
            showLevel(this.index);
        };
        aLi[i].onmouseout = function() {
            //this.className='';
            var j = 0;
            for (var i = 0; i < aLi.length; i++) {
                if (aLi[i].checked && aLi[i].checked == '1') {
                    showLevel(i);
                    aLi[i].className = "active";
                    j++;
                } else {
                    aLi[i].className = '';
                }
            }

            if (j <= 2) {
                for (var m = 0; m < j; m++) {
                    aLi[m].className = 'chaactive';
                }
            }

        };
    }

    function showLevel(num) {
        if (num < 2) {
            oSpan.innerHTML = '差';
            aLi[num].className = 'chaactive';
        } else if (num == 2) {
            oSpan.innerHTML = '中';
            aLi[0].className = 'active';
            aLi[1].className = 'active';
        } else if (num == 3) {
            oSpan.innerHTML = '良';
        } else if (num == 4) {
            oSpan.innerHTML = '优';
        }



    }
};