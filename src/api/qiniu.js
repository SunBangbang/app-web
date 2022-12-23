import request from '@/utils/request'

export function get() {
  return request({
    url: 'admin/qiNiuConfig',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: 'admin/qiNiuConfig',
    data,
    method: 'put'
  })
}

export function del(id) {
  return request({
    url: 'admin/qiNiuContent/' + id,
    method: 'delete'
  })
}

export function download(id) {
  return request({
    url: 'admin/qiNiuContent/download/' + id,
    method: 'get'
  })
}

export function sync() {
  return request({
    url: 'admin/qiNiuContent/synchronize',
    method: 'post'
  })
}

export function delAll(ids) {
  return request({
    url: 'admin/qiNiuContent/',
    method: 'delete',
    data: ids
  })
}
