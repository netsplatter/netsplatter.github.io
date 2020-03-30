
const del = require('del');

module.exports = ({output}) => {
  return () => {
    return del(output);
  };
};