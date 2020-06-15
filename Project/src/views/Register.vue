<template>
  <div class="register">
    <LoginForm />
    <RegisterForm />
  </div>
</template>

<script>
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";

export default {
  name: "Register",
  components: {
    LoginForm,
    RegisterForm
  }
};
</script>

<style>
.register {
  height: 50vh;
  overflow: auto;
  padding-top: 10vh;
  padding-bottom: 10vh;
}
</style>
