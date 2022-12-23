import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/syncMonster',
    method: 'post',
    data
  })
}

export function del(bizId) {
  return request({
    url: 'admin/syncMonster/' + bizId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/syncMonster',
    method: 'put',
    data
  })
}
