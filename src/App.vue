<script setup>
import { Toaster } from "vue-sonner";
import "vue-sonner/style.css";
</script>

<template>
  <Toaster position="TOP-right" richColors />
  <router-view />
</template>
