function getValue() {
    document.getElementById("registrationTime").value;
    //获取用途的值
    var purpose = $("#purpose").val();
    //将字符串转换为毫秒数
    var purposeTime = purpose * 365 * 24 * 60 * 60 * 1000;

    //获取登记的时间的值
    var registrationTime = $("#registrationTime").val();

    var registrationTimes = (new Date(registrationTime)).getTime(); //得到毫秒数，Java和JavaScript都支持时间类型Date，他们的getTime()方法返回的是毫秒数。默认返回的是13位数字，单位是毫秒。
    var lifeSpanTime = purposeTime + registrationTimes;//使用时期毫秒数
    var lifeSpan = new Date(lifeSpanTime).toLocaleDateString();//转换时间格式
    console.log(lifeSpan);
    //进行校验
    if (lifeSpan != null) {
        document.getElementById("lifeSpan").value = lifeSpan;
    }
}