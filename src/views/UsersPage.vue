<template>
   <div>
      <EventCard />
   </div>
</template>

<script>
import EventCard from '@/components/EventCard'
export default {
    name: "UserPage",
      components: {
    EventCard, 
  },
    data (){
    return {
        events: []
    }
    },
    mounted () {
      sessionStorage.removeItem('token')
  },
}
</script>