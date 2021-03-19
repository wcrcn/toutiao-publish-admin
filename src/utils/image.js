import requst from '@/api/request'

export const uploadImage = data => {
  return requst({
    url: '/mp/v1_0/user/images',
    method: 'POST',
    data
  })
}

export const getImage = params => {
  return requst({
    url: '/mp/v1_0/user/images',
    method: 'GET',
    params
  })
}

export const updateImage = (imageId, collect) => {
  return requst({
    url: `/mp/v1_0/user/images/${imageId}`,
    method: 'PUT',
    data: {
      collect
    }
  })
}

export const deleteImage = imageId => {
  return requst({
    url: `/mp/v1_0/user/images/${imageId}`,
    method: 'DELETE'
  })
}
