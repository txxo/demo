import { writable } from 'svelte/store'

const PollStore = writable([
  {
    id: Math.random(),
    quest: 'Python or Java',
    ansA: 'Python',
    ansB: 'Java',
    voteA: 2,
    voteB: 1,
  },
  {
    id: Math.random(),
    quest: 'Vue or React',
    ansA: 'Vue',
    ansB: 'React',
    voteA: 0,
    voteB: 0,
  },
  {
    id: Math.random(),
    quest: 'Svelte or Angular',
    ansA: 'Svelte',
    ansB: 'Angular',
    voteA: 1,
    voteB: 1,
  },
])


export default PollStore