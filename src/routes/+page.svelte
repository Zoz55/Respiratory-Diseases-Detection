<script>
  import { enhance } from "$app/forms";
  export let form;

  let input;
  let container;
  let image;
  let placeholder;
  let showImage = false;

  function onChange() {
    const file = input.files[0];

    if (file) {
      showImage = true;

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        image.setAttribute("src", reader.result);
      });
      reader.readAsDataURL(file);

      return;
    }
    showImage = false;
  }
</script>

<h2 class="text-cenetr">CT Scan Lung Disease Prediction</h2>
<h4 class="text-cenetr">Upload an image and click submit</h4>
<form class="p-3 text-center" method="POST" action="?/upload" use:enhance>
  <p>
    <input
      type="file"
      name="file"
      id="file"
      class="inputfile"
      enctype="multipart/form-data"
      bind:this={input}
      on:change={onChange}
    />
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
  {/if}
{/if}
<div bind:this={container}>
  {#if showImage}
    <img bind:this={image} src="" alt="Preview" />
  {:else}
    <span bind:this={placeholder}>Image Preview</span>
  {/if}
</div>

<style>
  @import "./+page.css";
</style>
