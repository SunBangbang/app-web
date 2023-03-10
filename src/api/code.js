import request from '@/utils/request'

export function resetEmail(data) {
  return request({
    url: 'admin/code/resetEmail',
    method: 'post',
    data
  })
}

export function updatePass(pass) {
  return request({
    url: 'admin/users/updatePass/' + pass,
    method: 'get'
  })
}
