import { iconSvgExclamation } from "./templates.js";

const mqLarge = window.matchMedia("(max-width: 500px)");

function scrollToSection(section) {
  if (mqLarge.matches) {
    section.scrollIntoView();
  }
}

class validateInputs {
  #elements;
  #errorMessage;
  #errorsType;
  #statusForm;

  constructor(elements, errorsType, errorMessage) {
    this.#elements = elements;
    this.#errorMessage = errorMessage;
    this.#errorsType = errorsType;

    this.addValitationsToElement();
  }

  toastMessage(element, message) {
    const $contain = document.createElement("div");
    const $text = document.createElement("p");
    $contain.classList.add("toatMessage");
    $contain.innerHTML = iconSvgExclamation;
    $text.textContent = message;
    $contain.appendChild($text);

    $contain.addEventListener("click", () => {
      $contain.remove();
    });

    element.addEventListener("keydown", () => {
      const $toastMessage = document.querySelector(".toatMessage");
      if ($toastMessage !== null) {
        $toastMessage.remove();
      }
    });

    element.insertAdjacentElement("afterend", $contain);
  }

  checkStatus() {
    this.#statusForm = Object.values(this.#elements).every((element) => {
      if (!element.checkValidity()) {
        this.#statusForm = false;
        this.testValidations(element);
        return false;
      }
      return true;
    });

    return this.#statusForm;
  }

  reset() {
    const $toastMessage = document.querySelector(".toatMessage");
    Object.values(this.#elements).forEach((element) => {
      if (!element.checkValidity()) {
        if ($toastMessage !== null) {
          $toastMessage.remove();
        }
        element.classList.remove("inputInvalid");
      }
    });

    this.#statusForm = undefined;
  }

  testValidations(element) {
    let message = "";
    element.setCustomValidity("");

    this.#errorsType.forEach((error) => {
      if (element.validity[error]) {
        message = this.#errorMessage[element.name][error];
      }
    });

    if (!element.checkValidity()) {
      const $toastMessage = document.querySelector(".toatMessage");
      if ($toastMessage !== null) {
        $toastMessage.remove();
      }
      element.classList.add("inputInvalid");
      this.toastMessage(element, message);
      scrollToSection(element);
    } else {
      element.classList.remove("inputInvalid");
      message = "";
    }
  }

  addValitationsToElement() {
    this.#elements.forEach((element) => {
      element.addEventListener("blur", () => this.testValidations(element));
      element.addEventListener("invalid", (evento) => evento.preventDefault());
    });
  }
}

export { validateInputs };
