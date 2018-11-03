import * as Yup from 'yup';
import moongose from 'mongoose';

class Validator {
  constructor()  {
   
    Yup.addMethod(Yup.string, 'exists', function(model, path, message, cb) {

      return this.test('exist on model', message, async function(value) {
        let Model = moongose.models[model];

        const query = path.split('|').map((p) => ({ [p]: value }));

        if (typeof cb === 'function') {
          Model = cb(Model);
        }

        const result = await Model.countDocuments({ $or: query });
        
        return !!result;
      });
    });

    Yup.addMethod(Yup.string, 'unique', function(model, path, message, cb) {

      return this.test('not exist on model', message, async function(value) {
        let Model = moongose.models[model];

        const query = path.split('|').map((p) => ({ [p]: value }));

        if (typeof cb === 'function') {
          Model = cb(Model);
        }

        const result = await Model.countDocuments({ $or: query });
        
        return !result;
      });
    });
  }
  
  async validate(data, rules) {
    try {
      await rules.validate(data, { abortEarly: false });
    } catch (error) {
        throw error;
    }
  }
}

export default new Validator();