// Load gallery images from the backend
async function loadGallery() {
  const galleryDiv = document.getElementById("gallery");
  galleryDiv.innerHTML = "<p>Loading images...</p>";

  try {
    const res = await fetch("/api/read-file");
    const data = await res.json();

    if (!data.images || data.images.length === 0) {
      galleryDiv.innerHTML = "<p>No images uploaded yet.</p>";
      return;
    }

    galleryDiv.innerHTML = "";

    data.images.forEach(url => {
      const img = document.createElement("img");
      img.src = url;
      img.classList.add("gallery-image");
      galleryDiv.appendChild(img);
    });

  } catch (err) {
    galleryDiv.innerHTML = "<p>Error loading gallery.</p>";
  }
}

loadGallery();
