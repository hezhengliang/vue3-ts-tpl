<template>
  <div class="tab-container">
    <h1>{{msg}}</h1>
    <!-- <tab-container :navList="navList" navClass="nav" :style="`height: ${tabContainerHeight}px;`">
      <template 
        v-slot:[`content-${index}`]
        v-for="(listItem, index) in list" 
        class="contnt-box"
        :key="index">
        <div class="content-item" v-for="(item, idx) in listItem" :key="idx">
          <div class="img-box"></div>
          <div class="title">{{item.title}}</div>
        </div>
      </template>
    </tab-container> -->
    <!-- <a @click.stop="goAbout">go About</a>
    <ul>
      <li v-for="item in 10" :ref="setItemRef" :key="item" @click="click">{{item}}测试动态ref list</li>
    </ul> -->
    <button @click="handleButtonClick">点击++</button>
    <hr/>
    <div class="tabs" style="width:300px;overflow:hidden;border:1px solid red;height:32px;margin:0 auto;">
      <div 
        role="tablist" 
        aria-label="Sample Tabs" 
        ref="navRef"
        style="
        position: relative;
        height:100%;
        display: flex;overflow-x: auto;
        overflow-y: hidden;">
        <div 
        class="van-tab"
          v-for="(item, index) in 8" 
          :ref="setTitleRefs(index)"
          :aria-selected="item === tabActive"
          @click="clickTabActive(item)"
          :key="item" >
          标签{{item}}
        </div>
      </div>
  </div>
  </div>
</template>

<script>

import {onMounted, ref, onBeforeUpdate, onUpdated, nextTick, reactive} from 'vue'
import { useRouter } from 'vue-router'
import useRefs from '@/use-utils/use-refs.js'

const inBrowser = typeof window !== 'undefined';
const root = inBrowser ? window : global;
let prev = Date.now();
function rafPolyfill(fn) {
  const curr = Date.now();
  const ms = Math.max(0, 16 - (curr - prev));
  const id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}

export function raf(fn) {
  const requestAnimationFrame = root.requestAnimationFrame || rafPolyfill;
  return requestAnimationFrame.call(root, fn);
}

export function cancelRaf(id) {
  const cancelAnimationFrame = root.cancelAnimationFrame || root.clearTimeout;
  cancelAnimationFrame.call(root, id);
}

// double raf for animation
export function doubleRaf(fn) {
  raf(() => {
    raf(fn);
  });
}

let rafId;
export function scrollLeftTo( scroller, to, duration) {
  cancelRaf(rafId);

  let count = 0;
  const from = scroller.scrollLeft;
  const frames = duration === 0 ? 1 : Math.round((duration * 1000) / 16);
  function animate() {
    scroller.scrollLeft += (to - from) / frames;

    if (++count < frames) {
      rafId = raf(animate);
    }
  }

  animate();
}
export default {
  beforeCreate() {
    console.log('beforeCreated lifecucle')
  },
  created(){
    console.log('created lifecycle')
  },
  mounted(){
    console.log(this)
    console.log('mounted lifecycle')
  },
  setup(props, context) {
    
    const itemRefs = ref([])
    const arr = reactive({
      count: {
        value: 2
      },
      value: 333
    })
    
    arr.count.value = 3
    // console.log(arr)
    // this.$set()
    // itemRefs.value.pus
    // console.log(arr.test.psuh*())
    const msg = ref('test msg')
    // console.log(msg.value)
    const setItemRef = (el) => {
      // console.log(el)
      itemRefs.value.push(el)
    }
    console.log('beforeCreated&created composition lieftcycle')
    // onBeforeUpdate(() => {
    //   itemRefs = []
    // })
    onUpdated(() => {
      // console.log(itemRefs)
    })
    const click = () => {

    }
    
    const router = useRouter()
    const goAbout = () => {
      router.push('/about')
    }
    const navRef = ref()
    const [titleRefs, setTitleRefs] = useRefs();
    const tabActive = ref(1)
    const clickTabActive = (index) => {
      console.log(index)
      tabActive.value = index
      scrollIntoView()
    }
    //==================
    const refVal = ref({
      a: 1,
      b: 2,
      c: {
        d: 3
      },
      e: [1, 2, 3],
      f: [1, 2, 3]
    })
  
    const reactiveVal = reactive({
      a: 1,
      b: 2,
      c: {
        d: 3
      },
      e: [1,2, 3],
      f: [1, 2, 3]
    })
    console.log('============')
    console.log(msg, refVal)
    console.log(reactiveVal)
    const rarr = reactive([])
    const handleButtonClick = () => {
      refVal.value.c.d = 5
      reactiveVal.c.d = 5
      // refVal.value.c.q = 9
      // reactiveVal.c.q = 9
      // refVal.value.e[2] = 6
      // reactiveVal.e[2]= 6
      // refVal.value.f.push(7, 8, 9)
      // reactiveVal.f.push(7, 8, 9)
      console.log('+++++++++++++++++')
      rarr.push(...[1, 2, 3])
      console.log(rarr, reactiveVal)
    }
    onMounted( () => {
      console.log('onMounted composition lifecycle')
      let count = 0, timer = null
      timer = setInterval( _ => {
        count++
        if(count > 30){
          count = 0
        }
      })
      nextTick( () => {
      console.log(titleRefs)
      })
      
    })
    const scrollIntoView = (immediate=false) => {
      const nav = navRef.value;
      const titles = titleRefs.value;

      if (!titles[tabActive.value]) {
        return;
      }

      const title = titles[tabActive.value];
      console.log( titles[tabActive.value])
      // console.log(titles,tabActive.value, title )
      // debugger
      const to = title.offsetLeft - (nav.offsetWidth - title.offsetWidth) / 2;

      scrollLeftTo(nav, to, immediate ? 0 : 0.3);
    };
    return {
      msg,
      click,
      setItemRef,
      goAbout,
      navRef,
      tabActive,
      clickTabActive,
      setTitleRefs,
      handleButtonClick
    }
  }

}
</script>

<style>
.van-tab{
  position: relative;
  display: flex;
  flex: 1 0 auto;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 14px;
  color: #646566;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
}
.tab-container {
  width: 100%;
  height: 100%;
}

.content-box .content-item:nth-child(odd) {
  margin: 0 3% 0 7%;
}
.content-box .content-item:nth-child(even) {
  margin: 0 7% 0 3%;
}
.content-box .content-list .content-item {
  width: 40%;
  float: left;
  border: 1px solid;
  box-sizing: border-box; 
  margin-top: .46rem;
}
.content-box .content-item .img-box {
  width: 100%;
  height: 40vw;
  background: rgba(205, 205, 205, 1);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.content-box .content-item .title {
  font-size: 1.6rem;
  margin: .4rem .4rem;
  line-height: 1rem;
  word-break: break-all;
}

</style>