import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/users',
    method: 'post',
    data
  })
}

export function del(id) {
  return request({
    url: 'admin/users/' + id,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/users',
    method: 'put',
    data
  })
}

export function validPass(password) {
  const data = {
    password
  }
  return request({
    url: 'admin/users/validPass/',
    method: 'post',
    data
  })
}

export function updatePass(password) {
  const data = {
    password
  }
  return request({
    url: 'admin/users/updatePass/',
    method: 'post',
    data
  })
}

export function updateEmail(code, data) {
  return request({
    url: 'admin/users/updateEmail/' + code,
    method: 'post',
    data
  })
}

