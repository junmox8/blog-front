<template>
  <div
    class="global"
    v-loading="loading"
    :style="{
      backgroundImage:
        'https://www.bing.com//th?id=OHR.ClingmansDome_ZH-CN0900594339_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
    }"
  >
    <div class="text">
      <div class="chinese">愿你忠于自我，活出自我</div>
      <div class="english">
        May you be loyal to yourself, live like yourself
      </div>
    </div>
    <div class="login_box">
      <div class="title_box">
        <div class="title">博客项目 <span class="version">v1.0.0</span></div>
        <div class="title2">黄俊轶</div>
      </div>
      <div class="container_boxs">
        <div class="input_box" ref="box1">
          <p>用户名</p>
          <input
            type="text"
            ref="input3"
            v-model="login_username"
            @focus="click_input3"
            @blur="blur_input3"
            @keypress="login($event, 1)"
            class="input"
          />
          <p>密码</p>
          <input
            type="password"
            ref="input4"
            v-model="login_password"
            @focus="click_input4"
            @blur="blur_input4"
            @keypress="login($event, 1)"
            class="input"
          />
          <div class="remember">
            <div
              style="
                margin-left: 85%;
                color: rgb(129, 138, 212);
                cursor: pointer;
              "
              @click="jumpToRegister"
            >
              点击注册
            </div>
          </div>
          <el-button
            class="login"
            @click="login({ keyCode: '12' }, 0)"
            :loading="isLoading"
            >{{
              isLoading === true ? `请等待${second}秒` : "立即登录"
            }}</el-button
          >
        </div>
        <div class="input_box2" ref="box2">
          <p>用户名</p>
          <input
            type="text"
            ref="input1"
            v-model="register_username"
            @focus="click_input1"
            @blur="blur_input1"
            class="input"
          />
          <p>密码</p>
          <input
            type="password"
            ref="input2"
            v-model="register_password"
            @focus="click_input2"
            @blur="blur_input2"
            class="input"
          />
          <div class="remember">
            <div
              style="
                margin-left: 85%;
                color: rgb(129, 138, 212);
                cursor: pointer;
              "
              @click="jumpToLogin"
            >
              点击登录
            </div>
          </div>
          <el-button class="login" @click="register" :loading="isLoading">{{
            isLoading2 === true ? `请等待${second}秒` : "立即注册"
          }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { register as userRegister, login as userLogin } from "../axios/service";
import { ref, reactive, onMounted } from "vue";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const box1 = ref(null);
    const box2 = ref(null);
    const input1 = ref(null);
    const input2 = ref(null);
    const input3 = ref(null);
    const input4 = ref(null);
    const register_username = ref("");
    const register_password = ref("");
    const login_username = ref("");
    const login_password = ref("");
    const isLoading = ref(false);
    const isLoading2 = ref(false);
    const second = ref(0);
    const loading = ref(false);
    const jumpToRegister = () => {
      box1.value.style.left = "-100%";
      box2.value.style.left = "0";
    };
    const jumpToLogin = () => {
      box1.value.style.left = "0";
      box2.value.style.left = "100%";
    };
    const click_input1 = () => {
      input1.value.style.borderColor = "rgb(129, 138, 212)";
    };
    const blur_input1 = () => {
      input1.value.style.borderColor = "#CFCFCF";
    };
    const click_input2 = () => {
      input2.value.style.borderColor = "rgb(129, 138, 212)";
    };
    const blur_input2 = () => {
      input2.value.style.borderColor = "#CFCFCF";
    };
    const click_input3 = () => {
      input3.value.style.borderColor = "rgb(129, 138, 212)";
    };
    const blur_input3 = () => {
      input3.value.style.borderColor = "#CFCFCF";
    };
    const click_input4 = () => {
      input4.value.style.borderColor = "rgb(129, 138, 212)";
    };
    const blur_input4 = () => {
      input4.value.style.borderColor = "#CFCFCF";
    };
    const register = async () => {
      if (register_username.value && register_password.value) {
        loading.value = true;
        const result = await userRegister(
          register_username.value,
          register_password.value
        );
        if (result.data.success == true) {
          ElMessage({
            message: "用户注册成功",
            type: "success",
          });
        } else
          ElMessage({
            message: result.data.errorMsg,
            type: "error",
          });
        loading.value = false;
      } else {
        ElMessage({
          message: "请补充完整信息",
          type: "error",
        });
      }
    };
    const login = async (e, type) => {
      console.log(e);
      if (type == 0 || e.keyCode === 13) {
        if (login_username.value && login_password.value) {
          loading.value = true;
          const result = await userLogin(
            login_username.value,
            login_password.value
          );
          if (result.data.success == true) {
            ElMessage({
              message: "用户登录成功",
              type: "success",
            });
            store.dispatch("User/setToken", result.data.data.token);
            localStorage.setItem("token", result.data.data.token);
            router.push("/home?id=" + result.data.data.dataValues.id);
          } else
            ElMessage({
              message: result.data.errorMsg,
              type: "error",
            });
          loading.value = false;
        } else {
          ElMessage({
            message: "请补充完整信息",
            type: "error",
          });
        }
      }
    };
    return {
      jumpToRegister,
      jumpToLogin,
      login_username,
      login_password,
      register_username,
      register_password,
      second,
      isLoading,
      isLoading2,
      click_input1,
      click_input2,
      click_input3,
      click_input4,
      blur_input1,
      blur_input2,
      blur_input3,
      blur_input4,
      input1,
      input2,
      input3,
      input4,
      box1,
      box2,
      register,
      login,
      loading,
    };
  },
};
</script>

<style scoped>
@media screen and (max-width: 1040px) {
  .login_box {
    width: 100% !important;
    margin-left: 0 !important;
  }
}
.global {
  overflow-x: hidden;
  background-image: url("https://www.bing.com//th?id=OHR.ClingmansDome_ZH-CN0900594339_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp");
}
.geshi {
  margin-top: 7px;
}
img {
  vertical-align: center;
}
.global {
  width: 100vw;
  height: 100vh;
  /* background-image: url(../assets/bgi.png); */
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
}
.english {
  margin-top: 2vh;
}
.chinese,
.english {
  color: #ffffff;
  width: 50vw;
  word-break: break-all;
  word-wrap: break-word;
  font-size: 18px;
}
.text {
  position: absolute;
  left: 3vw;
  bottom: 21vh;
  overflow: hidden;
}
.login_box {
  width: 50%;
  height: 100%;
  margin-left: 50%;
  position: relative;
  z-index: 2;
  background-color: hsla(0, 0%, 100%, 0.85);
  overflow: hidden;
  perspective: 2000px;
  transform-style: preserve-3d;
}
.title_box {
  position: relative;
  margin-bottom: 120px !important;
  margin-top: 6vh;
  text-align: center;
  font-size: 28px;
  letter-spacing: 4px;
  font-family: 微软雅黑;
  font-weight: 500;
  color: rgb(129, 138, 212);
  transform-style: preserve-3d;
  transition: all;
  transition-duration: 2s;
  animation-name: a;
  animation-duration: 2s;
  animation-direction: alternate-reverse;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.title_box:hover {
  animation-play-state: paused;
}
@keyframes a {
  from {
  }
  to {
    transform: rotateX(-97deg);
  }
}
.title {
  text-align: center;
  width: 100%;
  height: 100%;
  position: absolute;
}
.title2 {
  text-align: center;
  width: 100%;
  height: 100%;
  position: absolute;
  transform: rotateX(82deg);
}
.version {
  font-size: 0.6em;
  letter-spacing: normal;
  padding-left: 3px;
}
.container_boxs {
  width: 70%;
  height: 390px;
  position: relative;
  overflow: hidden;
  margin-left: 15%;
}
.input_box2 {
  width: 100%;
  height: 390px;
  /* background-color: red; */
  position: absolute;
  top: 0;
  left: 100%;
  transition: all;
  transition-duration: 1s;
  overflow: hidden;
}
.input_box {
  width: 100%;
  height: 390px;
  position: absolute;
  left: 0;
  transition: all;
  transition-duration: 1s;
}
p {
  display: block;
  font-size: 14px;
  color: #4d5259;
  font-weight: 700;
}
.input {
  width: 100%;
  height: 40px;
  background-color: transparent;
  outline: none !important;
  border-color: #cfcfcf;
  border-style: solid;
  border-width: 1px;
  text-indent: 1.5em;
  border-radius: 2%;
  margin-top: 10px;
}
.input:hover {
  border-color: #a8a8a8 !important;
}
p:nth-of-type(2) {
  margin-top: 18px;
}
.remember {
  width: 100%;
  margin-top: 30px;
}
.login {
  width: 100%;
  background-color: rgb(129, 138, 212);
  color: #fffff8;
  margin-top: 18px;
}
.login2 {
  width: 100%;
  background-color: rgb(129, 138, 212);
  color: #fffff8;
  margin-top: 3px;
}
.login:hover,
.login2:hover {
  background-color: #9aa1dd;
  color: #fffff8;
}
.text1 {
  text-align: center;
  width: 100%;
  line-height: 25px;
  height: 25px;
  font-size: 14px;
  font-weight: 400;
}
.anotherlogin {
  color: rgb(129, 138, 212);
  cursor: pointer;
  font-weight: bold;
}
.what {
  color: rgb(129, 138, 212);
  cursor: pointer;
  font-weight: bold;
  margin-left: 75%;
  margin-top: 52px;
  text-decoration: none;
}
.mim {
  margin-top: 18px;
}
.text2 {
  height: 30px;
  line-height: 30px;
  display: inline-block;
  margin-left: 50%;
  font-size: 14px;
  color: #4d5259;
}
/* /deep/ .el-cascader{
      background: transparent;
    } */
.last_text {
  width: 70%;
  margin-left: 15%;
  height: 140px;
  /* background-color: yellow; */
}
div[class^="textt"] {
  width: 100%;
  height: 14.285%;
  text-align: center;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #000000;
  text-decoration: none;
}
.huohu,
.chor {
  color: rgb(129, 138, 212);
  cursor: pointer;
  text-decoration: none;
}
a {
  text-decoration: none;
  color: #000000;
}
</style>
