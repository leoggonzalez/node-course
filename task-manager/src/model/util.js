function getInvalidOperations(updates, allowedUpdates) {
  const invalid = [];

  updates.forEach((update) => {
    if (!allowedUpdates.includes(update)) {
      invalid.push(update);
    }
  });

  return invalid;
}

module.exports = {
  getInvalidOperations
}