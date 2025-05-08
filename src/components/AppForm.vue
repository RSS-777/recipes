<template>
  <div class="wraper">
    <form v-if="addRecipe" @submit.prevent="onSubmit" class="form">
      <div class="form__block-input">
        <input
          id="title"
          v-model="title"
          placeholder="Введіть назву страви, наприклад: Млинці"
        />
        <p>{{ titleError }}</p>
      </div>
      <div class="form__block-input">
        <textarea
          id="ingredients"
          v-model="ingredients"
          placeholder="Введіть інгредієнти, розділені комами (наприклад: картопля 1кг, морква 2шт, цибуля 1шт)"
        ></textarea>
        <p>{{ ingredientsError }}</p>
      </div>
      <div class="form__block-input">
        <textarea
          id="instructions"
          v-model="instructions"
          placeholder="Опишіть покрокову інструкцію приготування"
        ></textarea>
        <p>{{ instructionsError }}</p>
      </div>
      <div class="form__block-input">
        <input
          id="time"
          type="text"
          v-model="time"
          placeholder="Час приготування (наприклад: 30 хвилин)"
        />
        <p>{{ timeError }}</p>
      </div>
      <div class="form__block-input">
        <input
          id="servings"
          type="number"
          v-model="servings"
          placeholder="Кількість порцій"
        />
        <p>{{ servingsError }}</p>
      </div>
      <div class="form__block-input">
        <input
          id="photo"
          type="text"
          v-model="photo"
          placeholder="Введіть URL зображення"
        />
        <p>{{ photoError }}</p>
      </div>
      <div class="form__block-input">
        <select id="category" v-model="category">
          <option value="">Вкажіть категорію</option>
          <option value="salads">Салати</option>
          <option value="soups">Супи</option>
          <option value="snacks">Закуски</option>
          <option value="meat">М'ясні страви</option>
          <option value="fish">Рибні страви</option>
          <option value="sides">Гарніри</option>
          <option value="vegetable">Овочеві страви</option>
          <option value="porridge">Каші</option>
          <option value="bakery">Випічка</option>
          <option value="bread">Хліб</option>
          <option value="desserts">Десерти</option>
          <option value="drinks">Напої</option>
          <option value="sauces">Соуси</option>
          <option value="preserves">Консервація</option>
          <option value="fastfood">Фастфуд домашній</option>
          <option value="vegetarian">Вегетаріанські страви</option>
          <option value="other">Інше</option>
        </select>
        <p>{{ categoryError }}</p>
      </div>
      <AppButton type="submit">Зберегти рецепт</AppButton>
    </form>
    <AppButton @button-click="handleOpenForm">{{
      addRecipe ? "Скасувати додавання рецепта" : "Додати новий рецепт"
    }}</AppButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import AppButton from "./AppButton.vue";
import * as yup from "yup";
const emit = defineEmits(["recipe-added"]);
const addRecipe = ref<boolean>(false);

interface IRecipeFormValues {
  title: string;
  ingredients: string;
  instructions: string;
  time: string;
  servings: number | null;
  photo?: string | null;
  category: string;
}

interface IRecipeValuesSubmit extends Omit<IRecipeFormValues, "ingredients"> {
  ingredients: string[];
}

const handleOpenForm = () => {
  addRecipe.value = !addRecipe.value;
};

const schema = yup.object({
  title: yup
    .string()
    .trim()
    .required("Заголовок обовʼязковий")
    .matches(/^[^\d]*$/, "Заголовок не повинен містити цифри"),

  ingredients: yup
    .string()
    .trim()
    .required("Поле з інгредієнт не може бути порожнім"),

  instructions: yup
    .string()
    .trim()
    .required("Поле з інструкцією не може бути порожнім"),

  time: yup.string().trim().required("Не задано час приготування"),

  servings: yup
    .number()
    .typeError("Порції мають бути числом")
    .positive("Кількість порцій має бути більшою за 0")
    .integer("Порції повинні бути цілим числом")
    .required("Поле з порціями обов'язкове"),

  photo: yup
    .string()
    .url("Неправильне посилання на фото")
    .nullable()
    .notRequired(),

  category: yup.string().required("Необхідно вказати категорію"),
});

const { handleSubmit } = useForm<IRecipeFormValues>({
  validationSchema: schema,
  initialValues: {
    title: "",
    ingredients: "",
    instructions: "",
    time: "",
    servings: null,
    photo: "",
    category: "",
  },
});

const { value: title, errorMessage: titleError } = useField<string>("title");
const { value: ingredients, errorMessage: ingredientsError } =
  useField<string>("ingredients");
const { value: instructions, errorMessage: instructionsError } =
  useField<string>("instructions");
const { value: time, errorMessage: timeError } = useField<string>("time");
const { value: servings, errorMessage: servingsError } =
  useField<number>("servings");
const { value: photo, errorMessage: photoError } = useField<string>("photo");
const { value: category, errorMessage: categoryError } =
  useField<string>("category");

const createRecipe = async (recipe: IRecipeValuesSubmit) => {
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe }),
    });

    const dataFetch = await response.json();
    emit("recipe-added");
    addRecipe.value = false;
    // console.log("Молливо використаю для редагування через id", dataFetch);
  } catch (error) {
    console.error("Error inserting recipe:", error);
  }
};

const onSubmit = handleSubmit((values: IRecipeFormValues) => {
  const ingredientsArray = values.ingredients
    .split(", ")
    .map((i: string) => i.trim())
    .filter(Boolean);
  const recipe = { ...values, ingredients: ingredientsArray };
  createRecipe(recipe);
});
</script>

<style scoped>
.wraper {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
}

.form {
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 1px 1px 8px 0 black;
  max-width: 350px;
  width: 100%;
  background-color: #3a3042;
  border-radius: 10px;
}

.form__block-input {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 5px;
}

.form__block-input input {
  padding: 2px 5px;
  outline-style: none;
  border-radius: 5px;
}

.form__block-input textarea {
  padding: 2px 5px;
  outline-style: none;
  border-radius: 5px;
  resize: none;
  height: 80px;
}

.form__block-input select {
  padding: 2px 5px;
  outline-style: none;
  border-radius: 5px;
  width: fit-content;
  margin: auto;
  text-align: center;
}

.form__block-input p {
  font-size: 11px;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  color: #db9d47;
}

.form button {
  margin-top: 10px;
}
</style>
