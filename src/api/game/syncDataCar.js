import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/syncDataCar',
    method: 'post',
    data
  })
}

export function del(bizId) {
  return request({
    url: 'admin/syncDataCar/' + bizId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/syncDataCar',
    method: 'put',
    data
  })
}
