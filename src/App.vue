<script setup lang="ts">
import AppForm from "./components/AppForm.vue";
import AppRecipe from "./components/AppRecipe.vue";
import { ref, onMounted } from "vue";
const selected = ref<string>("all");
const isLoading = ref(true);

interface IRecipe {
  title: string;
  ingredients: string[];
  instructions: string;
  time: string;
  servings: number;
  photo?: string | null;
  category: string;
}
const recipes = ref<IRecipe[]>([]);
const filteredRecipes = ref<IRecipe[]>([]);

async function getRecipes() {
  isLoading.value = true;

  try {
    const response = await fetch("/api/posts");
    const allRecipes = await response.json();
    if (allRecipes) {
      recipes.value = allRecipes;
      handleCategory(selected.value);
    }
  } catch (error) {
    console.error("Error fetching all recipes:", error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  getRecipes();
});

const handleCategory = (value: string) => {
  selected.value = value;
  if (value === "all") {
    filteredRecipes.value = recipes.value;
  } else {
    filteredRecipes.value = recipes.value.filter(
      (item) => item.category === value
    );
  }
};
</script>

<template>
  <div class="wrapper">
    <header class="header">
      <h1>Зберігай, шукай і ділись смачними ідеями</h1>
    </header>

    <aside class="aside">
      <h4 class="aside__title">Категорії рецептів:</h4>
      <div class="aside__slide">
        <nav class="aside__nav">
          <button
            @click="handleCategory('all')"
            :class="{ active: selected === 'all' }"
          >
            Всі
          </button>
          <button
            @click="handleCategory('salads')"
            :class="{ active: selected === 'salads' }"
          >
            Салати
          </button>
          <button
            @click="handleCategory('soups')"
            :class="{ active: selected === 'soups' }"
          >
            Супи
          </button>
          <button
            @click="handleCategory('snacks')"
            :class="{ active: selected === 'snacks' }"
          >
            Закуски
          </button>
          <button
            @click="handleCategory('main')"
            :class="{ active: selected === 'main' }"
          >
            Основні страви
          </button>
          <button
            @click="handleCategory('meat')"
            :class="{ active: selected === 'meat' }"
          >
            М'ясні страви
          </button>
          <button
            @click="handleCategory('fish')"
            :class="{ active: selected === 'fish' }"
          >
            Рибні страви
          </button>
          <button
            @click="handleCategory('sides')"
            :class="{ active: selected === 'sides' }"
          >
            Гарніри
          </button>
          <button
            @click="handleCategory('vegetable')"
            :class="{ active: selected === 'vegetable' }"
          >
            Овочеві страви
          </button>
          <button
            @click="handleCategory('porridge')"
            :class="{ active: selected === 'porridge' }"
          >
            Каші
          </button>
          <button
            @click="handleCategory('bakery')"
            :class="{ active: selected === 'bakery' }"
          >
            Випічка
          </button>
          <button
            @click="handleCategory('bread')"
            :class="{ active: selected === 'bread' }"
          >
            Хліб
          </button>
          <button
            @click="handleCategory('desserts')"
            :class="{ active: selected === 'desserts' }"
          >
            Десерти
          </button>
          <button
            @click="handleCategory('drinks')"
            :class="{ active: selected === 'drinks' }"
          >
            Напої
          </button>
          <button
            @click="handleCategory('sauces')"
            :class="{ active: selected === 'sauces' }"
          >
            Соуси
          </button>
          <button
            @click="handleCategory('preserves')"
            :class="{ active: selected === 'preserves' }"
          >
            Консервація
          </button>
          <button
            @click="handleCategory('fastfood')"
            :class="{ active: selected === 'fastfood' }"
          >
            Фастфуд домашній
          </button>
          <button
            @click="handleCategory('vegetarian')"
            :class="{ active: selected === 'vegetarian' }"
          >
            Вегетаріанські страви
          </button>
          <button
            @click="handleCategory('other')"
            :class="{ active: selected === 'other' }"
          >
            Інше
          </button>
        </nav>
      </div>
    </aside>

    <main class="main">
      <section class="content-section">
        <AppRecipe
          v-for="(item, index) in filteredRecipes"
          :key="index"
          :title="item.title"
          :ingredients="item.ingredients"
          :instructions="item.instructions"
          :time="item.time"
          :servings="item.servings"
          :photo="item.photo"
        />
        <p v-if="!recipes.length && isLoading" class="status-indicator">
          Завантаження...
        </p>
        <p v-else-if="!filteredRecipes.length && !isLoading" class="status-indicator">
          Немає рецептів у цій категорії
        </p>
      </section>
      <section class="recipe-add-section">
        <AppForm @recipe-added="getRecipes" />
      </section>
    </main>
  </div>
</template>

<style scoped>
/* 1 #3A3042
2  #DB9D47
3 #A1CCA5
4 #EFEFEF */
.wrapper {
  background-color: #efefef;
  display: grid;
  grid-template-areas:
    "header"
    "main";
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr;
  position: relative;
  max-width: 950px;
  margin: auto;
  min-height: 100vh;
}

header {
  grid-area: header;
  margin-left: 160px;
  text-align: center;
}

header h1 {
  color: #3a3042;
  background-color: #a1cca5;
  padding: 20px;
}

main {
  grid-area: main;
  margin-left: 160px;
}

.aside {
  grid-area: aside;
  padding: 10px;
  text-align: center;
  background-color: #3a3042;
  position: fixed;
  height: 100vh;
  width: 160px;
}

.aside__title {
  margin-bottom: 15px;
  color: white;
}

.aside__nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.aside__nav button {
  border: none;
  box-shadow: 0.5px 0.5px 3px 0 black;
  border-radius: 4px;
  padding: 2px 5px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  background-color: #db9d47;
}

.aside__nav button:hover {
  box-shadow: 0.5px 0.5px 1px 0 rgb(111, 111, 111);
  transform: scale(0.98);
}

.aside__nav .active {
  box-shadow: 0.5px 0.5px 1px 0 rgb(111, 111, 111);
  transform: scale(0.98);
  color: white;
}

.content-section {
  grid-area: content-section;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.recipe-add-section {
  grid-area: recipe-add-section;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.status-indicator {
    font-size: 18px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 2px solid  black;
    border-radius: 15px;
    color: #007621;
  }

@media (max-width: 580px) {
  .wrapper {
    grid-template-areas:
      "header"
      "aside"
      "main";
    justify-content: center;
  }

  header {
    margin-left: auto;
  }

  main {
    margin-left: auto;
    width: 100%;
  }

  .aside {
    z-index: 2;
    padding: 10px;
    position: sticky;
    top: 0;
    height: max-content;
    width: 100vw;
    max-width: 100%;
    align-self: start;
  }

  .aside__title {
    margin-bottom: 5px;
  }

  .aside__slide {
    overflow: auto;
  }

  .aside__nav {
    flex-direction: row;
    gap: 5px;
    min-width: max-content;
    padding: 0 5px 10px;
  }
}
</style>
