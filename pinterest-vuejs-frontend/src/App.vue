<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <div>{{ count }}</div>
        <button type="button" @click="count++">a</button>
      </nav>
    </div>
  </header> -->
  <div class="w-[95%] mx-auto py-3 space-y-6">
    <header>
      <div class="flex items-center gap-3">
        <div class="flex-none w-auto flex items-center gap-3">
          <img
            class="w-9 h-9"
            src="https://longphanportfolio.vercel.app/_next/static/media/logoML.e1614194.svg"
            alt=""
          />
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/create">Create</RouterLink>
        </div>
        <div class="grow w-full">02</div>
        <div class="flex-none w-auto">03</div>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
