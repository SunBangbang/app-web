import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/agent',
    method: 'post',
    data
  })
}
export function changeRate(data) {
  return request({
    url: 'admin/agent/changeRate',
    method: 'post',
    data
  })
} 
export function updateWithdrawStt(data) {
  return request({
    url: 'admin/agent/updateWithdrawStt',
    method: 'post',
    data
  })
} 

export function changeAgentRate(data) {
  return request({
    url: 'admin/agent/changeAgentRate',
    method: 'post',
    data
  })
}

export function clearData(data) {
  return request({
    url: 'admin/agent/clearData',
    method: 'post',
    data
  })
}
export function checkMoney(data) {
  return request({
    url: 'admin/agent/checkMoney',
    method: 'post',
    data
  })
}
export function generateCode(data) {
  return request({
    url: 'admin/agent/generateCode',
    method: 'post',
    data
  })
}
export function del(bizId) {
  return request({
    url: 'admin/agent/' + bizId,
    method: 'delete'
  })
}
export function deployMoney(data) {
  return request({
    url: 'admin/agent/deployMoney',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: 'admin/agent',
    method: 'put',
    data
  })
}
