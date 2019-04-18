function accordion(id, option) {
    var p = document.getElementById(id);
    var user_default = { //默认配置
        width: 340,
        height: 340,
        small_width: 150,
        small_height: 40,
        time: 300
    }
    var a_option = Object.assign({}, user_default, option);
    if (a_option.col * a_option.row !== p.children.length) { //
        throw 'a_option.col*a_option.row' + p.children.length;
    }
    var time1 = new Date().getTime;
    var timer = null;
    p.style.width = a_option.width + a_option.small_width * (a_option.col - 1) + 'px'; //盒子的宽度 
    p.style.height = a_option.height + a_option.small_height * (a_option.row - 1) + 'px'; //盒子的高度
    var activation = function(index) {
        clearTimeout(timer);
        var time2 = new Date().getTime;
        if (time2 - time1 < a_option.time) {
            timer = setTimeout(function() {
                accordion(index);
            }, a_option.time);
            return false;
        }
        time1 = time2;
        var cx = index % a_option.col; //得到X轴的坐标
        var cy = Math.floor(index / a_option.col); //得到y轴的坐标
        for (var x = 0; x < a_option.col; x++) {
            for (var y = 0; y < a_option.row; y++) {
                var index_ = x + y * a_option.col;
                var item = p.children[index_];
                if (cx === x && cy === y) {
                    item.style.width = a_option.width + 'px';
                    item.style.height = a_option.height + 'px';
                } else if (cx === x) {
                    console.log(1);
                    item.style.width = a_option.width + 'px';
                    item.style.height = a_option.small_height + 'px';
                } else if (cy === y) {
                    console.log(1);
                    item.style.height = a_option.height + 'px';
                    item.style.width = a_option.small_width + 'px'
                } else {
                    console.log(1);
                    item.style.height = a_option.small_height + 'px';
                    item.style.width = a_option.small_width + 'px'
                }
            }
        }
    }
    activation(0);
    for (var i = 0; i < p.children.length; i++) {
        p.children[i].ind = i;
        p.children[i].style.transition = 'all ' + a_option.time + 'ms';
        p.children[i].onmouseover = function() {
            activation(this.ind);
            console.log(this.ind);
        }
    }
}