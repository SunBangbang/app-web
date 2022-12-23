import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/flowTransfer',
    method: 'post',
    data
  })
}

export function del(bizId) {
  return request({
    url: 'admin/flowTransfer/' + bizId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/flowTransfer',
    method: 'put',
    data
  })
}
