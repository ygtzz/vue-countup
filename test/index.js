const { countup } = VueCountup;

new Vue({
  name:'c-app',
  el: '#container',
  created() {
      
  },
  data() {
    return {
        from:0,
        to:8000,
        startUp:false
    }
  },
  methods:{
    fStartCountUp(){
        this.startUp = !this.startUp;
        this.to += 1;
    }
  },
  components: {
    'c-countup':countup
  }
});