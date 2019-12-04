
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
    let result = [];
    if(!Array.isArray(tile)) {
        return result;
    }
    tile.forEach(item => {
        delete item.children;
    });
    let map = ToMapObj(tile);
    tile.forEach(item => {
        let parent = map[item.parentId];
        if(parent) {
            (parent.children || (parent.children = [])).push(item);
        } else {
            result.push(item);
        }
    });
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

/**
 * 复杂数组去重
 * @param arr
 * @return {*}
 */
const Unique=(arr) => {
    const res = new Map();
    return arr.filter(d => !res.has(d.id) && res.set(d.id, d.name))
};

export {
    TileTool,
    FilterTool,
    PackageTool,
    Unique
};