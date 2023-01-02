/*transform from RA filter to mongodb filter so nestjs CRUD can handle
from RA frontend can add filter with source = source_gte, source_lte. source_neq
from filter: 
{ date_gte: '2022-09-09', date_lte: '2022-09-30',abc1_neq: '2022-09-30', abc: 1 }
to filter: 
{
  date: { '$gte': '2022-09-09', '$lte': '2022-09-30' },
  abc1: { '$neq': '2022-09-30' },
  abc: 1
}
*/
const filterTransform = (filter) => {
  const newFilter = {};
  for (const [key, value] of Object.entries(filter)) {
    const includeOptions =
      key.includes('_gte') || key.includes('_gt') || key.includes('_lte') || key.includes('_lt') || key.includes('_ne');
    if (key.includes('_') && includeOptions) {
      const [field, operator] = key.split('_');
      // eslint-disable-next-line no-prototype-builtins
      newFilter.hasOwnProperty(field)
        ? (newFilter[field] = { ...newFilter[field], ['$' + operator]: value })
        : (newFilter[field] = { ['$' + operator]: value });
    } else {
      newFilter[key] = value;
    }
  }
  return newFilter;
};

export { filterTransform };
