<!-- PrintView.vue -->

<template>
  <v-container>
    <v-row>
      <v-col v-for="(image, index) in images" :key="index">
        <div class="page">
          <img
            :src="image.src"
            :alt="image.alt"
            :width="image.width"
            :height="image.height"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: "print",
  auth: false,
  data() {
    return {
      images: [
        {
          src: "https://www.w3schools.com/html/pic_trulli.jpg",
          alt: "Trulli",
          width: 1100,
          height: 1100,
        },
        {
          src: "https://www.w3schools.com/html/pic_trulli.jpg",
          alt: "Trulli",
          width: 1100,
          height: 1100,
        },
        {
          src: "https://www.w3schools.com/html/pic_trulli.jpg",
          alt: "Trulli",
          width: 1100,
          height: 1100,
        },
        {
          src: "https://www.w3schools.com/html/pic_trulli.jpg",
          alt: "Trulli",
          width: 1100,
          height: 1100,
        },
        {
          src: "https://www.w3schools.com/html/pic_trulli.jpg",
          alt: "Trulli",
          width: 1100,
          height: 1100,
        },
        {
          src: "https://www.w3schools.com/html/pic_trulli.jpg",
          alt: "Trulli",
          width: 1100,
          height: 1100,
        },
      ],
    };
  },
};
</script>

<style scoped>
@media print {
  v-container {
    max-width: none !important; /* Allow the container to expand on the print page */
  }

  v-col {
    page-break-before: always; /* Add a page break before each column (image) */
  }

  .page {
    position: relative;
  }

  /* Use the counter property to generate page numbers */
  @page {
    counter-increment: currentPage;
  }

  .page::after {
    content: "Page " counter(page);
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
