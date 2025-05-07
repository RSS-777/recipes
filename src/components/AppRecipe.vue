<template>
  <div class="recipe">
    <h2 class="recipe__title">{{ title }}</h2>

    <div class="recipe__content">
      <div class="block__flex">
        <ul class="recipe__ingredients">
          <li v-for="(item, index) in ingredients" :key="index">{{ item }}</li>
        </ul>
        <img class="recipe__foto" :src="photo ? photo : myImage" />
      </div>
      <p class="recipe__instructions">{{ instructions }}</p>
      <div class="recipe__info">
        <span class="recipe__time">Час приготування: <i>{{ time }}</i></span>
        <span class="recipe__servings">Кількість порцій: <i>{{ servings }}</i></span>
      </div>
    </div>
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
  max-width: 950px;
  background-color: white;
  padding: 10px;
  border-radius: 15px;
}

.recipe__title {
  text-align: center;
  color: rgb(0, 118, 33);
}

.block__flex {
  display: flex;
  justify-content: space-between;
  align-content: flex-start;
  margin: 10px 0;
}

.recipe__foto {
  max-width: 200px;
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 2px 2px 5px 0 black;
}

.recipe__ingredients {
  padding-left: 5px;
}

.recipe__ingredients li {
  list-style: none;
}

.recipe__ingredients li::before {
  content: "\1F538";
}

.recipe__instructions {
  font-style: italic;
}

.recipe__info {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  color: #3A3042;
}

.recipe__time i {
  color: #FF6723;
}

.recipe__servings i {
   color: #FF6723;
}
@media (max-width: 768px) {
  .block__flex {
    flex-direction: column;
    align-content: center;
  }

  .recipe__foto {
    margin: auto;
    order: 1;
  }

  .recipe__ingredients {
    padding-top: 5px;
    order: 2;
  }
}
</style>
