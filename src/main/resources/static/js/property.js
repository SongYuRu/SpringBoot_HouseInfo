
$(function () {
    $("#submit").on("click", function () {
        var name = $("#name").val();
        var address = $("#address").val();
        var processingTime = $("#processingTime").val();
        var number = $("#number").val();
        var cases = $("#cases").val();
        var stand = $("#stand").val();
        var unitNumber= $("#unitNumber").val();
        var typeOfRight = $("#typeOfRight").val();
        var natureOfRight = $("#natureOfRight").val();
        //获取用途的值
        var purpose = $("#purpose").val();
       //将字符串转换为毫秒数
        var purposeTime = purpose*365*24*60*60*1000;
        var usableArea = $("#usableArea").val();
        var coveredArea = $("#coveredArea").val();

        var structure = $("#structure").val();
        var totalFloors =$("#totalFloors").val();
        var storyNumber = $("#storyNumber").val();
        var privateUseArea = $("#privateUseArea").val();
        var exclusiveAcreage = $("#exclusiveAcreage").val();
        var mjft= $("#mjft").val();
        var exclusiveFloorSpace = $("#exclusiveFloorSpace").val();
        var apportionedFloorSpace = $("#apportionedFloorSpace").val();

        //获取登记的时间的值
        var registrationTime = $("#registrationTime").val();
        var registrationTimes = (new Date(registrationTime)).getTime(); //得到毫秒数


        var lifeSpanTime = purposeTime+registrationTimes;//使用时期毫秒数
        var lifeSpan = new Date(lifeSpanTime).toLocaleDateString();//转换时间格式
        var abbreviation = $("#abbreviation").val();



        $.ajax({
            type: "POST",
            url: "/property",
            data: { name,address,processingTime,number,cases,stand,unitNumber,typeOfRight,natureOfRight,purpose,
                usableArea,coveredArea,structure,totalFloors,storyNumber,privateUseArea,exclusiveAcreage,mjft,
                exclusiveFloorSpace,apportionedFloorSpace,registrationTime,lifeSpan,abbreviation},
            statusCode: {
                201: function () {
                    alert("信息提交成功");
                    $(location).attr("href", "/property.html");
                    return false;
                },
                500: function () {
                    alert("信息提交失败，请重新提交");
                    $(location).attr("href", "/property.html");
                    return false;
                }
            }
        });
    });
});





