const isValidFirebaseId = (
    id: string
): boolean => {
    const firebaseIdRegex = /^[A-Za-z0-9_-]{20,240}$/;
    return firebaseIdRegex.test(id);
};

export default isValidFirebaseId;
  
