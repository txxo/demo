<script>
  import Button from '../shared/Button.svelte'
  import Card from '../shared/Card.svelte'
  import PollStore from '../stores/PollStore'
  import { tweened } from 'svelte/motion'
  const tA = tweened(0)
  const tB = tweened(0)

  export let poll
  $: totalVotes = poll.voteA + poll.voteB
  $: percentA = Math.floor((100 / totalVotes) * poll.voteA)||0
  $: percentB = Math.floor((100 / totalVotes) * poll.voteB)||0
  $: tA.set(percentA)
  $: tB.set(percentB)
  const voteHandler = (opt, id) => {
    PollStore.update((currentPolls) => {
      let copyedPolls = [...currentPolls]
      let upvotedPoll = copyedPolls.find((poll) => {
        return poll.id == id
      })

      if (opt === 'a') {
        upvotedPoll.voteA++
      }
      if (opt === 'b') {
        upvotedPoll.voteB++
      }

      return copyedPolls
    })
  }

  const handleDelete = (id) => {
    PollStore.update((current) => {
      return current.filter((poll) => poll.id !== id)
    })
  }
</script>

<Card>
  <div class="poll">
    <h3>{poll.quest}</h3>
    <p>Total:{totalVotes}</p>
    <div class="answer" on:click={() => voteHandler('a', poll.id)}>
      <div class="percent percent-a" style="width:{$tA}%">
        <span>{poll.ansA}({poll.voteA})</span>
      </div>
    </div>
    <div class="answer" on:click={() => voteHandler('b', poll.id)}>
      <div class="percent percent-b" style="width:{$tB}%">
        <span>{poll.ansB}({poll.voteB})</span>
      </div>
    </div>
    <div>
      <Button type='delete' on:click={() => handleDelete(poll.id)}>Delete</Button>
    </div>
  </div>
</Card>

<style>
  h3 {
    margin: 0 auto;
    color: #555;
  }
  p {
    margin-top: 6px;
    font-size: 14px;
    color: #555;
    margin-bottom: 30px;
  }
  .answer {
    margin: 10px auto;
    background-color: #fff;
    cursor: pointer;

    position: relative;
  }
  .answer:hover {
    opacity: 0.6;
  }
  span {
    display: inline-block;
    padding: 10px 20px;
  }

  .percent {
    height: 100%;

    box-sizing: border-box;
  }

  .percent-a {
    width: 0px;
    border-left: 4px solid #d91b42;
    background: rgba(217, 27, 66, 0.2);
  }
  .percent-b {
    width: 0px;
    border-left: 4px solid #45c496;
    background: rgba(69, 196, 150, 0.2);
  }
</style>
