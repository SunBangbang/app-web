import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/syncWeapon',
    method: 'post',
    data
  })
}

export function del(bizId) {
  return request({
    url: 'admin/syncWeapon/' + bizId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/syncWeapon',
    method: 'put',
    data
  })
}
