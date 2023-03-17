//登录页面判断正确就进入property.html界面，错误就提示错误信息
$(function () {
    $("input[type='button']").click(function () {
        var usernames = $("#usernames").val();
        var passwords = $("#passwords").val();
        $.ajax({
            type: "POST",
            url: "/sessions",
            data: { usernames,  passwords},
            statusCode: {
                201: function () {
                    $(location).attr("href","/property.html");
                    return false;
                },
                404 : function(){
                    $("#errorMsg").html("账号或者密码不正确");
                    return false;
                },
                500 : function(){
                    $("#errorMsg").html("服务器内部错误");
                    return false;
                }
            }
        });
    });
});