/**
 * Created by huipu on 2016/2/1.
 */
$(function () {
    //refreshData(20,1,10,json.length);
    var pageSize = 20;
    var pageNo = 1;
    builderUQTQueryMsg(getJsonArrayByPageSize(pageSize,pageNo));

    var totalPage = getTotllePage(pageSize);
    var totalRecords = json.length;
    //生成分页控件 根据分页的形式在这里设置
    kkpager.init({
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        totalRecords: totalRecords,
        //页面条数
        pageSize: pageSize
    });
    kkpager.generPageHtml();

});
/**
 * 获取总页数
 * @returns {number}
 */
var getTotllePage = function (pageSize) {
    var jsonCount = json.length;
    var shang = jsonCount/pageSize;
    var yushu = jsonCount%pageSize;
    if(yushu >0){
        shang ++;
    }
    return shang;
}
/**
 * 获取分页后的数据
 * @param pageSize
 * @param pageNo
 * @returns {*}
 */
var getJsonArrayByPageSize = function (pageSize,pageNo){
    var jsonCount = json.length;
    var shang = getTotllePage(pageSize);
    var startIndex = (pageNo-1)*pageSize;
    var endIndex = (shang == pageNo)? jsonCount:pageNo*pageSize;
    return json.slice(startIndex,endIndex);
}

/**
 * 刷新页面数据
 * @param pageSize   每页显示条数
 * @param pageNum    第几页
 */
function refreshData(pageSize, pageNo) {
    builderUQTQueryMsg(getJsonArrayByPageSize(pageSize,pageNo));

    var totalPage = getTotllePage(pageSize);
    var totalRecords = json.length;
    //生成分页控件 根据分页的形式在这里设置
    kkpager.init({
        pno: pageNo,
        //总页码
        total: totalPage,
        //总数据条数
        totalRecords: totalRecords,
        //页面条数
        pageSize: pageSize
    });
    kkpager.generPageHtml();

}


/**
 * 构建表格数据
 */
var builderUQTQueryMsg = function (UQTQueryMsg){
    var UQT_detailTable = $('#UQT_detailTable');
    UQT_detailTable.empty();
    var th = '<tr><th scope="col" class="chi_name" ><span class="fuxuan" ><input type="checkbox" onclick="optionCheckBoxes(this)" id="tottleSe"/></span>标题名称</th><th scope="col" class="eng_name" >英文名称</th><th scope="col" class="query_pro" >类标题</th><th class="match_type" scope="col">描述</th><th scope="col"  class="dis_order">应用名称</th><th scope="col"  class="dis_dta">操作</th><th class="dis_hidden" style="display: none">隐藏属性</th></tr>';

    UQT_detailTable.append(th);
    var tr  ;
    $.each(UQTQueryMsg, function(i,eachData){
        tr = $('<tr>');
        var englishName = eachData.engName;
        var chineseName = eachData.cnName;
        var propertyName = eachData.classTitle;
        var compareType = eachData.desc;
        var properType = eachData.version;
        var order = eachData.appName;
        tr.append('<td class="chi_name"><span class="fuxuan" ><input type="checkbox" id="tottleSe_"'+englishName+'/></span>'+chineseName+'</td><td class="eng_name">'+englishName+'</td><td class="query_pro">'+propertyName+'</td><td class="match_type">'+compareType+'</td><td class="dis_order">'+order+'</td><td class="dis_dta"><a class="editOp" href="javascript:void(0);" onclick="newOrUpdateQueryPro(this)">修改</a><a class="editOp" href="javascript:void(0);" onclick="deleteUQTConfig(this)">删除</a></td><td class="dis_hidden" style="display: none"><input type="hidden" value="'+properType+'"/></td>');
        UQT_detailTable.append(tr);
    });
}


/**
*选择左侧checkbox
*
*/
var optionCheckBoxes = function(data){
    var checkType = $(data).is(':checked');
    var trs = $(data).parent().parent().parent().nextAll();
    
    if(checkType){
        //全部选择
        trs.each(function (trNode) {
            var currentCheck = $(this).find('>td span input[type="checkbox"]');
            //alert(currentCheck.is(':checked'));
            currentCheck.attr("checked", true);
        });
    }else{
        //全部取消选择
        trs.each(function (trNode) {
            var currentCheck = $(this).find('>td span input[type="checkbox"]');
            //alert(currentCheck.is(':checked'));
            currentCheck.attr("checked", false);
        });
    }
}