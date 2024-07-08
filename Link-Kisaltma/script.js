document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("shortcut-button");
  const input = document.getElementById("original-link");
  const shortLinkText = document.getElementById("short-link");
  const shortened = document.getElementById("shortened");

  btn.addEventListener("click", async () => {
    const url = input.value;
    if (url) {
      try {
        const shortUrl = await shortLink(url);
        shortLinkText.textContent = `Kısaltılmış URL: ${shortUrl}`;
      } catch (error) {
        shortLinkText.textContent = "Bir hata oluştu. Lütfen tekrar deneyin.";
        console.error("Error:", error);
      }
    } else {
      shortLinkText.textContent = "Lütfen bir URL girin.";
    }
  });

  async function shortLink(url) {
    const response = await fetch(
      `https://ulvis.net/API/write?url=${encodeURIComponent(url)}`
    );
    const data = await response.json();
    if (data.success) {
      return data.short;
    } else {
      throw new Error(data.error);
    }
  }
});
