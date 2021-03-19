<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <el-form ref="form" label-width="80px">
          <el-form-item label="状态">
            <el-radio-group v-model="statu">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="channel_id" placeholder="请选择活动区域">
              <el-option label="全部" :value="null"></el-option>
              <el-option v-for="channel in channels" :key="channel.id" :label="channel.name" :value="channel.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
            v-model="date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">筛选</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>根据筛选条件查询到{{ total }}条结果：</span>
      </div>
      <div class="text item">
        <el-table
          :data="articleData"
          v-loading="loading"
          >
          <el-table-column
            prop="cover"
            label="封面"
            >
            <template slot-scope="scope">
              <el-image
                :src="scope.row.cover.images[0]"
                fit="cover">
              </el-image>
            </template>
          </el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            >
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <el-tag :type="status[scope.row.status].type">{{ status[scope.row.status].text }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="pubdate"
            label="发布时间">
          </el-table-column>
          <el-table-column
            prop="address"
            label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  circle
                  @click="handleEdit(scope.$index, scope.row)"></el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="handleDelete(scope.$index, scope.row)"></el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          background
          :current-page.sync="page"
          layout="prev, pager, next"
          :total="total"
          :disabled="loading"
          @current-change="currentChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
import { articleList, channelList, deleteArticle } from '@/utils/article'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      date: [],
      statu: null,
      channel_id: null,
      articleData: [{
        cover: {
          images: [],
          type: 0
        },
        title: '',
        status: 2,
        pubdate: ''
      }],
      total: 0,
      page: 1,
      loading: true,
      channels: [],
      status: [
        { index: 0, type: 'warning', text: '草稿' },
        { index: 1, type: 'info', text: '待审核' },
        { index: 2, type: 'success', text: '审核通过' },
        { index: 3, type: 'danger', text: '审核失败' },
        { index: 4, type: '', text: '已删除' }
      ]
    }
  },
  created () {
    this.loadArticle(1)
    this.loadChannel()
  },
  methods: {
    onSubmit () {
      this.loadArticle(1)
      this.page = 1
    },
    loadArticle (page = 1) {
      this.loading = true
      articleList({
        status: this.statu,
        channel_id: this.channel_id,
        begin_pubdate: this.date ? this.date[0] : null,
        end_pubdate: this.date ? this.date[1] : null,
        page: page,
        per_page: 10
      }).then(res => {
        this.articleData = res.data.data.results
        this.total = res.data.data.total_count
        this.loading = false
      })
    },
    loadChannel () {
      channelList().then(res => {
        this.channels = res.data.data.channels
      })
    },
    currentChange (page) {
      this.loadArticle(page)
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.$router.push('/release?id=' + row.id.toString())
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(row.id.toString()).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadArticle(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.page {
  margin-top: 20px;
}
</style>
