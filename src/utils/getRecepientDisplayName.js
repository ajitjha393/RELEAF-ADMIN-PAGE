const getRecipientDisplayName = (users) =>
  users?.filter((userToFilter) => userToFilter !== "Releaf Support")[0];

export default getRecipientDisplayName;
