import request from '@/api/request'

const user = window.localStorage.getItem('user')
export const articleList = params => {
  return request({
    url: '/mp/v1_0/articles',
    method: 'get',
    params,
    data: user
  })
}

export const channelList = () => {
  return request({
    url: '/mp/v1_0/channels',
    method: 'get',
    data: user
  })
}

export const deleteArticle = articleId => {
  return request({
    url: `/mp/v1_0/articles/${articleId}`,
    method: 'DELETE'
  })
}

export const addArticle = (data, draft = false) => {
  return request({
    url: '/mp/v1_0/articles',
    method: 'POST',
    params: {
      draft
    },
    data
  })
}

export const getArticle = articleId => {
  return request({
    url: `/mp/v1_0/articles/${articleId}`,
    method: 'GET'
  })
}

export const updateArticle = (id, data, draft = false) => {
  return request({
    url: `/mp/v1_0/articles/${id}`,
    method: 'PUT',
    params: {
      draft
    },
    data
  })
}
