const FormValidator = {
  clearErrors(){
    const form = document.querySelector('.form-validator');
    const inputs = form.querySelectorAll('input');
    const smalls = form.querySelectorAll('small');
    
    inputs.forEach(input => input.classList.remove('error'));
    smalls.forEach(small => small.remove());
  },
  showError:(input, error) => {
    let errorEl = document.createElement(`small`);
    errorEl.innerHTML = error
    input.classList.add('error')
    input.parentElement.insertBefore(errorEl, input.nextElementSibling);
  },
  
  checkRules: (value, rules) => {
    const splittedRules = rules.split('|')
    for(i=0; i<splittedRules.length;i++){
      const rule = splittedRules[i];
      const ruleDefinition = rule.split('=');
      switch(ruleDefinition[0]) {
        case 'required': {
          if(value.trim() == "") return `Campo obrigatório`;
          break;
        }
        case 'min': {
          const ruleValue = ruleDefinition[1];

          if(ruleValue && !(value.length >= Number(ruleValue))){
            return `Mínimo de ${ruleValue} caracteres`;
          }
          break;
        }
        case 'max': {
          const ruleValue = ruleDefinition[1];
          
          if(ruleValue && !(value.length <= Number(ruleValue))){
              return `Máximo de ${ruleValue} caracteres`;
          }
          break;
        }
        case 'email': {
          const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          const testResult = regex.test(value.toLowerCase());
          if(!testResult) return`Email inválido`;
          break;
        }
      }
    };
    return true;
  },
  checkInput: (input) => {
    const rules = input.dataset.rules;

    if(!rules) {
      return true;
    }
    const result = FormValidator.checkRules(input.value, rules);

    if(result !== true) {
      FormValidator.showError(input,result);
    }

    return result;
  },
  handleSubmit: (event) => {
    event.preventDefault();
    const form = document.querySelector('.form-validator');
    const inputs = form.querySelectorAll('input');
    let passed = true;
    FormValidator.clearErrors();
    inputs.forEach(input => {
      if(FormValidator.checkInput(input) !== true){
        passed = false;
      }
    });
    
    if(passed) {
      form.submit();
      return;
    }
  },
};

const form = document.querySelector('.form-validator');
form.addEventListener('submit', FormValidator.handleSubmit);