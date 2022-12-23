import request from '@/utils/request'

export function getDepts(params) {
  return request({
    url: 'admin/dept',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: 'admin/dept',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'admin/dept/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/dept',
    method: 'put',
    data
  })
}
