<template>
  <div class="layout_container">
    <el-container class="layout">
      <el-aside width="auto"><Aside :is-collapse="isCollapse"></Aside></el-aside>
      <el-container>
        <el-header class="layout_head">
          <div>
            <i v-if="isCollapse === false" class="el-icon-s-fold" @click="Collapse"></i>
            <i v-else class="el-icon-s-unfold" @click="Collapse"></i>
            <span>江苏传智播客科技教育有限公司</span>
          </div>
          <div class="dropdown">
            <img class="dropdown-img" :src="user.photo">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item @click.native="signOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Aside from '@/components/Aside'
import { user } from '@/utils/login'
import globalBus from '@/utils/global-bus'

export default {
  name: 'LayoutIndex',
  data () {
    return {
      isCollapse: false,
      user: {}
    }
  },
  created () {
    this.loadUser()
  },
  mounted () {
    globalBus.$on('getUserInfo', arg => {
      this.user.name = arg.name
      this.user.photo = arg.photo
    })
  },
  methods: {
    Collapse () {
      this.isCollapse = !this.isCollapse
    },
    signOut () {
      window.localStorage.removeItem('user')
      this.$router.push('/login')
    },
    loadUser () {
      user().then(res => {
        this.user = res.data.data
      })
    }
  },
  components: {
    Aside
  }
}
</script>

<style scoped lang="less">
.layout_container {
  width: 100%;
  height: 100%;
  .layout {
    width: 100%;
    height: 100%;
    .layout_head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.layout_head {
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.dropdown {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dropdown-img {
  width: 40px;
  height: 40px;
  margin-right: 5px;
  border-radius: 50%;
}
</style>
