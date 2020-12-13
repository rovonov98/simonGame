<template>
  <div id="app">
    <Game />
  </div>
</template>

<script>
import Game from './components/Game'
export default {
  components: {
    Game
  }
}
</script>

<style lang="scss">
  body {
    background: #000000;
    display: flex;
    justify-content: center;
    align-self: center;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  @media(max-width: 576px) {
    :root {
      font-size: 9px;
    }
  }
  @media(min-width: 576px) {
    :root {
      font-size: 12px;
    }
  }
  @media(min-width: 768px) {
    :root {
      font-size: 14px;
    }
  }
  @media(min-width: 992px) {
    :root {
      font-size: 16px;
    }
  }
  @media(min-width: 1200x) {
    :root {
      font-size: 18px;
    }
  }
</style>
