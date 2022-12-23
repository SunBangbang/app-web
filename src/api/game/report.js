import request from '@/utils/request'

  
export function reportFlow(data) {
  return request({
    url: 'admin/reportFlow',
    method: 'post',
    data
  })
}
export function reportFlowDetail(data) {
  return request({
    url: 'admin/reportFlowDetail',
    method: 'post',
    data
  })
}
export function reportAgentFlow(data) {
  return request({
    url: 'admin/reportAgentFlow',
    method: 'post',
    data
  })
}
export function reportPlayerFlow(data) {
  return request({
    url: 'admin/reportPlayerFlow',
    method: 'post',
    data
  })
}
 