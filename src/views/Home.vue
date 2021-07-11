<template>
  <div class="home">
    <ul>
      <li></li>
    </ul>
    <card></card>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent , getCurrentInstance, ref, onMounted, reactive, toRef, toRefs, customRef, computed, onBeforeMount} from 'vue';
import { useRoute, useRouter } from 'vue-router'
import Card from './Card.vue'
// import { state, mutations } from '@/store/reactive-store.ts';
function useDoubenceRef(value:unknown='', delay:number=300){
  let timer:any 
  return customRef( (track, trigger) => ({
    get(){
      track()
      console.log('tack=>', value)
      if(value === 'hello') { return 'doubence hello value'}
      return value
    },
    set(newValue){
      clearTimeout(timer)
      timer = setTimeout(() => {
        value = newValue
        trigger()
      }, delay)
    }
  }))
}
const asyncNextPage = defineAsyncComponent({
  loader: () => import('./NextPage.vue'),
  delay: 6000,
  timeout: 3000,
})
import { useStore } from 'vuex';
export default defineComponent({
  // directives: {
  //   'mfocus': {
  //     mounted: function(el){
  //       el.focus()
  //     }
  //   }
  // },
  components: {
    asyncNextPage,
    Card
  },
  setup(){
    const { proxy }: any = getCurrentInstance()
    console.log(proxy)
    const msg = ref('this is msg');
    const msgRef = ref()
    const vtext = useDoubenceRef('', 800)
    const rstate:any = reactive({
      color: 'blue',
      rcount: 1
    })
    const route = useRoute()
    const router = useRouter()
    const fmState:any = toRefs(rstate)
    const userList = reactive([])
    onMounted( () => {
      console.log('home onMounted')
      for(let i = 0; i < 20; i++){
        
      }
    })

    //-- store
    const store = useStore()
    console.log(store)
    const count = store.state.count
    const getterCount = computed( () => store.state.count)
    const countAdd = () => {
      fmState.rcount.value += 1
      store.commit('ADD_COUNT', 1)
    }

    return {
      msg,
      msgRef,
      vtext,
      ...fmState,
      count,
      getterCount,
      route,
      countAdd,

    }
  }
})

</script>
<style lang="less" scoped>
.home{
  background-color:#eee;
  p{
    color:blueviolet;
  }
}
</style>

