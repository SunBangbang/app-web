import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/flowPay',
    method: 'post',
    data
  })
}

export function del(bizId) {
  return request({
    url: 'admin/flowPay/' + bizId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/flowPay',
    method: 'put',
    data
  })
}
