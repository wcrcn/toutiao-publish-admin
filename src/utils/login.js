import requst from '@/api/request'
/**
 * 用户登录
 * @param
 * @returns
 */
export const login = (data) => {
  return requst({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data
  })
}
/**
 * 获取个人信息
 */
export const user = () => {
  return requst({
    method: 'get',
    url: '/mp/v1_0/user/profile'
  })
}

/**
 * 修改个人信息
 */
export const updateUser = data => {
  return requst({
    method: 'PATCH',
    url: '/mp/v1_0/user/profile',
    data
  })
}

/**
 * 编辑用户头像
 */
export const updateUserPhoto = data => {
  return requst({
    method: 'PATCH',
    url: '/mp/v1_0/user/photo',
    data
  })
}
