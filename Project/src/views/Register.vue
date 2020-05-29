<template>
  <div>
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

</style>
