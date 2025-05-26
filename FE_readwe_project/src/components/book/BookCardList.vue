<template>
    <BookCard v-for="book in props.books" :keys=book.pk :book="book" />
</template>

<script setup>
import BookCard from './BookCard.vue'

const props = defineProps({
    books: Array
})
</script>
