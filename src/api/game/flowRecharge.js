import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/flowRecharge',
    method: 'post',
    data
  })
}

export function del(bizId) {
  return request({
    url: 'admin/flowRecharge/' + bizId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/flowRecharge',
    method: 'put',
    data
  })
}
export function rechargeConfirm(orderNo) {
  return request({
    url: 'admin/flowRecharge/rechargeConfirm?orderNo='+orderNo,
    method: 'get'
  })
} 
export function rechargeCancel(orderNo) {
  return request({
    url: 'admin/flowRecharge/rechargeCancel?orderNo='+orderNo,
    method: 'get'
  })
} 
