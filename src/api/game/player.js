import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/player',
    method: 'post',
    data
  })
}
export function updateStt(data) {
  return request({
    url: 'admin/player/updateStt',
    method: 'post',
    data
  })
}
export function updateRemark(data) {
  return request({
    url: 'admin/player/updateRemark',
    method: 'post',
    data
  })
}

export function resetDevice(data) {
  return request({
    url: 'admin/resetDevice',
    method: 'post',
    data
  })
}

export function playerDelete(data) {
  return request({
    url: 'admin/player/delete',
    method: 'post',
    data
  })
}
export function resetPassword(data) {
  return request({
    url: 'admin/resetPassword',
    method: 'post',
    data
  })
}
export function summary(data) {
  return request({
    url: 'admin/player/summary',
    method: 'post',
    data
  })
}

export function del(bizId) {
  return request({
    url: 'admin/player/' + bizId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/player',
    method: 'put',
    data
  })
}
