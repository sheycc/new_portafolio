import { FormGroup } from "@angular/forms";


export function invalidField(field: string, initialFormValues: any, form: FormGroup)  {
  if(initialFormValues) {
    return form.get(field)!.invalid;
  } else {
    return form.get(field)!.touched && form.get(field)!.invalid;
  }
}

export function getErrorMsg(field: string, form: FormGroup) {
  const error = form.get(field)?.errors;
  const str = field.charAt(0).toUpperCase() + field.slice(1);

  if(error?.['required']) {
    return `${str} required.`;
  } else if(error?.['pattern']) {
    return `${str} pattern incorrect.`;
  } else if(error?.['minlength']) {
    return `Must be greater than ${error['minlength']['requiredLength']} digits.`;
  } else if(error?.['emailTaken']) {
    return 'Email already taked.';
  } else if(error?.['connectionRefused']) {
    return 'Connection refused error.';
  } else if(error && Object.values(error).length > 0) {
    return str + 'error.';
  }
  return '';
}

export function getFileName(originalString: string) {
  const index = originalString.indexOf('/');
  return index !== -1 ? originalString.slice(index + 1) : '';
}
