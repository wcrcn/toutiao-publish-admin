import request from '@/api/request'

export const getFans = params => {
  return request({
    url: '/mp/v1_0/followers',
    method: 'GET',
    params
  })
}
