<template>
  <div class="card-container" ref="cardRef">
    <div class="tinder">
      <div class="tinder--cards">
        <div class="tinder--card" style="background-color:green">
          <h1>1</h1>
        </div>
        <div class="tinder--card" style="background-color:blue">
          <h1>2</h1>
        </div>
        <div class="tinder--card" style="background-color:#555">
          <h1>3</h1>
        </div>
        <div class="tinder--card" style="background-color:#06c">
          <h1>4</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {initCards, addHammers, myFunction} from '@/utils/swipe-through.js'
export default {
  mounted(){
    this.$nextTick( () => {
      this.initCardsFunc()
    })
    
  },
  methods:{
    initCardsFunc(){
      initCards()
      addHammers()
    }
  }

}
</script>
<style lang="less" scoped>
.card-container{
  width:100%;
  height: 100vh;
  overflow: hidden;
}
.tinder {
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	position: relative;
	opacity: 0;
	transition: opacity 0.1s ease-in-out;
}
.loaded.tinder {
	opacity: 1;
}
.tinder--cards {
	flex-grow: 1;
	padding-top: 40px;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	z-index: 1;
}

.tinder--card {
	display: inline-block;
	width: 90vw;
	max-width: 380px;
	height: 65vh;
	padding-bottom: 30px;
	border-radius: 8px;
	overflow: hidden;
	position: absolute;
	will-change: transform;
	transition: all 0.3s ease-in-out;
	cursor: -webkit-grab;
	cursor: -moz-grab;
	cursor: grab;
  overflow-y: auto;
  border:1px solid brown;
  border-radius: 6px;
}

.moving.tinder--card {
	transition: none;
	cursor: -webkit-grabbing;
	cursor: -moz-grabbing;
	cursor: grabbing;
}


.tinder--card img {
	width: 100%;
  pointer-events: none;
  height:100%;
}


/* width */
::-webkit-scrollbar {
	width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
	box-shadow: inset 0 0 3px grey;
	border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: lightyellow;
	border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: lightgoldenrodyellow;
}
</style>