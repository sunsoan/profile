/**
 * Created by yakir on 2016/10/4.
 */

function draw_line() {
    var myChart = echarts.init(document.getElementById('line_fresh'));
    var data_o = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var sum_p = 0;
    option = {

        title: {
            text: '点击率',
            left: 'left',
            textStyle: {
                color: '#000'
            }
        },

        tooltip: {
            trigger: 'axis'
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name: '最高气温',
                type: 'line',
                data: data_o,

                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };


    setInterval(function () {

        $.get("get_status_data", function (data) {
            var sum_p = data['education'] + data['ability'] + data['experience'] + data['selfEval'];
            data_o.shift();
            data_o.push(sum_p);

        });


        myChart.setOption({
            series: [{
                data: data_o
            }]
        });
    }, 3000);


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}

draw_line();


function draw_pie() {

    var myChart = echarts.init(document.getElementById('pie_fresh'));

    var data_p = [
        {value: 1, name: '教育经历'},
        {value: 1, name: '个人经历'},
        {value: 1, name: '项目经验'},
        {value: 1, name: '自我评价'}
    ];
    option = {

        title: {
            text: '点击占比',
            left: 'left',
            textStyle: {
                color: '#000'
            }
        },


        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },


        series: [
            {
                name: '点击来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data_p,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }

            }
        ]
    };


    setInterval(function () {

        $.get("get_status_data", function (data) {
            data_p = [
                {value: data['education'], name: '教育经历'},
                {value: data['ability'], name: '个人经历'},
                {value: data['experience'], name: '项目经验'},
                {value: data['selfEval'], name: '自我评价'}

            ].sort(function (a, b) {
                return a.value - b.value
            });


        });


        myChart.setOption({
            series: [{
                data: data_p
            }]
        });
    }, 3000);


    myChart.setOption(option);

}

draw_pie();


$(function () {
    var Accordion = function (el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;

        // Variables privadas
        var links = this.el.find('.item-header');
        // Evento
        links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
    }

    Accordion.prototype.dropdown = function (e) {
        var $el = e.data.el;
        $this = $(this),
            $next = $this.next();

        $next.slideToggle(200);
        ajax_url = "/status/" + $this.attr("id");
        $.ajax({url: ajax_url, async: false});

    }

    var accordion = new Accordion($('#profile-content'), false);
});

