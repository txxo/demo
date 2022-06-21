<script>
  import Header from './components/Header.svelte'
  import Footer from './components/Footer.svelte'
  import PollList from './components/PollList.svelte'
  import Tabs from './shared/Tabs.svelte'
  import Createpoll from './components/Createpoll.svelte'

  let items = ['Current Polls', 'Add New Polls']

  let activeItem = 'Current Polls'
  const tabChange = (item) => {
    activeItem = item.detail
  }
  const addHandler = (e) => {
    activeItem = 'Current Polls'
  }

</script>

<Header />
<main>
  <Tabs {activeItem} {items} on:tabChange={tabChange} />
  {#if activeItem === 'Current Polls'}
    <PollList  />
  {:else if activeItem === 'Add New Polls'}
    <Createpoll on:add={addHandler} />
  {/if}
</main>
<Footer />

<style>
  main {
    max-width: 960px;
    margin: 40px auto;
  }
</style>
