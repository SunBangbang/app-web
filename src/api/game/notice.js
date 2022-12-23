import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/notice',
    method: 'post',
    data
  })
}

export function del(bizId) {
  return request({
    url: 'admin/notice/' + bizId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/notice',
    method: 'put',
    data
  })
}
