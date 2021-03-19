import requst from '@/api/request'

export const updateCommentStatus = (articleId, allowComment) => {
  return requst({
    url: '/mp/v1_0/comments/status',
    method: 'PUT',
    params: {
      article_id: articleId
    },
    data: {
      allow_comment: allowComment
    }
  })
}
