import COS from "cos-js-sdk-v5";
import { getTempSecret } from "../axios/service";
import { ElMessage } from "element-plus";
export const uploadContent = async (file, fileName) => {
  const result = await getTempSecret();
  if (result.data.data) {
    const data = result.data.data.data;
    const { expiredTime, expiration, startTime, requestId, credentials } = data;
    const { sessionToken, tmpSecretKey, tmpSecretId } = credentials;
    const cos = new COS({
      getAuthorization: (options, callback) => {
        const obj = {
          TmpSecretId: tmpSecretId,
          TmpSecretKey: tmpSecretKey,
          XCosSecurityToken: sessionToken,
          ExpiredTime: expiredTime,
        };
        callback(obj);
      },
    });
    return new Promise((resolve, reject) => {
      cos.putObject(
        {
          Bucket: "huangjunyi-1310688513",
          Region: "ap-shanghai",
          Key: "articleContent/" + fileName,
          StorageClass: "STANDARD",
          Body: file,
          onProgress: (progressData) => {
            console.log(JSON.stringify(progressData));
          },
        },
        async (err, data) => {
          if (err) {
            ElMessage({
              message: "上传文章内容失败",
              type: "error",
            });
            reject(err);
          } else {
            ElMessage({
              message: "上传文章内容成功",
              type: "success",
            });
            const data = await cos.getObject({
              Bucket: "huangjunyi-1310688513",
              Region: "ap-shanghai",
              Key: "articleContent/" + fileName,
            });
            resolve(data);
          }
        }
      );
    });
  } else {
    ElMessage({
      message: "请重新登录",
      type: "error",
    });
  }
};
