<template>
  <div class="border border-1 border-red-500">
    <editor-content :editor="editor" v-if="editor"/>
  </div>
</template>

<script setup lang="ts">
import {HocuspocusProvider} from '@hocuspocus/provider';
import {useEditor, Editor, EditorContent} from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import {Collaboration} from '@tiptap/extension-collaboration';

const isFirstInput = ref(false)
const route = useRoute()


const provider = new HocuspocusProvider({
  url: 'ws://127.0.0.1:1234',
  name: `project-${1}-${1}`,
})

const editor = ref(new Editor({
  onUpdate({editor}) {
    // The content has changed.
    console.log('editor', editor)
  },
  extensions: [
    StarterKit.configure({
      // The Collaboration extension comes with its own history handling
      history: false,
    }),
    // Register the document with Tiptap
    // Collaboration.configure({
    //   document: provider.document,
    // }),
  ],
}))

// editor.value = useEditor({
//   onUpdate({editor}) {
//     // The content has changed.
//     console.log('editor', editor)
//   },
//   extensions: [
//     StarterKit.configure({
//       // The Collaboration extension comes with its own history handling
//       history: false,
//     }),
//     // Register the document with Tiptap
//     Collaboration.configure({
//       document: provider.document,
//     }),
//   ],
// })

onMounted(() => {
  const query = Object.keys(route.query)
  // отработает если ссылка = http://localhost:3001/?page=asdasdassa
  if (query.includes('page') && !!route.query.page) {
    console.log(route.query.page, 'квери параметр есть')
    editor.value = new Editor({
      onUpdate({editor}) {
        // The content has changed.
        console.log('editor', editor)
      },
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
  }
  // отработает если хэша нет = http://localhost:3001
  else if (!query.length) {
    // создаем новую страницу при вводе
    console.log('создаем новую страницу при вводе');
  }
  console.log(Object.keys(route.query), 'ggg');
})


</script>
