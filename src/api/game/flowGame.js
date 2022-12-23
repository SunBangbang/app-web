import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/flowGame',
    method: 'post',
    data
  })
}

export function del(bizId) {
  return request({
    url: 'admin/flowGame/' + bizId,
    method: 'delete'
  })
}
export function setFlag(bizId) {
  return request({
    url: 'admin/flowGame/setFlag/' + bizId,
    method: 'delete'
  })
}

export function setFlagWin(bizId) {
  return request({
    url: 'admin/flowGame/setFlagWin/' + bizId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/flowGame',
    method: 'put',
    data
  })
}
