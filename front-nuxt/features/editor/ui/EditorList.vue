<template>
  <div class="border border-1 border-red-500">
    <editor-content :editor="editor" v-if="editor" />
  </div>
</template>

<script setup lang="ts">
import { HocuspocusProvider } from '@hocuspocus/provider';
import { useEditor, Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { Collaboration } from '@tiptap/extension-collaboration';

const provider = new HocuspocusProvider({
  url: 'ws://127.0.0.1:1234',
  name: `project-${1}-${1}`,
})

const editor = new Editor({
  extensions: [
    StarterKit.configure({
      // The Collaboration extension comes with its own history handling
      history: false,
    }),
    // Register the document with Tiptap
    Collaboration.configure({
      document: provider.document,
    }),
  ],
})

</script>
