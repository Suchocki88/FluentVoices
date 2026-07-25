const menuButton = document.querySelector(".menu-button");
const primaryNavigation = document.querySelector(".primary-navigation");

const filterButtons = document.querySelectorAll(".filter-button");
const bookCards = document.querySelectorAll(".book-card");

const bookButtons = document.querySelectorAll(".book-card-button");
const bookDialog = document.querySelector("#book-dialog");
const dialogClose = document.querySelector("#dialog-close");
const dialogTitle = document.querySelector("#dialog-title");
const dialogAuthor = document.querySelector("#dialog-author");
const dialogDescription = document.querySelector("#dialog-description");
const dialogId = document.querySelector("#dialog-id");
const readButton = document.querySelector("#read-button");

const certificateForm = document.querySelector("#certificate-form");
const certificateInput = document.querySelector("#certificate-number");
const formMessage = document.querySelector("#form-message");

menuButton.addEventListener("click", () => {
  const isOpen = primaryNavigation.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", String(isOpen));

  const screenReaderText = menuButton.querySelector(".sr-only");

  screenReaderText.textContent = isOpen
    ? "Close navigation"
    : "Open navigation";
});

primaryNavigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    primaryNavigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");

    menuButton.querySelector(".sr-only").textContent =
      "Open navigation";
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((filterButton) => {
      filterButton.classList.remove("active");
    });

    button.classList.add("active");

    bookCards.forEach((card) => {
      const matchesFilter =
        selectedFilter === "all" ||
        card.dataset.category === selectedFilter;

      card.hidden = !matchesFilter;
    });
  });
});

bookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    dialogTitle.textContent = button.dataset.title;
    dialogAuthor.textContent = `by ${button.dataset.author}`;
    dialogDescription.textContent = button.dataset.description;
    dialogId.textContent = button.dataset.id;

    bookDialog.showModal();
  });
});

dialogClose.addEventListener("click", () => {
  bookDialog.close();
});

bookDialog.addEventListener("click", (event) => {
  const dialogRectangle = bookDialog.getBoundingClientRect();

  const clickedOutside =
    event.clientX < dialogRectangle.left ||
    event.clientX > dialogRectangle.right ||
    event.clientY < dialogRectangle.top ||
    event.clientY > dialogRectangle.bottom;

  if (clickedOutside) {
    bookDialog.close();
  }
});

readButton.addEventListener("click", () => {
  window.alert(
    "The full PDF reader will be connected in a later prototype."
  );
});

certificateForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const certificateNumber = certificateInput.value.trim();

  if (!certificateNumber) {
    formMessage.textContent =
      "Please enter the graduate’s certificate number.";

    certificateInput.focus();
    return;
  }

  formMessage.textContent =
    "Certificate recognized. The parent upload pathway will open here in the next prototype.";
});
