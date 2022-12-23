import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/flowAgent',
    method: 'post',
    data
  })
}


export function updateProfit(data) {
  return request({
    url: 'admin/flowAgent/updateProfit',
    method: 'post',
    data
  })
}

export function del(bizId) {
  return request({
    url: 'admin/flowAgent/' + bizId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/flowAgent',
    method: 'put',
    data
  })
}
