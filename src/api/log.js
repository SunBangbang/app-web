import request from '@/utils/request'

export function getErrDetail(id) {
  return request({
    url: 'admin/logs/error/' + id,
    method: 'get'
  })
}
