<template>
   <div>
      <EventCard />
      <!-- <BookEvent /> -->
   </div>
</template>

<script>
import EventCard from '@/components/EventCard'
// import BookEvent from '@/components/BookEvent'
export default {
    name: "UserPage",
      components: {
    EventCard, 
    // BookEvent
  },
    data (){
    return {
        events: []
    }
    },
    mounted () {
  },
}
</script>