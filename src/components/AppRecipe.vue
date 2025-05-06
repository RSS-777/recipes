<template>
  <div class="recipe">
    <h2 class="recipe__title">{{ title }}</h2>

    <div class="recipe__content">
      <div>
        <ul class="recipe__ingredients">
          <li v-for="(item, index) in ingredients" :key="index">{{ item }}</li>
        </ul>
        
        <span class="recipe__time">{{ time }}</span>
        <span class="recipe__servings">{{ servings }}</span>
      </div>
      <img class="recipe__foto" :src="photo ? photo : myImage" />
    </div>
    <p class="recipe__instructions">{{ instructions }}</p>
  </div>
</template>

<script setup lang="ts">
import myImage from "../assets/images/pancakes.jpg";

interface Props {
  title: string;
  ingredients: string[];
  instructions: string;
  time: string;
  servings: number;
  photo?: string | null;
}

const { title, ingredients, instructions, time, servings, photo } =
  defineProps<Props>();
</script>

<style scoped>
.recipe {
  position: relative;
  border: 2px solid red;
  max-width: 950px;
}

.recipe__content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: 2px solid green;
}

.recipe__ingredients {
   margin: auto;
   padding-left: 5px;
}

.recipe__ingredients li{
   list-style: none;
   position: relative;
}

.recipe__ingredients li::before{
  content: "\1F538"; 
}

.recipe__foto {
  max-width: 200px;
  width: 100%;
  height: auto;
}

.recipe__title {
  text-align: center;
  color: rgb(0, 118, 33);
}
</style>
