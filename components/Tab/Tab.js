// components/Tab/Tab.js
Component({
    /**
   * 组件的属性列表
   */
  properties:{
    tabsData:{
      type:Array,
      value:[]
    }
  },
  methods: {
    handleChange(e){
      // console.log(e);
      const {id}=e.currentTarget.dataset
      // 触发父组件的事件，更改当前acitve的tab栏
      this.triggerEvent("itemChange",{id})
    }
  }
})
