import { validateInputs } from "../utilities/validateInputs.js";
import { errorsType, errorsMessage } from "../utilities/errorsTypes.js";

const useForm = (form) => {
  const $form = form.current;

  const $inputElements = form.current.querySelectorAll("[required]");

  const $buttonSubmit = form.current.querySelector("[type=submit]");

  const $buttonReset = form.current.querySelector("[type=reset]");

  const $inputs = new validateInputs($inputElements, errorsType, errorsMessage);

  const onSubmit = () => {
    let dataForm = {};
    let checkStatusForm = false;

    checkStatusForm = $inputs.checkStatus();

    if (checkStatusForm) {
      $inputElements.forEach((element) => {
        const newElement = { [element.name]: element.value };
        dataForm = { ...dataForm, ...newElement };
      });
    }

    return {
      statusForm: checkStatusForm,
      dataForm,
      reset: () => $form.reset(),
    };
  };

  $buttonSubmit.addEventListener("click", () => {
    $inputs.checkStatus();
  });

  $buttonReset.addEventListener("click", () => {
    $inputs.reset();
  });

  return [$form, onSubmit, $inputElements];
};

export default useForm;
