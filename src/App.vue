<template>
  <div class="app" id="app">
    <header>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-container>
          <router-link class="navbar-brand" to="/">England Challenge</router-link>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
              <router-link class="nav-link" to="/testing">Game # 1</router-link>
              <router-link class="nav-link" to="/testing-2">Game # 2</router-link>
              <router-link class="nav-link" to="/testing-3">Game # 3</router-link>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    </header>
    <router-view/>
  </div>
</template>
<script>

export default {
  name: 'App',

}
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex-grow: 1;
  max-height: calc(100% - 56px);
}
</style>
