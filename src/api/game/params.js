import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/params',
    method: 'post',
    data
  })
}
export function setBetOpen(data) {
  return request({
    url: 'admin/setBetOpen',
    method: 'post',
    data
  })
}
export function setBetClose(data) {
  return request({
    url: 'admin/setBetClose',
    method: 'post',
    data
  })
}
export function deleteStop(data) {
  return request({
    url: 'admin/params/deleteStop',
    method: 'post',
    data
  })
}
export function del(bizId) {
  return request({
    url: 'admin/params/' + bizId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/params',
    method: 'put',
    data
  })
}
