<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="text item">
      <el-row :gutter="10">
        <el-col :span="15">
          <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="编号">
              {{ user.id }}
            </el-form-item>
            <el-form-item label="手机">
              {{ user.mobile }}
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
              <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" :offset="4">
          <label for="file">
            <el-avatar shape="square" :size="100" fit="cover" :src="user.photo"></el-avatar>
            <p>点击修改头像</p>
          </label>
          <input id="file" ref="file" @change="updateChange" type="file" hidden />
        </el-col>
      </el-row>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      @opened="onOpend"
    >
      <div>
        <img ref="image" class="img" :src="imgUrl">
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdatePhoto">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { user, updateUser, updateUserPhoto } from '@/utils/login'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import globalBus from '@/utils/global-bus'

export default {
  name: 'SettingIndex',
  data () {
    return {
      dialogVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      user: {},
      cropper: null,
      imgUrl: ''
    }
  },
  created () {
    this.loadUser()
  },
  methods: {
    loadUser () {
      user().then(res => {
        this.user = res.data.data
      })
    },
    onSubmit () {
      updateUser(this.user).then(res => {
        console.log(res)
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    updateChange () {
      const img = this.$refs.file
      this.dialogVisible = true
      // 预览图片
      const url = window.URL.createObjectURL(img.files[0])
      this.imgUrl = url
      this.$refs.file.value = ''
    },
    onOpend () {
      const image = this.$refs.image
      if (this.cropper) {
        this.cropper.replace(this.imgUrl)
        return
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none',
        cropBoxResizable: false
      })
    },
    onUpdatePhoto () {
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        updateUserPhoto(fd).then(res => {
          this.dialogVisible = false
          this.user.photo = window.URL.createObjectURL(file)
          globalBus.$emit('getUserInfo', this.user)
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.img {
  display: block;
  height: 150px;
  /* This rule is very important, please don't ignore this */
  max-width: 100%;
}
</style>
