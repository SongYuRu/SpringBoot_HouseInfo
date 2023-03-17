var pageNum = 1;
var pageSize = 4;
var totalPage = 0;
var totalCount = 0;
var deleteRow = null;
var updateRow = -1;

//页面加载就会调用操作
$(function () {
    findUserName(); //右上角显示用户名
    findAllPropertyByPage(pageNum, pageSize);

// 添加信息的事件处理
    $("#saveBtn").on("click", function () {
        if (updateRow == -1) {
            $.ajax({
                type: "POST",
                /* 一个用来包含发送请求的URL字符串。默认为当前页地址。*/
                url: "/property",
                data: {
                    "name": $("#name").val(),
                    "address": $("#address").val(),
                    "processingTime": $("#processingTime").val(),
                    "number": $("#number").val(),
                    "cases": $("#cases").val(),
                    "stand": $("#stand").val(),
                    "unitNumber": $("#unitNumber").val(),
                    "typeOfRight": $("#typeOfRight").val(),
                    "natureOfRight": $("#natureOfRight").val(),
                    "purpose": $("#purpose").val(),
                    "usableArea": $("#usableArea").val(),
                    "coveredArea": $("#coveredArea").val(),

                    "structure": $("#structure").val(),
                    "totalFloors": $("#totalFloors").val(),
                    "storyNumber": $("#storyNumber").val(),
                    "privateUseArea": $("#privateUseArea").val(),
                    "exclusiveAcreage": $("#exclusiveAcreage").val(),
                    "mjft": $("#mjft").val(),
                    "exclusiveFloorSpace": $("#exclusiveFloorSpace").val(),

                    "apportionedFloorSpace": $("#apportionedFloorSpace").val(),
                    "registrationTime": $("#registrationTime").val(),
                    "lifeSpan": $("#lifeSpan").val(),
                    "abbreviation": $("#abbreviation").val(),


                },
                statusCode: {
                    201: function () {
                        alert("添加信息成功");
                        $(location).attr("href", "/home.html");
                        return false;
                    },
                    500: function () {
                        alert("添加信息失败，请重新添加");
                        $(location).attr("href", "/home.html");
                        return false;
                    }
                }
            })
        }
    })
    // 修改信息的事件处理
    $("#update").on("click", function () {
        $.ajax({
            type: "PUT",
            url: "/property",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            data: JSON.stringify({
                id: updateRow,
                name: $("#name1").val(),
            }),
            statusCode: {
                204: function () {
                    alert("修改成功");
                    $('#propertyModal1').modal('hide');
                    location.reload();
                },
                500: function () {
                    alert("服务器内部错误");
                    return false;
                }
            }
        })
    })
})
//显示用户名(后端)
function findUserName() {
    $.ajax({
        type: "GET",
        url: "/login",
        statusCode: {
            200: function (user) {
                $("#usernameHint").html(user.username);
                return false;
            },
            404: function () {
                alert("请登录后再访问.");
                $(location).attr("href", "/login.html");
                return false;
            },
            500: function () {
                alert("服务器内部错误");
                $(location).attr("href", "/login.html");
                return false;
            }
        }
    });

}


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


// 添加&修改产品
function updateProperty(row) {
    var $tr = row.parent().parent();
    // var name = $tr.children(":eq(1)").html();
    // var address = $tr.children(":eq(2)").html();
    // var processingTime = $tr.children(":eq(3)").html();
    // var number = $tr.children(":eq(4)").html();
    // var cases = $tr.children(":eq(5)").html();
    // var stand = $tr.children(":eq(6)").html();
    // var unitNumber= $tr.children(":eq(7)").html();
    // var typeOfRight = $tr.children(":eq(8)").html();
    // var natureOfRight = $tr.children(":eq(9)").html();
    // var purpose = $tr.children(":eq(10)").html();
    // var usableArea = $tr.children(":eq(11)").html();
    // var coveredArea = $tr.children(":eq(12)").html();
    //
    // var structure = $tr.children(":eq(13)").html();
    // var totalFloors = $tr.children(":eq(14)").html();
    // var storyNumber = $tr.children(":eq(15)").html();
    // var privateUseArea = $tr.children(":eq(6)").html();
    // var exclusiveAcreage = $tr.children(":eq(17)").html();
    // var mjft= $tr.children(":eq(18)").html();
    // var exclusiveFloorSpace = $tr.children(":eq(19)").html();
    // var apportionedFloorSpace = $tr.children(":eq(20)").html();
    // var registrationTime = $tr.children(":eq(21)").html();
    // var lifeSpan = $tr.children(":eq(22)").html();
    // var abbreviation = $tr.children(":eq(23)").html();

    var name = $tr.children(":eq(1)").html();

    updateRow = $tr.children(":eq(0)").html();


    $("#name1").val(name);
    // $("#address").val(address);
    // $("#processingTime").val(processingTime);
    // $("#number").val(number);
    // $("#cases").val(cases);
    // $("#stand").val(stand);
    // $("#unitNumber").val(unitNumber);
    // $("#typeOfRight").val(typeOfRight);
    // $("#natureOfRight").val(natureOfRight);
    // $("#purpose").val(purpose);
    // $("#usableArea").val(usableArea);
    // $("#coveredArea").val(coveredArea);
    // $("#structure").val(structure);
    // $("#totalFloors").val(totalFloors);
    // $("#storyNumber").val(storyNumber);
    // $("#privateUseArea").val(privateUseArea);
    // $("#exclusiveAcreage").val(exclusiveAcreage);
    // $("#mjft").val(mjft);
    // $("#exclusiveFloorSpace").val(exclusiveFloorSpace);
    // $("#apportionedFloorSpace").val(apportionedFloorSpace);
    // $("#registrationTime").val(registrationTime);
    // $("#lifeSpan").val(lifeSpan);
    // $("#abbreviation").val(abbreviation);
    /*修改*/

    $('#propertyModal1').modal('show');
}

function addAndUpdateProperty(id) {
    // 显示弹窗
    $("#name").val("");
    $("#address").val("");
    $("#processingTime").val("");
    $("#number").val("");
    $("#cases").val("");
    $("#stand").val("");
    $("#unitNumber").val("");
    $("#typeOfRight").val("");
    $("#natureOfRight").val("");
    $("#purpose").val("");
    $("#usableArea").val("");
    $("#coveredArea").val("");
    $("#structure").val("");
    $("#totalFloors").val("");
    $("#storyNumber").val("");
    $("#privateUseArea").val("");
    $("#exclusiveAcreage").val("");
    $("#mjft").val("");
    $("#exclusiveFloorSpace").val("");
    $("#apportionedFloorSpace").val("");
    $("#registrationTime").val("");
    $("#lifeSpan").val("");
    $("#abbreviation").val("");

    $('#propertyModal').modal('show');
}

// 根据id删除产品
function deleteById(row) {
    var flag = window.confirm("确认删除吗?");
    if (flag) {
        var $tr = row.parent().parent();
        var id = $tr.children(":eq(0)").html();
        $.ajax({
            type: "DELETE",
            url: "/property/" + id,
            statusCode: {
                204: function () {
                    alert("删除员工信息成功");
                    location.reload();
                },
                500: function () {
                    alert("服务器错误");
                }
            }
        })
    }
}

// 关闭操作
function shutdown() {
    // 将浏览器窗口关闭

    var flag = window.confirm("确认要退出系统吗");
    if (flag) {
        $.ajax({
            type: "DELETE",
            url: "/login",
            statusCode: {
                204: function () {
                    alert("已经退出系统");
                    $(location).attr("href", "/login.html");
                    return false;
                },
                500: function () {
                    alert("服务器内部错误");
                    return false;
                }
            }
        })
    }
};