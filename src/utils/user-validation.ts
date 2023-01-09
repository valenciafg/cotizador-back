export const userStepValidation = (step, validStep) => {
  if (step !== validStep) {
    throw new Error('User with invalid register step');
  }
};
