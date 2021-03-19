<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{$route.query.id ? '修改文章' : '发布文章'}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
        <el-form ref="formName" :rules="rules" :model="articleForm" label-width="80px">
          <el-form-item label="标题" prop="title">
            <el-input v-model="articleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="content">
            <el-tiptap
              height="400"
              placeholder="请输入文章内容"
              v-model="articleForm.content"
              :extensions="extensions"
              lang="zh"
            />
          </el-form-item>
          <el-form-item label="封面" prop="cover">
            <el-radio-group v-model="articleForm.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道" prop="channel_id">
            <el-select v-model="articleForm.channel_id">
              <el-option v-for="channel in channels" :key="channel.id" :label="channel.name" :value="channel.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(false)">{{$route.query.id ? '修改' : '发表'}}</el-button>
            <el-button @click="onSubmit(true)">存入草稿</el-button>
          </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>

import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  Fullscreen,
  TodoItem,
  TodoList,
  FontSize,
  TextColor
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import { channelList, addArticle, getArticle, updateArticle } from '@/utils/article'
import { uploadImage } from '@/utils/image.js'

export default {
  name: 'releaseArticle',
  data () {
    return {
      articleForm: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      channels: [],
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        content: [
          {
            validator (rule, value, callback) {
              if (value === '<p></p>' || value === '') {
                callback(new Error('请输入文章内容'))
              } else {
                callback()
              }
            }
          }
        ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'change' }
        ]
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
        new Italic(),
        new Strike(),
        new Image({
          uploadRequest (file) {
            console.log(file)
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
            })
          }
        }),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new FontSize(),
        new TextColor(),
        new Fullscreen()
      ]
    }
  },
  created () {
    this.loadchannel()
    if (this.$route.query.id) {
      this.loadArticle(this.$route.query.id)
    }
  },
  methods: {
    onSubmit (draft = false) {
      this.$refs.formName.validate(valid => {
        if (valid) {
          if (this.$route.query.id) {
            updateArticle(this.$route.query.id, this.articleForm, draft).then(res => {
              this.$message({
                type: 'success',
                message: draft ? '存入草稿成功' : '修改成功!'
              })
              this.$router.push('/article')
            })
          } else {
            addArticle(this.articleForm, draft).then(res => {
              console.log(res)
              this.$message({
                type: 'success',
                message: draft ? '存入草稿成功' : '发表成功!'
              })
              this.$router.push('/article')
            })
          }
        } else {
          return false
        }
      })
    },
    loadchannel () {
      channelList().then(res => {
        this.channels = res.data.data.channels
      })
    },
    loadArticle (id) {
      getArticle(id).then(res => {
        this.articleForm = res.data.data
      })
    }
  },
  components: {
    'el-tiptap': ElementTiptap
  }
}
</script>
<style lang="less" scoped>

</style>
