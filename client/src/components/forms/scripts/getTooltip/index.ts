import { InputType } from "../../types";
import { TooltipList } from "./types";

export default (inputType: InputType) => {
  const tooltipList: TooltipList = {
    firstName: 'Min 1 symbol',
    lastName: 'Min 1 symbol',
    email: 'Example: tester@test.com',
    password:
      'Min 6 symbols'
      + '\nMin 1 number'
      + '\nMin 1 up letter'
      + '\nMin 1 low letter'
      + '\nMin 1 spec symbol',
    repeatePassword: 'Repeate password'
  }

  return tooltipList[inputType];
}
