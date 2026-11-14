// ========================================
// JUNIOR DANGOTE TWIN
// Frontend interaction
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  const sidebar = document.getElementById("sidebar");
  const menuButton = document.getElementById("menuButton");
  const pageTitle = document.getElementById("pageTitle");

  // ======================================
  // PAGE NAVIGATION
  // ======================================

  const navigationButtons = document.querySelectorAll("[data-page]");
  const navigationLinks = document.querySelectorAll(".nav-link");
  const pages = document.querySelectorAll(".page");

  function showPage(pageId) {
    const targetPage = document.getElementById(pageId);

    if (!targetPage) return;

    pages.forEach(page => {
      page.classList.remove("active");
    });

    targetPage.classList.add("active");

    navigationLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.dataset.page === pageId
      );
    });

    const activeLink = document.querySelector(
      `.nav-link[data-page="${pageId}"]`
    );

    pageTitle.textContent = activeLink
      ? activeLink.textContent.trim()
      : "Overview";

    sidebar.classList.remove("open");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  navigationButtons.forEach(button => {
    button.addEventListener("click", () => {
      showPage(button.dataset.page);
    });
  });

  // ======================================
  // BUTTONS THAT OPEN OTHER PAGES
  // ======================================

  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
      showPage(button.dataset.go);
    });
  });

  // ======================================
  // MOBILE SIDEBAR
  // ======================================

  if (menuButton) {
    menuButton.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  document.addEventListener("click", event => {
    if (
      window.innerWidth <= 760 &&
      sidebar.classList.contains("open") &&
      !sidebar.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      sidebar.classList.remove("open");
    }
  });

  // ======================================
  // PROFILE PHOTO PREVIEW
  // ======================================

  const photoUpload = document.getElementById("photoUpload");
  const identityPhoto = document.getElementById("identityPhoto");

  if (photoUpload && identityPhoto) {
    photoUpload.addEventListener("change", event => {

      const file = event.target.files[0];

      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image.");
        photoUpload.value = "";
        return;
      }

      const reader = new FileReader();

      reader.onload = result => {
        identityPhoto.innerHTML = "";

        const image = document.createElement("img");
        image.src = result.target.result;
        image.alt = "Profile photo preview";

        identityPhoto.appendChild(image);
      };

      reader.readAsDataURL(file);
    });
  }

  // ======================================
  // PROFILE INFORMATION
  // ======================================

  const fullName = document.getElementById("fullName");
  const aboutMe = document.getElementById("aboutMe");
  const personality = document.getElementById("personality");
  const saveIdentity = document.getElementById("saveIdentity");
  const identityMessage = document.getElementById("identityMessage");

  // Restore locally saved profile information.
  // This is a browser preview, not secure cloud storage.

  try {
    const savedProfile = localStorage.getItem("juniorDangoteTwinProfile");

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);

      fullName.value = profile.fullName || "";
      aboutMe.value = profile.aboutMe || "";
      personality.value = profile.personality || "";
    }
  } catch (error) {
    console.error("Could not load saved profile:", error);
  }

  if (saveIdentity) {
    saveIdentity.addEventListener("click", () => {

      const profile = {
        fullName: fullName.value.trim(),
        aboutMe: aboutMe.value.trim(),
        personality: personality.value.trim()
      };

      try {
        localStorage.setItem(
          "juniorDangoteTwinProfile",
          JSON.stringify(profile)
        );

        identityMessage.textContent =
          "Profile saved in this browser.";

      } catch (error) {
        identityMessage.textContent =
          "Unable to save profile in this browser.";

        console.error("Profile save failed:", error);
      }
    });
  }

  // ======================================
  // INITIAL PAGE
  // ======================================

  showPage("overview");

});
