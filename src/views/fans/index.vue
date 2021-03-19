<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="text item">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="粉丝列表" name="first">
        <el-row :gutter="10">
          <el-col :span="3" v-for="fan in fans" :key="fan.id">
            <div class="fans">
              <div class="fans-img"><img src="http://toutiao-img.itheima.net/FpiwqpYMYZ_NSjJeWz-_OMVAlbql"></div>
              <p class="fans-text">{{ fan.name }}</p>
              <button class="fans-follow">+关注</button>
            </div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="粉丝画像" name="second">粉丝画像</el-tab-pane>
    </el-tabs>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount">
    </el-pagination>
  </div>
</el-card>
</template>
<script>
import { getFans } from '@/utils/fans'
export default {
  name: 'FansIndex',
  data () {
    return {
      activeName: 'first',
      fans: [],
      totalCount: 0
    }
  },
  created () {
    this.loadFans()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    loadFans (page = 1) {
      getFans({
        page,
        per_page: 20
      }).then(res => {
        this.fans = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .fans {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    border: 1px dotted #ccc;
    .fans-img {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .fans-text {
      text-align: center;
    }
    .fans-follow {
      padding: 8px 10px;
      color: #66b1ff;
      background-color: hsl(185, 100%, 63%);
      border: 0;
      border-radius: 3px;
      outline: 0;
      cursor: pointer;
    }
  }
</style>
