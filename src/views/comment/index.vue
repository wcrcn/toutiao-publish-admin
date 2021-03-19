<template>
  <div>
    <el-card class="box-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>评论管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div  class="text item">
    <el-table
      :data="articles"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数">
      </el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数">
      </el-table-column>
      <el-table-column
        label="评论状态">
        <template slot-scope="scope">
          <p>{{scope.row.comment_status ? '正常' : '关闭'}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操纵">
        <template slot-scope="scope">
          <el-switch
            :disabled="scope.row.isDisabled"
            v-model="scope.row.comment_status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatus(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 30, 50, 100]"
      :page-size.sync="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</el-card>
  </div>
</template>

<script>
import { articleList } from '@/utils/article'
import { updateCommentStatus } from '@/utils/comment'
export default {
  name: 'CommentIndex',
  data () {
    return {
      articles: [],
      totalCount: 0,
      pageSize: 10,
      page: 0
    }
  },
  created () {
    this.loadArticle(1)
  },
  methods: {
    loadArticle (page = 1) {
      this.page = page
      articleList({
        page,
        per_page: this.pageSize,
        response_type: 'comment'
      }).then(res => {
        res.data.data.results.forEach(item => {
          item.isDisabled = false
        })
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.loadArticle(1)
    },
    handleCurrentChange (val) {
      this.loadArticle(val)
    },
    changeStatus (article) {
      article.isDisabled = true
      updateCommentStatus(article.id.toString(), article.comment_status).then(res => {
        article.isDisabled = false
      })
    }
  }
}
</script>
