import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useActivityStore = defineStore('activity', () => {
    //state
    const recentPages = ref<Array<string>>([])
  
    //actions
    function logRouteVisit(route:string) {
        recentPages.value.push(route)
    }

    function getMostVisitedPages(limit:number):Array<string> {
        const stringCounts = recentPages.value.reduce((acc, str) => {
            //@ts-expect-error
            acc[str] = (acc[str] || 0) + 1;
            return acc;
        }, {});
    
        const sortedStrings = Object.keys(stringCounts).sort((a, b) => {
            //@ts-expect-error
            return stringCounts[b] - stringCounts[a];
        });
    
        return sortedStrings.slice(0, limit);
    }

    return {
        recentPages,
        //method
        logRouteVisit,
        getMostVisitedPages
    }
})