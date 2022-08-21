<template>
    <div class="pagination">
        <button :disabled="pageNo == 1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
        <button v-if="startNumAndEndNum.start > 1" @click="$emit('getPageNo',1)">1</button>
        <button v-if="startNumAndEndNum.start > 2">···</button>

        <template v-for="(item,index) in startNumAndEndNum.end">            
        <button :style="{color:(index+1)==pageNo?'red':'black'}" :key="index" v-if="item>=startNumAndEndNum.start" @click="$emit('getPageNo',item)">{{item}}</button>
        </template>        

        <button v-if="startNumAndEndNum.end < totalPage - 1">···</button>
        <button v-if="startNumAndEndNum.end < totalPage">{{totalPage}}</button>
        <button @click="$emit('getPageNo',pageNo+1)" :disabled="pageNo == totalPage">下一页</button>

        <button style="margin-left: 30px">共 {{totalPage}} 条</button>
    </div>
</template>

<script>
export default {
    name:"Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
        //总共多少页
        totalPage(){
            //向上取值
            return Math.ceil(this.total/this.pageSize)
        },
        //计算出连续的页码的起始码数字与结束数字
        startNumAndEndNum(){
            const {continues,pageNo,totalPage} = this
            //先定义两个变量存储起始数字与结束数组
            let start = 0 , end = 0
            //如果连续数字大于总页数 就会出现一些问题
            if(continues > totalPage){
                start = 1;
                end = totalPage
            }else{
                //起始数字
                start = pageNo - parseInt(continues/2)
                //结束数字
                end = pageNo + parseInt(continues/2)
            //当前页在中间，导致start显示的是小于1的数
            if( start < 1 ){
               start = 1 
                end = continues
            }
            if( end > totalPage){
                end = totalPage
                start = totalPage - continues + 1
            }
            }
            return {start,end}
        }
    }
}
</script>

<style lang="less" scoped>
    .pagination {
        text-align: center;
        button {
            margin: 0 5px;
            background-color: #f4f4f5;
            color: #606266;
            outline: none;
            border-radius: 2px;
            padding: 0 4px;
            vertical-align: top;
            display: inline-block;
            font-size: 13px;
            min-width: 35.5px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            border: 0;

            &[disabled] {
                color: #c0c4cc;
                cursor: not-allowed;
            }

            &.active {
                cursor: not-allowed;
                background-color: #409eff;
                color: #fff;
            }
        }
    }
</style>