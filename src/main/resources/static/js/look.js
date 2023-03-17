var pageNum = 1;
var pageSize = 4;
var totalPage = 0;
var totalCount = 0;
$(function () {
    findAllPropertyByPage(pageNum,pageSize);
// 分页查询产品信息
    function findAllPropertyByPage(pn, ps) {
        $.ajax({
            type: "GET",
            url: "/property",
            data: {
                "pageNum": pn,
                "pageSize": ps
            },
            statusCode: {
                200: function (pageInfo) {
                    $("#rbody").empty();
                    for (var i = 0; i < pageInfo.list.length; i++) {
                        /* 定义一个p集合*/
                        var p = pageInfo.list[i];
                        var $tr = $("<tr></tr>").append("<td>" + p.id + "</td>").append("<td>" + p.name + "</td>")
                            .append("<td>" + p.address + "</td>").append("<td>" + p.processingTime + "</td>").append("<td>" + p.number + "</td>")
                            .append("<td>" + p.cases + "</td>").append("<td>" + p.stand + "</td>").append("<td>" + p.unitNumber + "</td>")
                            .append("<td>" + p.typeOfRight + "</td>").append("<td>" + p.natureOfRight + "</td>").append("<td>" + p.purpose + "</td>")
                            .append("<td>" + p.usableArea + "</td>").append("<td>" + p.coveredArea + "</td>")
                            .append("<td>" + p.structure + "</td>").append("<td>" + p.totalFloors + "</td>")
                            .append("<td>" + p.storyNumber + "</td>").append("<td>" + p.privateUseArea + "</td>")
                            .append("<td>" + p.exclusiveAcreage + "</td>").append("<td>" + p.mjft + "</td>")
                            .append("<td>" + p.exclusiveFloorSpace + "</td>").append("<td>" + p.apportionedFloorSpace + "</td>")
                            .append("<td>" + p.registrationTime + "</td>").append("<td>" + p.lifeSpan + "</td>")
                            .append("<td>" + p.abbreviation + "</td>")


                            .append("<td><a href='#'>修改</a> | <a href='#'>删除</a></td>");
                        $("#rbody").append($tr);

                        $("#rbody").append($tr);
                        $tr.find("a:first").on("click", function () {
                            //调用下面的修改方法
                            updateProperty($(this));
                        })
                        $tr.find("a:last").on("click", function () {
                            deleteById($(this));
                        })
                    }

                    // 将计算当前页号,每页记录数,总页数,总记录数的结果赋值给js文件的属性.
                    pageNum = pageInfo.pageNum;
                    pageSize = pageInfo.pageSize;
                    totalPage = pageInfo.pages;
                    totalCount = pageInfo.total;

                    // 将属性值显示到页面上.
                    $("#totalCount").html(totalCount);
                    $("#totalPage").html(totalPage);
                    $("#pageNum").html(pageNum);


                    $("#pagination").empty();
                    var $back = $("<a class='icon item'><i class='left chevron icon'></i></a>");
                    $("#pagination").append($back);

                    for (var i = 0; i < pageInfo.navigatepageNums.length; i++) {
                        var $pageIndex = $("<a class='item'>" + pageInfo.navigatepageNums[i] + "</a>");
                        if (pageInfo.navigatepageNums[i] == pageNum) {
                            $pageIndex.addClass("active");
                        }
                        $("#pagination").append($pageIndex);
                        //  页号对应的事件处理
                        $pageIndex.on("click", function () {
                            findAllPropertyByPage($(this).html(), pageSize);
                        });
                    }


                    var $next = $("<a class='icon item'><i class='right chevron icon'></i></a>");
                    $("#pagination").append($next);

                    //  上一页事件处理
                    $back.on("click", function () {
                        if (pageNum > 1) {
                            findAllPropertyByPage(pageNum - 1, pageSize);
                        }
                    });

                    //  下一页事件处理
                    $next.on("click", function () {
                        if (pageNum < totalPage) {
                            findAllPropertyByPage(pageNum + 1, pageSize);
                        }
                    });
                },
                404: function () {

                },
                500: function () {
                    alert("服务器内部错误");
                    return false;
                }
            }
        });
    }
})
