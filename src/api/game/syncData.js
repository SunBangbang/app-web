import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/syncData',
    method: 'post',
    data
  })
}

export function del(bizId) {
  return request({
    url: 'admin/syncData/' + bizId,
    method: 'delete'
  })
}
export function doSettle(data) {
  return request({
    url: 'admin/settleData',
    method: 'post',
    data
  })
}


export function edit(data) {
  return request({
    url: 'admin/syncData',
    method: 'put',
    data
  })
}
