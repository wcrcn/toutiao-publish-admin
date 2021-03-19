<template>
  <div class="material-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="text item">
        <div class="card-head">
          <el-radio-group v-model="collect" @change="loadImage(1)" :disabled="isDisabled">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <el-button type="success" @click="addMaterial">添加素材</el-button>
        </div>
        <el-row :gutter="10">
          <el-col :xs="12" :sm="6" :xl="4" :span="4" v-for="image in images" :key="image.id" class="row-col">
            <el-image
            style="height: 150px"
              :src="image.url"
              fit="cover"></el-image>
              <div class="operation">
                <i class="el-icon-star-off" v-loading="loading" :class="{ iscollected: image.is_collected }" style="fontSize: 25px; marginRight: 30px" @click="onCollection(image)"></i>
                <i class="el-icon-delete-solid" style="fontSize: 25px" @click="deleteCollection(image)"></i>
              </div>
          </el-col>
        </el-row>
      </div>
      <el-pagination
        background
        :page-size.sync="pageSize"
        :current-page.sync="page"
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="currentChange"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-upload
        class="upload-demo"
        drag
        :headers="{Authorization: `Bearer ${user}`}"
        name="image"
        :show-file-list="false"
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :on-success="onSuccess"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImage, updateImage, deleteImage } from '@/utils/image'
export default {
  name: 'materialIndex',
  data () {
    const user = window.localStorage.getItem('user')
    return {
      collect: false,
      dialogVisible: false,
      isDisabled: false,
      loading: false,
      user,
      images: [],
      totalCount: 0,
      pageSize: 18,
      page: 1
    }
  },
  created () {
    this.loadImage()
  },
  methods: {
    loadImage (page = 1) {
      this.isDisabled = true
      this.page = page
      getImage({
        collect: this.collect,
        page: page,
        per_page: this.pageSize
      }).then(res => {
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
        this.isDisabled = false
      })
    },
    currentChange (page) {
      this.loadImage(page)
    },
    addMaterial () {
      this.dialogVisible = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    onCollection (image) {
      updateImage(image.id.toString(), !image.is_collected).then(res => {
        this.loadImage(this.page)
        this.$message({
          message: !image.is_collected ? '收藏图片成功' : '收藏图片已取消',
          type: 'success'
        })
      })
    },
    deleteCollection (image) {
      deleteImage(image.id.toString()).then(res => {
        this.loadImage(this.page)
        this.$message({
          message: '删除图片成功',
          type: 'success'
        })
      })
    },
    onSuccess () {
      this.dialogVisible = false
      this.loadImage(this.page)
      this.$message({
        message: '上传图片成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.card-head {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
}
.item {
  padding-bottom: 20px;
}
.row-col {
  position: relative;
  .operation {
    position: absolute;
    left: 5px;
    right: 5px;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    // opacity:0.9;
    height: 40px;
    background: #1111;
    visibility: hidden;
  }
}
.iscollected {
  color: red;
}
.row-col:hover .operation {
  visibility: visible;
  transition: all 2;
}
.row-col:hover .operation>i {
  cursor: pointer;
}
</style>
