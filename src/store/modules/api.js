const baseUrl = process.env.BASE_API
const baseWsUrl = process.env.BASE_WS_API
const api = {
  state: {
    // 实时控制台
    socketApi: baseWsUrl ,
    // 图片上传
    imagesUploadApi: baseUrl + '/admin/uploadImg',
    // 图片上传
    xlsUploadApi: baseUrl + '/api/virtualDetail/upload',
    // 图片上传
    pdfUploadApi: baseUrl + '/api/authPay/upload',
    
    // 修改头像
    updateAvatarApi: baseUrl + '/api/users/updateAvatar',
    // 上传文件到七牛云
    qiNiuUploadApi: baseUrl + '/api/qiNiuContent',
    // Sql 监控
    sqlApi: baseUrl + '/druid',
    // swagger
    swaggerApi: baseUrl + '/doc.html'
  }
}

export default api
