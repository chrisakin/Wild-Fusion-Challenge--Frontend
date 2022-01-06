<template>
    <div>
    <EventCard />
    </div>
</template>

<script>
import EventCard from '@/components/EventCard'
export default {
    name: "Home",
    components: {
    EventCard, 
  },
    data (){
      return {
          events: [],

        }
    },
      mounted () {
        
  },
    methods: {
    
    }
}
</script>