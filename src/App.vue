<script setup lang="ts">
import AppForm from "./components/AppForm.vue";
import AppRecipe from "./components/AppRecipe.vue";
import { ref, onMounted } from "vue";

interface IRecipe {
  title: string;
  ingredients: string[];
  instructions: string;
  time: string;
  servings: number;
  photo?: string | null;
  categories: string;
}
const recipes = ref<IRecipe[]>([]);

async function getRecipes() {
  try {
    const response = await fetch("/api/posts");
    const allRecipes = await response.json();
    if (allRecipes) {
      recipes.value = allRecipes;
    }
  } catch (error) {
    console.error("Error fetching all recipes:", error);
  }
}

onMounted(() => {
  getRecipes();
});

const handleCategory = (value: string) => {};
</script>

<template>
  <header>
    <h1>Платформа для обміну рецептами з друзями та родиною.</h1>
  </header>

  <main>
    <aside class="category">
      <span class="category__title">Категорії рецептів:</span>
      <div class="category__slide">
        <nav>
          <button @click="handleCategory('all')">Всі</button>
          <button @click="handleCategory('salads')">Салати</button>
          <button @click="handleCategory('soups')">Супи</button>
          <button @click="handleCategory('snacks')">Закуски</button>
          <button @click="handleCategory('main')">Основні страви</button>
          <button @click="handleCategory('meat')">М'ясні страви</button>
          <button @click="handleCategory('fish')">Рибні страви</button>
          <button @click="handleCategory('sides')">Гарніри</button>
          <button @click="handleCategory('vegetable')">Овочеві страви</button>
          <button @click="handleCategory('porridge')">Каші</button>
          <button @click="handleCategory('bakery')">Випічка</button>
          <button @click="handleCategory('bread')">Хліб</button>
          <button @click="handleCategory('desserts')">Десерти</button>
          <button @click="handleCategory('drinks')">Напої</button>
          <button @click="handleCategory('sauces')">Соуси</button>
          <button @click="handleCategory('preserves')">Консервація</button>
          <button @click="handleCategory('fastfood')">Фастфуд домашній</button>
          <button @click="handleCategory('vegetarian')">
            Вегетаріанські страви
          </button>
          <button @click="handleCategory('other')">Інше</button>
        </nav>
      </div>
    </aside>
    <section>
      <AppRecipe
        @recipe-added="getRecipes"
        v-for="(item, index) in recipes"
        :key="index"
        :title="item.title"
        :ingredients="item.ingredients"
        :instructions="item.instructions"
        :time="item.time"
        :servings="item.servings"
        :photo="item.photo"
      />
      <p v-if="!recipes.length">Завантаження...</p>
      <!-- <p v-if="!filteredRecipes.length">Немає рецептів у цій категорії</p> -->
    </section>
    <section>
      <AppForm />
    </section>
  </main>
</template>

<style scoped>
main {
  display: grid;
}

.category {
  width: vw;
  max-width: 100%;
}

.category__title {
}

.category__slide {
  border: 2px solid black;
  width: 100%; 
  overflow-x: auto;
  max-width: 950px;
  overflow-x: scroll;
  white-space: nowrap; 
  box-sizing: border-box; 
}

.category__slide nav {
  display: flex; /* Використовуємо flexbox для розташування кнопок в один рядок */
  flex-wrap: nowrap;
}

.category__slide button {
  width: auto;
}
</style>
