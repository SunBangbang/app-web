import request from '@/utils/request'

export function withdraw(orderNo) {
  return request({
    url: 'admin/flowWithdraw/withdraw?orderNo='+orderNo,
    method: 'get'
  })
} 
export function withdrawCancel(orderNo) {
  return request({
    url: 'admin/flowWithdraw/withdrawCancel?orderNo='+orderNo,
    method: 'get'
  })
} 
export function totalNum() {
  return request({
    url: 'admin/flowWithdraw/totalNum',
    method: 'get'
  })
} 


