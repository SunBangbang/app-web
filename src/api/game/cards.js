import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/cards',
    method: 'post',
    data
  })
}

export function del(bizId) {
  return request({
    url: 'admin/cards/' + bizId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/cards',
    method: 'put',
    data
  })
}
