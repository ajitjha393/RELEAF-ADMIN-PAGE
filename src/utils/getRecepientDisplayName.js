const getRecipientDisplayName = (users) =>
  users?.filter((userToFilter) => userToFilter !== "Releaf Support");

export default getRecipientDisplayName;
