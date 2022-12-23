import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/syncCar',
    method: 'post',
    data
  })
}

export function del(bizId) {
  return request({
    url: 'admin/syncCar/' + bizId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/syncCar',
    method: 'put',
    data
  })
}
