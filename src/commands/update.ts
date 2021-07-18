module.exports = {
  name: 'update',
  alias: 'u',
  run: async function(toolbox) {
    const { updateAutoIncludes } = toolbox;

    updateAutoIncludes();
  }
};
