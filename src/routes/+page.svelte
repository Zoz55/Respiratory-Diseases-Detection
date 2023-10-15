<script>
  import { onMount } from "svelte";
  import { enhance } from "$app/forms";
  export let form;
</script>

<h2 class="text-cenetr">CT Scan Lung Disease Prediction</h2>
<h4 class="text-cenetr">Upload an image and click submit</h4>
<form class="p-3 text-center" method="POST" action="?/upload" use:enhance>
  <p>
    <input type="file" name="file" id="file" class="inputfile" />
    <label for="file">Choose a file</label>
  </p>
  <p>
    <input class="submitbutton" type="submit" name="submit" value="Submit" />
  </p>
</form>
{#if form}
  {#if form.message}
    <p style="color:black;">
      Diagnosis for the following image is: <u
        ><h3 style="color:black;">{form.message.message}</h3></u
      ><br />
    </p>
    <img src={form.message.image} width="300" height="225" alt="ct scan" />
  {/if}
{/if}

<style>
  @import "./+page.css";
</style>
