const _ = require('./lodash');

describe('extended lodash', () => {
  describe('_.deeply(_.mapKeys)', () => {
    it('works with plain objects', () => {
      const obj = {
        valueKey: 'Text',
        objectKey: {
          valueKey: 1,
          subObjectKey: {
            valueKey: () => {},
          },
        },
      };

      // Use snake case to mark visited keys
      const result = _.deeply(_.mapKeys)(obj, (value, key) => _.snakeCase(key));

      expect(result.value_key).toBeDefined();
      expect(result.value_key).toEqual(obj.valueKey);

      expect(result.object_key).toBeDefined();
      expect(result.object_key.value_key).toBeDefined();
      expect(result.object_key.value_key).toEqual(obj.objectKey.valueKey);

      expect(result.object_key.sub_object_key).toBeDefined();

      const subObj = obj.objectKey.subObjectKey;
      const subResult = result.object_key.sub_object_key;

      expect(subResult.value_key).toBeDefined();
      expect(subResult.value_key).toEqual(subObj.valueKey);
    });

    it('works with arrays', () => {
      const obj = {
        arrayKey: [
          {
            valueKey: 'Text',
            subArrayKey: [
              {
                valueKey: 'Text',
              },
            ],
          },
        ],
      };

      // Use snake case to mark visited keys
      const result = _.deeply(_.mapKeys)(obj, (value, key) => _.snakeCase(key));

      expect(result.array_key).toBeDefined();
      expect(result.array_key[0]).toBeDefined();
      expect(result.array_key[0].value_key).toBeDefined();
      expect(result.array_key[0].value_key).toEqual(obj.arrayKey[0].valueKey);

      expect(result.array_key[0].sub_array_key).toBeDefined();

      const subObj = obj.arrayKey[0].subArrayKey;
      const subResult = result.array_key[0].sub_array_key;

      expect(subResult[0]).toBeDefined();
      expect(subResult[0].value_key).toBeDefined();
      expect(subResult[0].value_key).toEqual(subObj[0].valueKey);
    });
  });
});
