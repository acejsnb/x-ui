
/***
 * 平铺树形结构
 * @param result 接收结果
 * @param arr 需要平铺的数据
 * @param pid 父级id
 * @constructor
 * @return []
 */
const TileTool = (result, arr, pid) => {
    arr.forEach(d => {
        let obj={parentId: pid, id: d.id, name: d.name, checked: d.checked, open: d.open};
        result.push(obj);
        if (d.children&&d.children.length) TileTool(result, d.children, d.id);
    });

    return result;
};

/**
 * 组装数据成树形结构
 * @param tile 平铺原始数据
 * @constructor
 */
const PackageTool = (tile) => {
    //result存储json数据转为树形结构后的结果。
    //temp为临时对象，将json数据按照id值排序.
    //len是json长度，用于循环遍历结束的条件
    const result = [], temp = {}, len = tile.length;
    for(let i = 0; i < len; i++) {
        // 以id作为索引存储元素，可以无需遍历直接快速定位元素
        temp[tile[i]['id']] = tile[i]
    }
    for(let j = 0; j < len; j++) {
        const currentElement = tile[j];
        // 临时变量里面的当前元素的父元素，即pid的值，与找对应id值
        const tempCurrentElementParent = temp[currentElement['parentId']];
        // 如果存在父元素，即如果有pid属性
        if (tempCurrentElementParent) {
            // 如果父元素没有chindren键
            if (!tempCurrentElementParent['children']) {
                // 设上父元素的children键
                tempCurrentElementParent['children'] = []
            }
            // 给父元素加上当前元素作为子元素
            tempCurrentElementParent['children'].push(currentElement)
        }
        // 不存在父元素，意味着当前元素是一级元素
        else {
            result.push(currentElement);
        }
    }

    return result;
};

/**
 * 将数据转成map对象
 * @param arr
 * @constructor
 */
const ToMapObj = (arr) => {
    const tupleObj={}; // 平铺的map对象
    arr.forEach(d => {
        tupleObj[d.id]=d;
    });
    return tupleObj;
};

/**
 * 得到筛选后的数据 一维数据列表
 * @param data 接收结果
 * @param tile 平铺原始数据
 * @param fData 筛选后的数据
 * @constructor
 */
const FilterTool = (data, tile, fData) => {
    const tupleObj=ToMapObj(tile); // 平铺的map对象
    ByExample(data, fData, tupleObj);

    return data;
};

/**
 * 遍历传入的筛选后的数据
 * @param data 接收结果
 * @param tile 平铺的数据
 * @param tupleObj
 */
const ByExample = (data, tile, tupleObj) => {
    tile.forEach(d => {
        const dArr=[d];
        GetObjByParentId(dArr, d, tupleObj);
        data.push(FormatArr(dArr))
    });
};

/**
 * 递归查找上级数据 直到顶级
 * @param dArr
 * @param d
 * @param tupleObj
 */
const GetObjByParentId = (dArr, d, tupleObj) => {
    const obj=tupleObj[d.parentId];
    if (obj) {
        dArr.push(obj);
        GetObjByParentId(dArr, obj, tupleObj)
    }
};

/**
 * 把筛选到数组格式化成字符串对象
 * @param arr
 * @return {{name: string, id: string}}
 */
const FormatArr = (arr) => {
    let id='', name='';
    for (let i=arr.length-1;  i>=0; i--) {
        id+=arr[i].id+'/';
        name+=arr[i].name+'/';
    }
    if (id) id=id.substring(0, id.length-1);
    if (name) name=name.substring(0, name.length-1);

    return {id, name}
};

export {
    TileTool,
    FilterTool,
    PackageTool
};