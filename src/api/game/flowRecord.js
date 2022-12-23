import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/flowRecord',
    method: 'post',
    data
  })
}

export function del(bizId) {
  return request({
    url: 'admin/flowRecord/' + bizId,
    method: 'delete'
  })
}
export function accessHis() {
  return request({
    url: 'admin/accessHis',
    method: 'get'
  })
}

export function edit(data) {
  return request({
    url: 'admin/flowRecord',
    method: 'put',
    data
  })
}

export function updateRecord(bizId) {
  return request({
    url: 'admin/updateRecord/' + bizId,
    method: 'delete'
  })
} 
