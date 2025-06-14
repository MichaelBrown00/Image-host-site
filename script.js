const API_KEY = "86bf20e96304aaae86423b5cacfaa7b9"; 

function uploadImage() {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("image", file);

  fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
    method: "POST",
    body: formData,
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        const imgUrl = data.data.url;
        showImage(imgUrl);
        saveToSession(imgUrl);
      } else {
        alert("Upload failed!");
      }
    })
    .catch(err => console.error(err));
}

function showImage(url) {
  const gallery = document.getElementById("gallery");
  const wrapper = document.createElement("div");

  wrapper.innerHTML = `
    <img src="${url}" alt="Uploaded Image" />
    <br />
    <button onclick="deleteImage(this)">Delete</button>
    <p><a href="${url}" target="_blank">Open in new tab</a></p>
  `;

  gallery.appendChild(wrapper);
}

function saveToSession(url) {
  const sessionImages = JSON.parse(sessionStorage.getItem("images") || "[]");
  sessionImages.push(url);
  sessionStorage.setItem("images", JSON.stringify(sessionImages));
}

function loadSessionImages() {
  const sessionImages = JSON.parse(sessionStorage.getItem("images") || "[]");
  sessionImages.forEach(url => showImage(url));
}

function deleteImage(button) {
  const imgDiv = button.parentElement;
  const imgUrl = imgDiv.querySelector("img").src;

  // Remove from sessionStorage
  let images = JSON.parse(sessionStorage.getItem("images") || "[]");
  images = images.filter(url => url !== imgUrl);
  sessionStorage.setItem("images", JSON.stringify(images));

  // Remove from page
  imgDiv.remove();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

window.onload = loadSessionImages;
