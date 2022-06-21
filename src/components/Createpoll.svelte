<script>
  import PollStore from '../stores/PollStore'
  import Button from '../shared/Button.svelte'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()
  let fields = { quest: '', ansA: '', ansB: '' }
  let err = { quest: '', ansA: '', ansB: '' }
  let valid = false
  const submitHandler = () => {
    valid = true

    if (fields.quest.trim().length < 5) {
      valid = false
      err.quest = 'Question should be more than 5 characters'
    } else {
      err.quest = ''
    }
    if (fields.ansA.trim().length < 1) {
      valid = false
      err.ansA = 'Answer cannot be empty'
    } else {
      err.ansA = ''
    }
    if (fields.ansB.trim().length < 1) {
      valid = false
      err.ansB = 'Answer cannot be empty'
    } else {
      err.ansB = ''
    }
    if (valid) {
      let poll = { ...fields, voteA: 0, voteB: 0, id: Math.random() }
      PollStore.update(currentPolls => {
        return [poll,...currentPolls]
      })
      dispatch('add')
    }

    // console.log(poll);
    // dispatch('add',poll)
  }
</script>

<form on:submit|preventDefault={submitHandler}>
  <div class="form-field">
    <label for="quest">Question:</label>
    <input type="text" id="quest" bind:value={fields.quest} />
    <div class="err">{err.quest}</div>
  </div>
  <div class="form-field">
    <label for="ansA">Answer A:</label>
    <input type="text" id="ansA" bind:value={fields.ansA} />
    <div class="err">{err.ansA}</div>
  </div>

  <div class="form-field">
    <label for="ansB">Answer B:</label>
    <input type="text" id="ansB" bind:value={fields.ansB} />
    <div class="err">{err.ansB}</div>
  </div>

  <Button type={'secondary'} flat={true}>Add Poll</Button>
</form>

<style>
  form {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }

  .form-field {
    margin: 18px auto;

    text-align: left;
  }
  label {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  input {
    border-radius: 6px;
    border: 3px solid pink;
    width: 100%;
    font-size: 18px;
    padding: 5px;
  }
  .err {
    color: red;
    font-size: 12px;
    font-weight: bold;
  }
</style>
