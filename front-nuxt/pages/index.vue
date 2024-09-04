<script setup lang="ts">
import { EditorList } from '~/features/editor';
import { AuthButton } from '~/features/auth';
</script>

<template>
  <div class="bg-[#F9FBFC] flex flex-col">
    <div>
      <AuthButton />
    </div>
    <EditorList></EditorList>
  </div>
</template>
