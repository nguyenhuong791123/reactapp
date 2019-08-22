import StringUtil from 'util';
import { isEmpty } from './Utils';

const inputCheck = {
    max_length: (obj, max, error1, error2) => {
        const dError = obj.target.parentElement.childNodes[1];
        if(!isEmpty(dError)) {
          const value = obj.target.value;
          if(value.length <= 0) {
            dError.innerText = error1;
          } else if(value.length > max) {
            dError.style.display = 'block';
            var msg = StringUtil.format(error2, max, value.length - max);
            dError.innerText = msg;
          } else {
            dError.style.display = 'none';
          }
        }
    
    }
};

module.exports.inputCheck = inputCheck;