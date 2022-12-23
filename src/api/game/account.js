import request from '@/utils/request'

export function add(data) {
  return request({
    url: 'admin/account',
    method: 'post',
    data
  })
}

export function recharge(data) {
  return request({
    url: 'admin/account/recharge',
    method: 'post',
    data
  })
}

export function transfer(data) {
  return request({
    url: 'admin/account/transfer',
    method: 'post',
    data
  })
}

export function rechargeSub(data) {
  return request({
    url: 'admin/account/rechargeSub',
    method: 'post',
    data
  })
}


export function bindAccount(data) {
  return request({
    url: 'admin/account/bindAccount',
    method: 'post',
    data
  })
}
export function bindUcoin(data) {
  return request({
    url: 'admin/account/bindUcoin',
    method: 'post',
    data
  })
}

export function bindAlipay(data) {
  return request({
    url: 'admin/account/bindAlipay',
    method: 'post',
    data
  })
}
export function accountPassword(data) {
  return request({
    url: 'admin/account/accountPassword',
    method: 'post',
    data
  })
}
export function del(bizId) {
  return request({
    url: 'admin/account/' + bizId,
    method: 'delete'
  })
}

export function edit(data) {
  return request({
    url: 'admin/account',
    method: 'put',
    data
  })
}
